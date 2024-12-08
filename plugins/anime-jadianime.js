import fetch from 'node-fetch'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .toanime'
        m.reply('Tunggu Sebentar...')
        let media = await q.download()
        let url = await uploadPomf(media)
        let response = await fetch(`https://widipe.com/toanime?url=${url}`)
        let json = await response.json()
        let hasilUrl = json.url
        let hasil = await (await fetch(hasilUrl)).buffer()
        await conn.sendFile(m.chat, hasil, '', global.wm, m)
    } catch (error) {
        console.error(error)
        m.reply('Internal server error')
    }
}

handler.help = ['toanime']
handler.tags = ['anime', 'ai']
handler.command = /^(toanime)$/i

handler.register = true
handler.limit = 5

export default handler
