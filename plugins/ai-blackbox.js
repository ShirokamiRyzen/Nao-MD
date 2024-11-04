import fetch from "node-fetch"
import uploadFile from '../lib/uploadFile.js'

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    // Pastikan minimal ada teks atau pesan yang di-quote
    if (!text && !m.quoted && !m.mtype.includes('imageMessage')) {
      throw "Masukkan pertanyaan atau kirim gambar untuk deskripsi!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    // Kirim pesan loading
    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let imgUrl = null;

    // Jika ada gambar pada pesan yang di-quote, lakukan upload
    if (m.quoted && m.quoted.mtype === 'imageMessage') {
      let img = await m.quoted.download();
      if (img) {
        imgUrl = await uploadFile(img);
        if (!imgUrl) {
          throw "Gagal mengupload gambar. Pastikan proses upload berjalan dengan baik.";
        }
      }
    } 
    // Jika ada gambar di pesan langsung
    else if (m.mtype.includes('imageMessage')) {
      let img = await m.download();
      if (img) {
        imgUrl = await uploadFile(img);
        if (!imgUrl) {
          throw "Gagal mengupload gambar. Pastikan proses upload berjalan dengan baik.";
        }
      }
    }

    // Tentukan endpoint berdasarkan kondisi kombinasi `text` dan `m.quoted`
    let apiUrl;
    if ((!text && m.quoted) || (text && m.quoted) || (text && m.mtype.includes('imageMessage'))) {
      apiUrl = `https://api.ryzendesu.vip/api/ai/blackbox?chat=${encodeURIComponent(text || '')}&options=blackboxai&imageurl=${imgUrl}`;
    } else if (text && !m.quoted) {
      apiUrl = `https://api.ryzendesu.vip/api/ai/blackbox?chat=${encodeURIComponent(text)}&options=blackboxai`;
    }

    // Fetch ke API dengan URL yang dipilih
    let hasil = await fetch(apiUrl);
    if (!hasil.ok) {
      throw new Error("Request ke API gagal");
    }

    let result = await hasil.json();

    // Buat respons dari hasil API
    let responseMessage = result.response || "Tidak ada respons dari AI.";
    
    // Tambahkan informasi tambahan jika ada
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

    // Kirim pesan respons
    await conn.sendMessage(m.chat, {
      text: responseMessage,
      edit: key,
    });

    previousMessages.push({ role: "user", content: text || '[Image]' });
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
      edit: key,
    });
  }
}

handler.help = ['blackbox <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(blackbox)$/i

handler.limit = 8
handler.premium = false
handler.register = true

export default handler