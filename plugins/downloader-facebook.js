import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const linknya = args[0];

    if (!args[0]) throw `Input *URL*\n\n*Dont use m.facebook link!!!!!*`;

    try {
        let response = await fetch(`https://api.ryzendesu.vip/api/dowloader/fbdown?url=${linknya}&apikey=${global.ryzen}`);
        let data = await response.json();

        // Check if the status is true before proceeding
        if (data.status) {
            let videoUrl = data.result.HD || data.result.Normal_video;

            if (videoUrl) {
                await m.reply(wait);
                await conn.sendFile(m.chat, videoUrl, '', global.wm, m);
            } else {
                throw 'HD and Normal video links not found in the API response.';
            }
        } else {
            throw 'API returned false status';
        }
    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e}`);
    }
}

handler.help = ['fb <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|fb(dl)?)$/i
handler.limit = true
handler.register = true

export default handler