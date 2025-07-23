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
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/threads?url=${encodeURIComponent(url)}`);

        const images = data.images || [];
        const videos = data.videos || [];
        const userAgent = data.user_agent;

        if (images.length === 0 && videos.length === 0) {
            throw 'No media found in that Threads post';
        }

        if (!userAgent) {
            throw 'Missing user-agent from API';
        }

        // Send video
        if (videos.length > 0) {
            const videoUrl = videos[0].download;
            const videoBuffer = await fetch(videoUrl, {
                headers: {
                    'User-Agent': userAgent
                }
            }).then(res => res.buffer());

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
                const imgUrl = item.download;
                const imgBuffer = await fetch(imgUrl, {
                    headers: {
                        'User-Agent': userAgent
                    }
                }).then(res => res.buffer());

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
