import axios from "axios"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`;
    let url = args[0];

    m.reply(wait)

    try {
        let response = await axios.get(`https://api.ryzendesu.vip/api/downloader/bilibili?url=${encodeURIComponent(url)}`);
        let data = response.data;

        if (!data.status) throw 'Failed to fetch video data';

        // Ambil informasi video
        let { title, views, like, mediaList } = data.data;

        // Ambil video dengan kualitas tertinggi
        let videoList = mediaList.videoList;
        let video = videoList[0]; // Ambil video pertama
        let videoUrl = video.url;

        let caption = `
*Title:* ${title}
*Views:* ${views}
*Likes:* ${like}
`.trim();

        await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, quoted: m });

    } catch (e) {
        throw `Error: ${e.message}`;
    }
}

handler.help = ['bstation <url>']
handler.tags = ['downloader']
handler.command = /^(bstation|bilibili)$/i

handler.register = true
handler.limit = 1

export default handler
