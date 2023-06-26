import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
    let info = fs.readFileSync('./mp3/sholawat.opus')

let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

conn.reply(m.chat, info, m, { quoted: fkontak },{ contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: "https://www.youtube.com/channel/UC5z1Xp6vQGU038B1RbMC3Gg",
    mediaType: 2,
    description: "https://www.youtube.com/channel/UC5z1Xp6vQGU038B1RbMC3Gg", 
    title: 'Nao-Botz',
    body: wm,
    thumbnail: thumb,
    sourceUrl: sig  }}})
}
handler.customPrefix = /^(sholawat)$/i
handler.command = new RegExp

export default handler