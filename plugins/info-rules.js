let handler = async(m, { conn }) => {
  var txt = `
*「 Rules 」*
➯ *TIDAK SPAM BOT*
 ⟬Kena BAN? chat owner⟭
➯ *Jangan menjual nomer BOT!!*
⟬Ini project open source jangan perjualbelikan⟭
➯ *Call auto block*
⟬Mampus⟭
➯ *Maksa minta sc BOT*
⟬Minim literasi, padahal udah ada⟭
➯ *Bot Delay atau Slow respon?*
⟬Lu di chat aja balesnya lama, ga ngaca⟭
➯ *Masukin BOT ke GC*
⟬Kontak Owner⟭
➯ *Tidak melayani Chat aneh-aneh*
⟬Buang waktu⟭
`
conn.sendMessage(m.chat,{ image :{ url : "https://telegra.ph/file/ad1ee4417fdb3cd9652f2.jpg" } , caption : txt }, { quoted: m })
}

handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules)$/i

export default handler
