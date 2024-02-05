//Dont delete this credit!!!
//Script by ShirokamiRyzen

import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) throw 'Please provide a Facebook video URL';

        const url = args[0];
        const result = await fbdown(url);

        if (!result) {
            throw 'Failed to fetch video details';
        }

        const videoBuffer = await fetch(result.hdLink).then(res => res.buffer());

        const responseText = `
*Title*: ${result.title}
*Description*: ${result.description}
*SD Link*: ${result.sdLink}
*HD Link*: ${result.hdLink}
        `;

        conn.sendFile(m.chat, videoBuffer, 'video.mp4', responseText, m);
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
};

handler.help = ['fb <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|fb(dl)?)$/i

handler.limit = true
handler.register = true

export default handler

async function fbdown(url) {
    try {
        const postOptions = {
            method: 'POST',
            body: new URLSearchParams({
                URLz: url,
            }),
        };

        const response = await fetch('https://fdown.net/download.php', postOptions);
        const html = await response.text();

        const $ = cheerio.load(html);

        return {
            title: $('.lib-row.lib-header').text().trim(),
            description: $('.lib-row.lib-desc').text().trim(),
            sdLink: $('#sdlink').attr('href'),
            hdLink: $('#hdlink').attr('href'),
        };
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
