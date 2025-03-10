import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let args = text.trim().split(/\s+/);
        let style = args[1] || "anime";

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix}toanime`;
        m.reply(wait);

        let media = await q.download();
        let url = await uploadPomf(media);

        let response = await fetch(`${APIs.ryzen}/api/ai/toanime?url=${url}&style=${style}`);
        if (!response.ok) throw new Error('Failed to fetch image from API');
        let hasil = await response.buffer();

        await conn.sendFile(m.chat, hasil, 'toanime.jpg', global.wm, m);
    } catch (error) {
        m.reply(`Error: ${error}`);
    }
};

handler.help = ['toanime'];
handler.tags = ['ai'];
handler.command = /^(toanime)$/i;

handler.register = true
handler.limit = 8

export default handler
