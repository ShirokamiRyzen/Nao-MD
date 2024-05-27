//Dont delete this credit!!!
//Script by ShirokamiRyzen

import fetch from 'node-fetch'
import { fbdown } from '../lib/scrape.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw 'Please provide a Facebook video URL';
    const sender = m.sender.split(`@`)[0];

    m.reply(wait)

    try {
        const url = args[0];
        const result = await fbdown(url);

        if (!result) {
            throw 'Failed to fetch video details';
        }

        let videoLink;
        let caption;

        if (result.hdLink && result.sdLink) {
            videoLink = result.hdLink;
            caption = `
*Title*: ${result.title}

${result.description}

*HD Link*: ${result.hdLink}
*SD Link*: ${result.sdLink}
`;
        } else {
            videoLink = result.sdLink;
            caption = `
*Title*: ${result.title}

${result.description}

*SD Link*: ${result.sdLink}
`;
        }

        const videoBuffer = await fetch(videoLink).then(res => res.buffer());

        await conn.sendMessage(
            m.chat, {
            video: videoBuffer,
            mimetype: "video/mp4",
            fileName: `video.mp4`,
            caption: `Ini kak videonya @${sender} \n${caption}`,
            mentions: [m.sender],
        }, {
            quoted: m
        },
        );
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
};

handler.help = ['fb <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|facebook|fb(dl)?)$/i

handler.limit = true
handler.register = true

export default handler
