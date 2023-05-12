import { createHash } from 'crypto'
import fetch from 'node-fetch'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async (m, { conn, usedPrefix, command }) => {
	function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
  let name = conn.getName(m.sender)
  let age = pickRandom(['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9'])
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Anda sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
  let thumb = 'https://telegra.ph/file/b5cc36920ff446bd25de7.jpg'
  m.reply(`
  Daftar berhasil!
  
  ╭─「 Info User 」
  │ Nama: ${name}
  │ Umur: ${age} tahun
  │ SN: ${sn}
  ╰────
  
  *Jika SN kamu lupa ketik ${usedPrefix}ceksn*`)
}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']

handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler
