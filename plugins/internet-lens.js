import axios from 'axios'
import { ryzenCDN } from '../lib/uploadFile.js'

let handler = async (m, { conn }) => {
    m.reply(wait)

    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply gambar dengan perintah .googlelens'

        let media = await q.download()
        if (!media) throw 'Gagal mendownload gambar!'

        let cdnResult = await ryzenCDN(media)
        if (!cdnResult || !cdnResult.url) throw 'Gagal upload ke CDN!'

        let url = cdnResult.url
        let res = await axios.get(`${APIs.ryzumi}/api/search/lens`, {
            params: { url },
        })

        if (!res.data?.result?.length) throw 'Tidak ditemukan hasil dari Google Lens.'

        let teks = `🔎 *Google Lens Results (Full Detail)*\n\n`

        for (let r of res.data.result) {
            teks += `📌 *Position:* ${r.position}\n`
            teks += `📖 *Title:* ${r.title}\n`
            teks += `🔗 *Page Link:* ${r.link}\n`
            teks += `🖼️ *Image:* ${r.image?.link || '-'}\n`
            teks += `📏 *Image Size:* ${r.image?.width}x${r.image?.height}\n`
            teks += `📍 *Source:* ${r.source}\n`
            teks += `🖼️ *Thumbnail:* ${r.thumbnail}\n\n`
        }

        await conn.reply(m.chat, teks.trim(), m)

    } catch (err) {
        console.error(err)
        m.reply(err.message || 'Error internal server')
    }
}

handler.help = ['lens']
handler.tags = ['internet']
handler.command = /^(googlelens|lens)$/i
handler.register = true
handler.limit = 2

export default handler
