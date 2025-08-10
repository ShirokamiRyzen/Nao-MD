// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide an Instagram media URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/igdl?url=${encodeURIComponent(url)}`);

        if (!data.status || !Array.isArray(data.data) || data.data.length === 0) {
            throw 'No available media found';
        }

        const mediaData = data.data;
        let first = true;

        for (const item of mediaData) {
            try {
                const mediaUrl = item.url;
                const type = (item.type || '').toLowerCase();
                const buffer = await fetch(mediaUrl).then(res => res.buffer());
                const caption = first ? `Ini kak @${sender}` : '';
                first = false;

                if (type === 'video') {
                    await conn.sendMessage(
                        m.chat, {
                            video: buffer,
                            mimetype: "video/mp4",
                            fileName: `video.mp4`,
                            caption: caption,
                            mentions: [m.sender],
                        }, {
                            quoted: m
                        }
                    );
                } else if (type === 'image') {
                    await conn.sendMessage(
                        m.chat, {
                            image: buffer,
                            caption: caption,
                            mentions: [m.sender]
                        }, {
                            quoted: m
                        }
                    );
                } else {
                    // fallback kalau type tidak jelas
                    try {
                        await conn.sendMessage(
                            m.chat, {
                                image: buffer,
                                caption: caption,
                                mentions: [m.sender]
                            }, {
                                quoted: m
                            }
                        );
                    } catch {
                        await conn.sendMessage(
                            m.chat, {
                                video: buffer,
                                mimetype: "video/mp4",
                                fileName: `video.mp4`,
                                caption: caption,
                                mentions: [m.sender],
                            }, {
                                quoted: m
                            }
                        );
                    }
                }
            } catch (error) {
                console.error('Error sending media:', error);
                await conn.reply(m.chat, `Gagal mengirim media: ${error.message}`, m);
            }
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
