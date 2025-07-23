// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Threads post URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/threads?url=${encodeURIComponent(url)}`);

        if (!data || (!data.images?.length && !data.videos?.length)) {
            throw 'No media found in that Threads post';
        }

        // Send videos first
        if (data.videos?.length > 0) {
            for (const item of data.videos) {
                try {
                    const videoBuffer = await fetch(item.download).then(res => res.buffer());
                    await conn.sendMessage(
                        m.chat,
                        {
                            video: videoBuffer,
                            mimetype: "video/mp4",
                            fileName: "video.mp4",
                            caption: `Ini kak videonya @${sender}`,
                            mentions: [m.sender]
                        },
                        { quoted: m }
                    );
                } catch (err) {
                    console.error('Error sending video:', err);
                    await conn.reply(m.chat, `Gagal mengirim video: ${err.message}`, m);
                }
            }
        }

        // Send images after
        if (data.images?.length > 0) {
            let first = true;
            for (const item of data.images) {
                try {
                    const imageBuffer = await fetch(item.download).then(res => res.buffer());
                    const caption = first ? `Ini kak gambarnya @${sender}` : '';
                    first = false;

                    await conn.sendMessage(
                        m.chat,
                        {
                            image: imageBuffer,
                            caption,
                            mentions: [m.sender]
                        },
                        { quoted: m }
                    );
                } catch (err) {
                    console.error('Error sending image:', err);
                    await conn.reply(m.chat, `Gagal mengirim gambar: ${err.message}`, m);
                }
            }
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `Terjadi kesalahan: ${error}`, m);
    }
}

handler.help = ['threads'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(threads(dl)?)$/i;

handler.limit = true
handler.register = true

export default handler
