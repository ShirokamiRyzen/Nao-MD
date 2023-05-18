import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, args, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (!args[0]) throw `Linknya?`
  let res = await fetch(`http://api.lannn.me/api/download/fbdown?url=${args[0]}&apikey=${global.lankey}`)
  let x = await res.json()
  m.reply('Tunggu Sebentar...')
  let cap = `Nih Kak Videonya >,<`
  conn.sendFile(m.chat, x.result.Normal_video, 'fb.mp4', cap, m)
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(fb(dl)?)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}