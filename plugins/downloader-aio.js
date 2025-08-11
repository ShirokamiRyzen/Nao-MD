import axios from "axios"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`;

    const sender = m.sender.split('@')[0];
    let url = args[0];

    m.reply(wait);

    try {
        let response = await axios.get(`${APIs.ryzumi}/api/downloader/aiodown?url=${encodeURIComponent(url)}`);
        let data = response.data;

        if (!data.success) throw 'Gagal mengambil data video';

        // Cek prioritas kualitas video
        let videoUrl;
        let qualities = ["hd", "sd", "720p"];
        for (let quality of qualities) {
            let video = data.quality.find(v => v.quality.toLowerCase() === quality.toLowerCase());
            if (video) {
                videoUrl = video.url;
                break;
            }
        }

        if (!videoUrl) {
            let lowestQuality = data.quality.reduce((prev, curr) => {
                return parseInt(curr.quality) < parseInt(prev.quality) ? curr : prev;
            });
            videoUrl = lowestQuality.url;
        }

        let caption = `Ini kak videonya @${sender}`.trim();
        await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, mentions: [m.sender], quoted: m });

    } catch (e) {
        throw `Error: ${e.message}`;
    }
}

handler.help = ['aio <url>']
handler.tags = ['downloader']
handler.command = /^(aio)$/i

handler.register = true
handler.limit = 1

export default handler
