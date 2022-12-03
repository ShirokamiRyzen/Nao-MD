import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let res = await fetch('https://melcanz.com/randomkanna?&apikey=melcantik')
	if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
	conn.sendButton(m.chat, 'Kanna-Chan', author, json.url,[['Next',`.${command}`]],m)
}
handler.command = /^(kanna)$/i
handler.tags = ['anime']
handler.help = ['kanna']
handler.limit = true
export default handler
