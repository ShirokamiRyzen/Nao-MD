import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm;
    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} anime girl with glasses, pink short hair, in a uniform, anime style, full body, bokeh`;
    }
    await m.reply(wait);

    const apiUrl = `${APIs.ryzumi}/api/ai/text2img?prompt=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(apiUrl);
        let imageBuffer = await response.buffer();

        await conn.sendFile(m.chat, imageBuffer, 'image.jpg', wm, m);
    } catch (error) {
        conn.reply(m.chat, 'All API URLs failed. Please try again later.', m);
    }
}

handler.help = ['txt2img']
handler.tags = ['ai']
handler.command = /^(text2img|txt2img)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
