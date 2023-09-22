import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
    let url = `https://api.waifu.pics/sfw/waifu`
    const response = await fetch(url)
    const data = await response.json()

    if (data.url) {
        conn.sendFile(m.chat, await(await fetch(data.url)).buffer(), 'nih fanartnya', wm, m)
    } else {
        conn.reply(m.chat, 'Gagal mengambil fanart', m)
    }
}

handler.command = /^(fanart)$/i
handler.tags = ['anime']
handler.help = ['fanart']
handler.limit = false
handler.premium = false
handler.register = true
export default handler
