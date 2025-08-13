// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Threads URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/downloader/threads?url=${encodeURIComponent(url)}`);

        // Support both new and old API response shapes
        const images = data.image_urls || data.images || [];
        const videos = data.video_urls || data.videos || [];

        if ((images?.length || 0) === 0 && (videos?.length || 0) === 0) {
            throw 'No media found in that Threads post';
        }

        // Send video
        if (videos.length > 0) {
            // New API returns raw URLs, old API returns objects with { download }
            const firstVideo = videos[0];
            const videoUrl = typeof firstVideo === 'string' ? firstVideo : firstVideo.download;
            const videoBuffer = await fetch(videoUrl).then(res => res.buffer());

            await conn.sendMessage(
                m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `threads_video.mp4`,
                    caption: `Ini kak videonya @${sender}`,
                    mentions: [m.sender]
                }, {
                    quoted: m
                }
            );
        }

        // Send all images
        if (images.length > 0) {
            let first = true;
            for (const item of images) {
                const imgUrl = typeof item === 'string' ? item : item.download;
                const imgBuffer = await fetch(imgUrl).then(res => res.buffer());

                const caption = first ? `Ini kak gambarnya @${sender}` : '';
                first = false;

                await conn.sendMessage(
                    m.chat, {
                        image: imgBuffer,
                        caption,
                        mentions: [m.sender]
                    }, {
                        quoted: m
                    }
                );
            }
        }

    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `Terjadi kesalahan: ${error.message || error}`, m);
    }
}

handler.help = ['threads'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(threads(dl)?)$/i;

handler.limit = true
handler.register = true

export default handler
