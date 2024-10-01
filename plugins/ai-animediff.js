import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm
    let user = global.db.data.users[m.sender];
    if (user.isLoadingAnimeDif) {
        await m.reply("⏱️ Sedang dalam proses, harap tunggu hingga selesai.");
        return;
    }


    if (!text) {
        throw `This command generates images from text prompts.\n\nExample usage:\n${usedPrefix + command} a girl with glasses, pink short hair, in a uniform, anime style, full body, bokeh`
    }
    user.isLoadingAnimeDif = true;
    await m.reply(wait)
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⏱️' } }, { messageId: m.key.id })

    const apiCombinations = [
        `https://api.ryzendesu.vip/api/ai/flux-diffusion?prompt=${encodeURIComponent(text)}`,   // Primary API: flux-diffusion
        `https://api.ryzendesu.vip/api/ai/flux-schnell?prompt=${encodeURIComponent(text)}`,      // Primary API: flux-schnell
        `https://apidl.asepharyana.my.id/api/ai/flux-diffusion?prompt=${encodeURIComponent(text)}`,  // Backup API: flux-diffusion
        `https://apidl.asepharyana.my.id/api/ai/flux-schnell?prompt=${encodeURIComponent(text)}`     // Backup API: flux-schnell
    ];

    let usedBackup = false;

    // Loop through the API combinations one by one
    for (let i = 0; i < apiCombinations.length; i++) {
        try {
            let response = await fetch(apiCombinations[i]);
            let imageBuffer = await response.buffer();

            // if (i >= 2) {
            //     conn.reply(m.chat, '⚠️ Using backup API due to failure of the primary.', m);
            // }

            // Send the file if successful
            await conn.sendFile(m.chat, imageBuffer, 'image.jpg', wm, m);
            m.react('');  // React with a success emoji 

            break;  // Break the loop after successful execution

        } catch (error) {
            console.log(`URL ${apiCombinations[i]} failed:`, error);

            // If it is the last URL and all have failed
            if (i === apiCombinations.length - 1) {
                conn.reply(m.chat, 'All API URLs failed. Please try again later.', m);
                return;
            }
        } finally {
            user.isLoadingAnimeDif = false; // Reset flag isLoadingAnimeDif ke false setelah selesai (berhasil/gagal)
        }
    }
}

handler.help = ['text2img <prompt>']
handler.tags = ['ai']
handler.command = /^(text2img)$/i

handler.premium = false
handler.limit = 15
handler.register = true

export default handler
