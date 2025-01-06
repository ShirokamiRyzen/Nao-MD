let handler = async (m) => {
  let gambar = 'https://api.ryzendesu.vip/images/qris.png'
  let saweria = global.psaweria
  let qris = global.qris
  let numberowner = global.nomorown
  let anu = `Hai 👋
Kalian bisa membeli paket premium melalui:
┌〔 Premium • Emoney 〕
├ QRIS : ${qris}
├ Saweria : ${saweria}
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
  let qris_img = await (await fetch(gambar)).buffer()
  await conn.sendFile(m.chat, qris_img, '', anu, m)
}

handler.help = ['premium']
handler.tags = ['main']
handler.command = /^(premium)$/i

export default handler
