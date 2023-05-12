let fetch = require('node-fetch')
let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Kirim/Reply Gambar dengan caption .jadianime2'
m.reply('Tunggu Sebentar...')
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://api.ibeng.tech/api/maker/anime?img=${url}&apikey=${global.ibeng}`)).buffer()
await conn.sendFile(m.chat, hasil, '', 'Nao Bot V2', m)
	
}
handler.help = ['jadianime2']
handler.tags = ['anime', 'ai']
handler.command = /^(jadianime2)$/i
handler.limit = true

module.exports = handler