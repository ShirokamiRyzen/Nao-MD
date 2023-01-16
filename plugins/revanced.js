import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Download disini -> https://ryzn.my.id/revanced
`.trim()
  m.reply(caption)
}
handler.help = ['revanced']
handler.tags = ['main']
handler.command = /^(revanced)$/i
handler.limit = false

export default handler
