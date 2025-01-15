import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*⛌ Masukan Emoji Yg ingin kamu gabungkan*\n\n*• Example:*\n- ${usedPrefix + command} 😂+😂\n- ${usedPrefix + command} 😂 😂\n\n[ minimal 2 emoji ]`;

  let emojis = text.split(/[\+\s]/).filter(Boolean);
  if (emojis.length < 2) throw 'Masukkan minimal 2 emoji untuk di-mix';
  if (emojis.length > 2) throw 'Max 2 emoji untuk di-mix';

  const anu = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emojis.join('_'))}`)).json();

  if (!anu.results[0]) throw 'Kombinasi Emojimix Tidak Ditemukan';

  let emix = anu.results[0].media_formats.png_transparent.url;
  const imgBuffer = await (await fetch(emix)).buffer();
  let stiker = await sticker(imgBuffer, null, global.stickpack, global.stickauth);
  conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { asSticker: true });
};

handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = /^(emojimix|emix)$/i
handler.register = true

export default handler