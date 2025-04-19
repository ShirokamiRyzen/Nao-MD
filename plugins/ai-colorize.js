import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix}colorize`;
        m.reply(wait);

        let media = await q.download();
        let url = await uploadPomf(media);

        let response = await fetch(`${APIs.ryzen}/api/ai/colorize?url=${url}`);
        if (!response.ok) throw new Error('Failed to fetch image from API');
        let hasil = await response.buffer();

        await conn.sendFile(m.chat, hasil, 'kolor.jpg', global.wm, m);
    } catch (error) {
        m.reply(`Error: ${error}`);
    }
};

handler.help = ['colorize'];
handler.tags = ['ai'];
handler.command = /^(colorize)$/i;

handler.register = true
handler.limit = 3

export default handler
