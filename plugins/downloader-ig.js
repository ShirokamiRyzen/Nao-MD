// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide an Instagram video URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/igdl?url=${encodeURIComponent(url)}`);
        
        if (!data.status || !data.data || data.data.length === 0) {
            throw 'No available media found';
        }

        const mediaData = data.data;
        const videos = mediaData.filter(item => item.url.includes('rapidcdn.app'));
        const images = mediaData.filter(item => item.url.includes('cdninstagram.com'));

        if (videos.length > 0) {
            const videoUrl = videos[0].url;
            const videoBuffer = await fetch(videoUrl).then(res => res.buffer());
            const caption = `Ini kak videonya @${sender}`;

            await conn.sendMessage(
                m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `video.mp4`,
                    caption: caption,
                    mentions: [m.sender],
                }, {
                    quoted: m
                }
            );
        } else if (images.length > 0) {
            for (const item of images) {
                try {
                    const imageUrl = item.url;
                    const imageBuffer = await fetch(imageUrl).then(res => res.buffer());
                    await conn.sendMessage(
                        m.chat, {
                            image: imageBuffer,
                            caption: `Ini kak gambarnya @${sender}`,
                            mentions: [m.sender]
                        }, {
                            quoted: m
                        }
                    );
                } catch (error) {
                    console.error('Error sending image:', error);
                    await conn.reply(m.chat, `Gagal mengirim gambar: ${error.message}`, m);
                }
            }
        } else {
            throw 'No available media found';
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
}

handler.help = ['ig'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?)$/i;

handler.limit = true
handler.register = true

export default handler