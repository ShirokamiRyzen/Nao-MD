import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, text }) => {
    try {
        let args = text.trim().split(/\s+/);
        let upscale = (args[1] && args[1].toLowerCase() === 'hd') ? "true" : "false";

        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime || !mime.startsWith('image/')) throw `Kirim/Reply Gambar dengan caption ${usedPrefix}removebg`;

        m.reply(wait);

        let media = await q.download();
        let url = await uploadPomf(media);

        let apiUrl = `${APIs.ryzen}/api/ai/v2/removebg?url=${url}&upscale=${upscale}`;
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Gagal mengambil gambar dari API');

        let hasil = await response.buffer();

        await conn.sendFile( m.chat, hasil, 'removedbg.jpg', global.wm, m );

        let epoch = Date.now();
        let random = Math.floor(Math.random() * 99999);
        let filename = `removedbg_${random}_${epoch}_file.png`;

        await conn.sendFile( m.chat, hasil, filename, '', m, null, { mimetype: 'image/png', asDocument: true } );
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['removebg'];
handler.tags = ['ai'];
handler.command = /^(removebg)$/i;

handler.register = true
handler.limit = 3

export default handler
