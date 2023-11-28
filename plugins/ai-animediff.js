import axios from "axios"
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm

    if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} girl big oppai, hair cut collor red, full body, bokeh`
    await m.reply(wait)

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://skizo.tech/api/txt2img?text=${text}&apikey=${global.xzn}`

        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'fubuki.jpg', wm, m)
        m.react(done)

    } catch (e) {
        console.log(e)
        conn.reply(eror)
    }
}

handler.help = ['animediff <prompt>']
handler.tags = ['ai']
handler.command = /^(animediff)$/i

handler.premium = false
handler.limit = true
handler.register = true

export default handler