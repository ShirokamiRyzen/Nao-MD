let handler = async (m) => {
  let dana = global.pdana
  let saweria = global.psaweria
  let bank1 = global.bank1
  let gopay = global.pgopay
  let numberowner = global.nomorown
  let anu = `Hai 👋
Kalian bisa membeli paket premium melalui:
┌〔 Premium • Emoney 〕
├ Saweria : ${saweria}
├ Jago : ${bank1}
├ Dana : ${dana}
├ Gopay : ${gopay}
└────
List Premium:
10k = Premium 15 Hari
15k = Premium 30 Hari
25k = Premium 60 Hari
50k = Premium 180 Hari

Terimakasih :D

Contact Owner:
wa.me/${numberowner} (Owner)
`
  m.reply(anu)
}

handler.help = ['premium']
handler.tags = ['main']
handler.command = /^(premium)$/i

export default handler
