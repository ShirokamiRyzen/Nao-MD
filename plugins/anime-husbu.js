import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = `https://api.lolhuman.xyz/api/random/husbu?apikey=${global.lolkey}`
	conn.sendFile(m.chat, await(await fetch(url)).buffer(), 'huu gepenk', wm, m)
}
handler.command = /^(husbu)$/i
handler.tags = ['anime']
handler.help = ['husbu']
handler.limit = true
handler.premium = false
handler.register = true
export default handler
