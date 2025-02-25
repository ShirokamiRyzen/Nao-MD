import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix}img2txt`;
        m.reply(wait);

        let media = await q.download();
        let url = await uploadPomf(media);

        let response = await fetch(`${APIs.ryzen}/api/ai/image2txt?url=${url}`);
        if (!response.ok) throw new Error('Failed to fetch data from API');

        let { result: hasil } = await response.json();

        await conn.sendMessage(m.chat, { text: hasil }, { quoted: m });
    } catch (error) {
        m.reply(`Error: ${error}`);
    }
};

handler.help = ['toprompt'];
handler.tags = ['ai'];
handler.command = /^(toprompt|img2txt)$/i;

handler.register = true
handler.limit = 5

export default handler
