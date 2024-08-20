import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm

    if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} girl big oppai, hair cut collor red, full body, bokeh`
    await m.reply(wait)

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://api.ryzendesu.vip/api/ai/flux-diffusion?prompt=${text}`

        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'fubuki.jpg', wm, m)
        m.react(done)

    } catch (e) {
        console.log(e)
        conn.reply(eror)
    }
}

handler.help = ['text2img <prompt>']
handler.tags = ['ai']
handler.command = /^(text2img)$/i

handler.premium = false
handler.limit = 2
handler.register = true

export default handler