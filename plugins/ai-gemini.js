import fetch from "node-fetch"
import { ryzenCDN } from '../lib/uploadFile.js'

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text && !m.quoted && !m.mtype.includes('imageMessage')) {
      throw "Masukkan pertanyaan atau kirim gambar untuk deskripsi!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

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
      apiUrl = `${APIs.ryzumi}/api/ai/gemini?text=${encodeURIComponent(text || '')}&url=${encodeURIComponent(imgUrl)}`;
    } else if (text) {
      apiUrl = `${APIs.ryzumi}/api/ai/gemini?text=${encodeURIComponent(text)}`;
    } else {
      throw "Tidak ada teks atau gambar yang valid untuk diproses.";
    }

    let hasil = await fetch(apiUrl);
    if (!hasil.ok) throw new Error("Request ke API gagal: " + hasil.statusText);

    let result = await hasil.json();
    if (!result.success) throw new Error("Response API tidak berhasil");

    let responseMessage = result.answer || "Tidak ada respons dari AI.";

    await conn.sendMessage(m.chat, { text: responseMessage });

  } catch (error) {
    console.error('Error in handler:', error);
    await conn.sendMessage(m.chat, { text: `Error: Mana textnya njir?` });
  }
}

handler.help = ['gemini']
handler.tags = ['ai']
handler.command = /^(gemini)$/i

handler.limit = 8
handler.premium = false
handler.register = true

export default handler
