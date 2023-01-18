import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `[!] Masukkan detail teks.`
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${global.api}&text=${encodeURIComponent(text)}`)
		let anu = Buffer.from(await res.arrayBuffer())
		await conn.sendMessage(m.chat, { image: anu, caption: `Open AI Dall E :\n${text}` }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw `Fitur Error.`
	}
}

handler.help = ['dalle <prompt>']
handler.tags = ['main']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = true

export default handler