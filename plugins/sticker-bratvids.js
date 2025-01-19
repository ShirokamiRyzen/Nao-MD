import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!text || !text.trim()) throw 'Masukkan teks yang valid!';

  try {
    let url = `${APIs.ryzen}/api/image/brat/animated?text=${encodeURIComponent(text.trim())}`;

    // Fetch gambar
    let res = await fetch(url);
    if (!res.ok) throw `Gagal mengambil gambar dari API! Status: ${res.status}`;

    // Ambil buffer gambar
    let imageBuffer = await res.buffer();

    // Buat stiker menggunakan buffer gambar
    let stiker = await sticker(imageBuffer, null, global.stickpack, global.stickauth);
    await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);

  } catch (err) {
    console.error('Error:', err.message || err);
    await conn.sendMessage(m.chat, { text: `Error: ${err.message || 'Gagal mengambil gambar.'}` }, { quoted: m });
  }
};

handler.help = ['bratvid']
handler.tags = ['sticker']
handler.command = /^(bratvid|bratvids|bratvideo)$/i

handler.register = true

export default handler
