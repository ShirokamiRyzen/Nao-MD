import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Download disini -> http://gg.gg/12x7lg
`.trim()
  m.reply(caption)
}
handler.help = ['revanced']
handler.tags = ['main']
handler.command = /^(revanced)$/i
handler.limit = false

export default handler
