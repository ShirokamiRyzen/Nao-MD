import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://candaan-api-h590oa540-ardhptr21.vercel.app/api/image/random'
	if (!res.ok) throw await res.text()
        let json = await res.json()
        conn.sendButton(m.chat, 'mim indo :v', author, json.data.url, [['NEXT', `${command}`]], m)
}
handler.command = /^(meme)$/i
handler.tags = ['internet']
handler.help = ['meme']

export default handler
