import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `select tag:
blowjob
neko
trap
waifu`
  let res = await fetch(`https://api.waifu.pics/nsfw/${text}`)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Error!'
  conn.sendFile(m.chat, json.url, '', global.wm, m)
}
handler.command = /^(lewd)$/i
handler.premium = true
handler.limit = true

export default handler