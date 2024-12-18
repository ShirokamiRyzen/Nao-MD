import axios from 'axios'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, args }) => {

    m.reply(wait);

    try {
        if (!args[0]) throw 'Masukkan link gambar original';

        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let name = await conn.getName(who);
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .faceswap';

        let media = await q.download();
        let url = await uploadPomf(media);

        let response = await axios.get(`https://api.ryzendesu.vip/api/ai/faceswap`, {
            params: {
                original: args[0],
                face: url
            },
            responseType: 'arraybuffer'
        });

        await conn.sendFile(m.chat, response.data, '', global.wm, m);
    } catch (error) {
        m.reply(error.message || 'Internal server error');
        console.error(error);
    }
};

handler.help = ['faceswap'];
handler.tags = ['ai'];
handler.command = /^(faceswap)$/i;

handler.register = true
handler.limit = 5

export default handler
