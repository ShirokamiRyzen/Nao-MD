import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `Use example .pic neko`
	let res = await fetch(`https://api.waifu.pics/sfw/${text}`)
  
	if (!res.ok) throw await res.text()
	let json = await res.json()
	conn.sendButton(m.chat, `Nyaww~ 🐾💗 ${command.capitalize()}`, json.url, json.url, [['next', `${usedPrefix}pic ${text}`]], m)
}

handler.tags = ['anime']
handler.help = ['pic <category>']
handler.command = /^(pic)$/i
handler.premium = false
handler.limit = false

export default handler