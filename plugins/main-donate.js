import fs from 'fs'

let handler = async (m, { conn }) => {
let teks = 'donasi'
let dana = global.pdana
let pulsa = global.ppulsa
let gopay = global.pgopay
let numberowner = global.nomorown
let anu = `Hai 👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:
┌〔 Donasi • Emoney 〕
├ Dana : ${dana}
├ Gopay : ${gopay}
├ Pulsa : ${pulsa}
└────
Berapapun donasi kalian akan sangat berarti 👍

Terimakasih :D

Contact Owner:
wa.me/${numberowner} (Owner)

*donasi via follow ig juga boleh*`
  m.reply(anu)
}

handler.help = ['donasi']
handler.tags = ['main']
handler.command = /^(donasi|donate)$/i

export default handler
