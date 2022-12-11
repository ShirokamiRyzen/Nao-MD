import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	let res = await fetch(`https://api.waifu.pics/nsfw/neko`)
	if (!res.ok) throw await res.text()
	let json = await res.json()
	conn.sendButton(m.chat, `Nyaww~ 🐾💗 ${command.capitalize()}`, json.url, json.url, [['neko18', `${usedPrefix}neko18`]], m)
}
handler.command = /^(neko18)$/i

export default handler