import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw 'Masukkan teks!';

  try {
    let res = await fetch(`https://api.ryzendesu.vip/api/sticker/brat?text=${encodeURIComponent(text)}`);

    if (!res.ok) throw 'Gagal mengambil gambar dari kedua API!';

    let imageBuffer = await res.buffer();

    let stiker = await sticker(false, imageBuffer, global.stickpack, global.stickauth);

    await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);

  } catch (err) {
    await conn.sendMessage(m.chat, { text: 'Gagal mengambil gambar.' }, { quoted: m });
  }
};

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;

handler.register = true

export default handler
