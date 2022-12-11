import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/nsfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendButton(m.chat, 'Istrinya Kartun', author, json.url, [['waifu18', `${usedPrefix}waifu18`]], m)
}
handler.limit = true
handler.command = /^(waifu18)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default handler
