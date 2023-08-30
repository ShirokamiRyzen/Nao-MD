//By Shirokami Ryzen
//Dont delete this credit!!!
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  let api = "api.ryzendesu.com"
  if (!text) throw `Input *Query*`
  conn.reply(m.chat, 'Wait a moment...', m)

  try {
    let res = await fetch(`https://api.ryzendesu.com/api/search/pinterest?text=${text}&apikey=${global.ryzen}`);
    let result = await res.json();
    let gambarUrls = result.result.slice(0, 20); // Ambil 20 gambar pertama

    // Mengacak array gambarUrls
    for (let i = gambarUrls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gambarUrls[i], gambarUrls[j]] = [gambarUrls[j], gambarUrls[i]];
    }

    // Mengirim 10 gambar secara acak
    for (let i = 0; i < 10; i++) {
      let imageUrl = gambarUrls[i];
      let imageRes = await fetch(imageUrl);
      let imageBuffer = await imageRes.buffer();

      // Menggunakan fungsi sendImage untuk mengirim gambar ke WhatsApp
      await conn.sendFile(m.chat, imageBuffer, 'gambar.jpg', '');

      // Tambahkan jeda agar tidak mengirim gambar terlalu cepat
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    m.reply(api)
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, 'Terjadi kesalahan saat mendownload gambar.', m)
  }
}

handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^pinterest$/i

export default handler
