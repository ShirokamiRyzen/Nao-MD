import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Main Pages -> ryzn.my.id
Blogspot -> www.win-tweak.my.id
Uptime -> uptime.ryzn.my.id

----------------------
Prosekai Sticker Maker -> sekai.ryzn.my.id
----------------------

Revanced -> ryzn.my.id/revanced
Spotify Mod -> ryzn.my.id/spotify
Mod Manager -> ryzn.my.id/mods
`.trim()
  m.reply(caption)
}
handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i
handler.limit = false

export default handler
