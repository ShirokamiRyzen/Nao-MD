import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Main Pages -> https://ouo.io/oMI6P6
Blogspot -> https://ouo.io/4Ph7Fj
Uptime -> https://ouo.io/J105N

----------------------
Prosekai Sticker Maker -> https://ouo.io/TDd2Bk
----------------------

`.trim()
  m.reply(caption)
}
handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i
handler.limit = false

export default handler
