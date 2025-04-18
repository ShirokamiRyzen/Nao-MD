import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm;
    let user = global.db.data.users[m.sender];
    if (user.isLoadingAnimeDif) {
        await m.reply(wait);
        return;
    }

    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} anime girl with glasses, pink short hair, in a uniform, anime style, full body, bokeh`;
    }
    user.isLoadingAnimeDif = true;
    await m.reply(wait);
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⏱️' } }, { messageId: m.key.id });

    const apiUrl = `${APIs.ryzen}/api/ai/waifu-diff?prompt=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(apiUrl);
        let imageBuffer = await response.buffer();

        await conn.sendFile(m.chat, imageBuffer, 'image.jpg', wm, m);
        m.react('✅');
    } catch (error) {
        conn.reply(m.chat, 'All API URLs failed. Please try again later.', m);
    } finally {
        user.isLoadingAnimeDif = false;
    }
}

handler.help = ['flux']
handler.tags = ['ai']
handler.command = /^(flux|flux)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
