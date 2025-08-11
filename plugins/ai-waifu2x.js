import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .toanime'
        m.reply(wait)
        let media = await q.download()
        let url = await uploadPomf(media)

        // Mengirim permintaan ke API waifu2x dan mendapatkan buffer
        let response = await fetch(`${APIs.ryzumi}/api/ai/waifu2x?url=${url}`)
        if (!response.ok) throw new Error('Gagal menghubungi API waifu2x')

        let hasil = await response.buffer()

        // Mengirim file buffer langsung ke chat
        await conn.sendFile(m.chat, hasil, 'hasil.jpg', global.wm, m)
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.help = ['waifu2x']
handler.tags = ['anime', 'ai']
handler.command = /^(waifu2x)$/i

handler.register = true
handler.limit = 15

export default handler
