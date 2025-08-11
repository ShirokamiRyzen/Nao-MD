import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm;

    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} 1girl, nao tomori (charlotte), school uniform, crop top, pleated skirt, red neckerchief, blue eyes, long silver hair, twin tails, sitting on desk, one hand on head, winking, thighhighs, classroom, window, indoor, sunlight, solo, smile`;
    }
    await m.reply(wait);

    const apiUrl = `${APIs.ryzumi}/api/ai/animagine?prompt=${encodeURIComponent(text)}`;

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

handler.help = ['animagine']
handler.tags = ['ai']
handler.command = /^(animagine)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
