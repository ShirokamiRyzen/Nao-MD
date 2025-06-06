// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Pinterest URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/pinterest?url=${encodeURIComponent(url)}`);

        if (!data.success || !data.media || data.media.length === 0) {
            throw 'No available media found';
        }

        const mediaData = data.media;

        // Pisahkan video dan gambar
        const videos = mediaData
            .filter(item => item.extension === 'mp4')
            .sort((a, b) => (b.size || 0) - (a.size || 0));

        const images = mediaData
            .filter(item => item.extension === 'jpg')
            .sort((a, b) => {
                // urutkan berdasarkan x paling tinggi (di URL) jika tidak "original"
                if (a.quality === 'original') return -1;
                if (b.quality === 'original') return 1;
                const ax = parseInt(a.quality) || 0;
                const bx = parseInt(b.quality) || 0;
                return bx - ax;
            });

        // Ambil gambar terbaik
        let imageBuffer = null;
        let imageUrl = null;

        for (const img of images) {
            try {
                const res = await fetch(img.url);
                if (res.ok) {
                    imageBuffer = await res.buffer();
                    imageUrl = img.url;
                    break;
                }
            } catch (e) {
                console.warn('Failed image fetch, trying next:', img.url);
            }
        }

        // Kirim gambar
        if (imageBuffer) {
            await conn.sendMessage(
                m.chat, {
                image: imageBuffer,
                caption: `Ini gambarnya, @${sender}`,
                mentions: [m.sender]
            },
                { quoted: m }
            );
        }

        // Kirim video (jika ada)
        if (videos.length > 0) {
            try {
                const videoUrl = videos[0].url;
                const videoBuffer = await fetch(videoUrl).then(res => res.buffer());

                await conn.sendMessage(
                    m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `video.mp4`,
                    caption: `Dan ini videonya, @${sender}`,
                    mentions: [m.sender],
                }, {
                    quoted: m
                }
                );
            } catch (error) {
                console.error('Error sending video:', error);
                await conn.reply(m.chat, `Gagal mengirim video: ${error.message}`, m);
            }
        }

        if (!imageBuffer && videos.length === 0) {
            throw 'Tidak ada gambar atau video yang bisa diunduh';
        }

    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `Terjadi kesalahan: ${error}`, m);
    }
}

handler.help = ['pinterest'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(pinterestdl|pindl)$/i;

handler.limit = 2
handler.register = true

export default handler
