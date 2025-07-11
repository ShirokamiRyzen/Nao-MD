import fetch from "node-fetch"
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example:\n${usedPrefix + command} https://t.me/addstickers/sshaaaaa`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `Invalid URL`

    let apiUrl = `https://api.ryzumi.vip/api/image/sticker-tele?url=${encodeURIComponent(args[0])}`
    let res = await fetch(apiUrl)
    if (!res.ok) throw `Error: ${res.status} ${res.statusText}`

    let json = await res.json()
    let stickers = json.stickers?.stickers || []
    if (!stickers.length) throw `Not found`

    m.reply(`*Total stiker:* ${stickers.length}`)

    for (let s of stickers) {
        if (!s.is_animated && s.image_url) {
            let stiker = await sticker(false, s.image_url, global.stickpack, global.stickauth)
            if (stiker) await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { quoted: m })
            await delay(1000)
        }
    }

    throw `*Done*`
}

handler.help = ['stickertele']
handler.tags = ['sticker']
handler.command = /^(stic?kertele(gram)?)$/i
handler.limit = 15
handler.register = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
