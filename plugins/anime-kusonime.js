import fetch from 'node-fetch'
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `Example : ${usedPrefix + command} Charlotte`
    try {
        let res = await fetch(`https://api.lolhuman.xyz/api/kusonime?apikey=${global.lolkey}&url=https://kusonime.com/${encodeURIComponent(text)}-bd-batch-subtitle-indonesia`)
        let json = await res.json()
        let get_result = json.result
        let ini_txt = `*Judul :* "${get_result.japanese}"\n
*Genre:* ${get_result.genre}\n
*Season:* ${get_result.seasons}\n
*Status:* ${get_result.status}\n
*Total Eps:* ${get_result.total_episode}\n
*Sinopsis :* ${get_result.desc}\n
*LINK DOWNLOADS:* ${get_result.link_dl}`
        
        conn.sendFile(m.chat, get_result.thumb, 'anime.jpg', ini_txt, m)
    } catch (e) {
        console.log(e)
        m.reply(`Tidak ditemukan hasil.`)
    }
}
handler.help = ['kusonime <judul>']
handler.tags = ['anime']
handler.command = /^kusonime$/i
handler.group = false
handler.limit = true
export default handler
