import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm;
    let user = global.db.data.users[m.sender];
    if (user.isLoadingAnimeDif) {
        await m.reply(wait);
        return;
    }

    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} 1girl, nao tomori (charlotte), school uniform, crop top, pleated skirt, red neckerchief, blue eyes, long silver hair, twin tails, sitting on desk, one hand on head, winking, thighhighs, classroom, window, indoor, sunlight, solo, smile`;
    }
    user.isLoadingAnimeDif = true;
    await m.reply(wait);
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⏱️' } }, { messageId: m.key.id });

    const apiUrl = `${APIs.ryzen}/api/ai/animagine?prompt=${encodeURIComponent(text)}`;

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

handler.help = ['animagine']
handler.tags = ['ai']
handler.command = /^(animagine)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
