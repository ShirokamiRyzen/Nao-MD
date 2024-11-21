let handler = async (m, { conn }) => {
let dana = global.pdana
let saweria = global.psaweria
let bank1 = global.bank1
let gopay = global.pgopay
let numberowner = global.nomorown
let anu = `Hai 👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:
┌〔 Donasi • Emoney 〕
├ Saweria : ${saweria}
├ Jago : ${bank1}
├ Dana : ${dana}
├ Gopay : ${gopay}
└────
Kamu akan mendapat akses *Premium* jika berdonasi:
10k = Premium 30 Hari
15k = Premium 60 Hari
25k = Premium 120 Hari
50k = Premium 365 Hari

Berapapun donasi kalian akan sangat berarti 👍

Terimakasih :D

Contact Owner:
wa.me/${numberowner} (Owner)
`
  m.reply(anu)
}

handler.help = ['donasi']
handler.tags = ['main']
handler.command = /^(donasi|donate)$/i

export default handler
