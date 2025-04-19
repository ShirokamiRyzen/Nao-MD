import axios from 'axios'
import { ryzenCDN } from '../lib/uploadFile.js'

let handler = async (m, { conn, text }) => {
    m.reply(wait)

    try {
        if (!text) throw 'Masukkan text!'

        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .geminiimage'

        let media = await q.download()
        if (!media) throw 'Gagal mendownload media!'

        let cdnResult = await ryzenCDN(media)
        if (!cdnResult || !cdnResult.url) {
            throw 'Gagal upload ke RyzenCDN!'
        }
        let url = cdnResult.url

        let response = await axios.get(`${APIs.ryzen}/api/ai/image/gemini`, {
            params: {
                text: text,
                url: url
            },
            responseType: 'arraybuffer'
        })

        await conn.sendFile(m.chat, response.data, '', global.wm, m)

    } catch (error) {
        m.reply(error.message || 'Internal server error')
        console.error(error)
    }
}

handler.help = ['geminiimage']
handler.tags = ['ai']
handler.command = /^(geminiimage)$/i
handler.register = true
handler.limit = 2

export default handler
