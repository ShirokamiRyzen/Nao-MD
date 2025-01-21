import fetch from "node-fetch"
import { ryzenCDN } from '../lib/uploadFile.js'

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text && !m.quoted && !m.mtype.includes('imageMessage')) {
      throw "Masukkan pertanyaan atau kirim gambar untuk deskripsi!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let imgUrl = null;

    if (m.quoted && m.quoted.mtype === 'imageMessage') {
      let img = await m.quoted.download();
      if (img) {
        img = Buffer.from(img);
        let link = await ryzenCDN(img);
        if (!link) throw 'Gagal mengupload gambar';
        imgUrl = typeof link === 'object' ? link.url : link;
      }
    } else if (m.mtype.includes('imageMessage')) {
      let img = await m.download();
      if (img) {
        img = Buffer.from(img);
        let link = await ryzenCDN(img);
        if (!link) throw 'Gagal mengupload gambar';
        imgUrl = typeof link === 'object' ? link.url : link;
      }
    }

    let apiUrl;
    if (imgUrl) {
      apiUrl = `${APIs.ryzen}/api/ai/blackbox?chat=${encodeURIComponent(text || '')}&options=blackboxai&imageurl=${encodeURIComponent(imgUrl)}`;
    } else if (text) {
      apiUrl = `${APIs.ryzen}/api/ai/blackbox?chat=${encodeURIComponent(text)}&options=blackboxai`;
    } else {
      throw "Tidak ada teks atau gambar yang valid untuk diproses.";
    }

    let hasil = await fetch(apiUrl);
    if (!hasil.ok) {
      throw new Error("Request ke API gagal: " + hasil.statusText);
    }

    let result = await hasil.json();

    let responseMessage = result.response || "Tidak ada respons dari AI.";
    if (result.additionalInfo && result.additionalInfo.length > 0) {
      responseMessage += "\n\n**Informasi Tambahan:**\n";
      result.additionalInfo.forEach(info => {
        responseMessage += `- [${info.title}](${info.link}): ${info.snippet}\n`;
        if (info.sitelinks && info.sitelinks.length > 0) {
          info.sitelinks.forEach(link => {
            responseMessage += `  - [${link.title}](${link.link})\n`;
          });
        }
      });
    }

    await conn.sendMessage(m.chat, {
      text: responseMessage,
      edit: key,
    });

    previousMessages.push({ role: "user", content: text || '[Image]' });

  } catch (error) {
    console.error('Error in handler:', error);
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
      edit: key,
    });
  }
};

handler.help = ['blackbox'];
handler.tags = ['ai'];
handler.command = /^(blackbox)$/i;

handler.limit = 8
handler.premium = false
handler.register = true

export default handler