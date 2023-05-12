import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `Use example .pic neko`
  let res = await fetch(`https://api.waifu.pics/sfw/${text}`)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Error!'
  conn.sendFile(m.chat, json.url, '', '2023 © Nao Bot V2', m)
}

handler.tags = ['anime']
handler.help = ['pic <category>']
handler.command = /^(pic)$/i
handler.premium = false
handler.limit = false

export default handler