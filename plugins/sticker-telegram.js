import fetch from "node-fetch"
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example:\n${usedPrefix + command} https://t.me/addstickers/Porcientoreal`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `???`
    let packName = args[0].replace("https://t.me/addstickers/", "") 
    let gas = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    if (!gas.ok) throw eror
    let json = await gas.json()
    m.reply(`*Sticker total:* ${json.result.stickers.length}`.trim())
    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id
        let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        let stiker = await sticker(false, "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, global.stickpack, global.stickauth)
        await delay(1000)
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { quoted: m })
        await delay(1000)
    }
    throw `*Done*`
}
handler.help = ['stickertele <url>']
handler.tags = ['sticker']
handler.command = /^(stic?kertele(gram)?)$/i

handler.limit = 1
handler.register = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))