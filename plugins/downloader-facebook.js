/*
import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, args, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (!args[0]) throw `Linknya?`
  let res = await fetch(`https://api.botcahx.live/api/dowloader/fbdown?url=${args[0]}&apikey=${global.botcahx}`)
  let x = await res.json()
  m.reply('Tunggu Sebentar...')
  let cap = `Nih Kak Videonya >,<`
  conn.sendFile(m.chat, x.result.hd, 'fb.mp4', cap, m)
}
*/
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.facebook.com/100084756252836/videos/3391018171153874/?idorvanity=2765173437119338&mibextid=rS40aB7S9Ucbxw6v`;
  try {
    m.reply('*Please wait..*');
    let get = await fetch(`https://api.botcahx.live/api/dowloader/fbdown?url=${args[0]}&apikey=${global.botcahx}`);
let js = await get.json()   
conn.sendFile(m.chat, js.result.HD, 'fb.mp4', '', m);
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    }
  }
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true

handler.command = /^(fb(dl)?)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}