import axios from 'axios'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, text }) => {

    m.reply(wait);

    try {
        if (!text) throw 'Masukkan text';

        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let name = await conn.getName(who);
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .geminiimage';

        let media = await q.download();
        let url = await uploadPomf(media);

        let response = await axios.get(`${APIs.ryzen}/api/ai/v2/gemini`, {
            params: {
                text: text,
                url: url
            },
            responseType: 'arraybuffer'
        });

        await conn.sendFile(m.chat, response.data, '', global.wm, m);
    } catch (error) {
        m.reply(error.message || 'Internal server error');
        console.error(error);
    }
};

handler.help = ['geminiimage'];
handler.tags = ['ai'];
handler.command = /^(geminiimage)$/i;

handler.register = true
handler.limit = 5

export default handler
