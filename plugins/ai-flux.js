import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm;

    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} anime girl with glasses, pink short hair, in a uniform, anime style, full body, bokeh`;
    }
    await m.reply(wait);

    const apiUrl = `${APIs.ryzumi}/api/ai/v2/text2img?prompt=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(apiUrl, {
            headers: {
                accept: 'image/png'
            }
        });
        let imageBuffer = await response.buffer();

        await conn.sendFile(m.chat, imageBuffer, 'image.jpg', wm, m);
    } catch (error) {
        conn.reply(m.chat, error.message, m);
    }
}

handler.help = ['flux']
handler.tags = ['ai']
handler.command = /^(flux|flux)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
