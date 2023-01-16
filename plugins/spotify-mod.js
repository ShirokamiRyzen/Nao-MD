import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Download disini -> www.ryzn.my.id/spotify
`.trim()
  m.reply(caption)
}
handler.help = ['spotify mod']
handler.tags = ['main']
handler.command = /^(spotify)$/i
handler.limit = false

export default handler
