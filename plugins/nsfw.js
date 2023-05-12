import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `Use example .lewd neko`
  let res = await fetch(`https://api.waifu.pics/nsfw/${text}`)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Error!'
  conn.sendFile(m.chat, json.url, '', '2023 © Nao Bot V2', m)
}
handler.command = /^(lewd)$/i
handler.premium = true
handler.limit = true

export default handler