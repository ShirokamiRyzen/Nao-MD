import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = `https://api.lolhuman.xyz/api/random/art?apikey=${global.lolkey}`
	conn.sendFile(m.chat, await(await fetch(url)).buffer(), 'nih fanartnya', wm, m)
}
handler.command = /^(fanart)$/i
handler.tags = ['anime']
handler.help = ['fanart']
handler.limit = true
handler.premium = false
handler.register = true
export default handler
