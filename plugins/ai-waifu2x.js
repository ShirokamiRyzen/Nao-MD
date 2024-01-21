import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Gambar?'
        m.reply(wait)
        let media = await q.download()
        let url = await uploadImage(media)

        // Menggunakan fetch dengan { follow: 1 } untuk mengikuti redirect
        let response = await fetch(`https://skizo.tech/api/waifu2x?url=${url}&apikey=${global.xzn}`, {
            follow: 1
        })

        // Mengambil hasil dalam bentuk buffer
        let hasil = await response.arrayBuffer()

        // Mengirim hasil ke pengguna
        await conn.sendFile(m.chat, Buffer.from(hasil), '', global.wm, m)
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.help = ['waifu2x']
handler.tags = ['ai']
handler.command = /^(waifu2x|upscale)$/i

handler.register = true
handler.limit = 8
handler.disable = false

export default handler
