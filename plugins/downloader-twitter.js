import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) {
        return m.reply(`Masukkan Link:\n${usedPrefix + command} https://twitter.com/kegblgnunfaedh/status/1747862212725862428/`)
    }

    const sender = m.sender.split(`@`)[0];

    let url = `https://twitsave.com/info?url=${text}`
    let headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'TE': 'trailers'
    }

    try {
        let server = 1;
        let finalURL = await tryDownload(url, headers, server);

        if (!finalURL) {
            throw new Error("All servers down");
        }

        await conn.sendMessage(m.chat, {
            video: {
                url: finalURL
            },
            caption: `Ini kak videonya @${sender} Menggunakan server ${server}`,
            mentions: [m.sender],
        }, m);
    } catch (error) {
        console.error(error);
        return m.reply("Error downloading video");
    }
};

handler.help = ['xdl'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(twitsave|x|twitdl|xdl|twitterdownloader|txdl)$/i

handler.limit = true
handler.register = true

export default handler

async function tryDownload(url, headers, server) {
    try {
        let res = await fetch(url, {
            method: 'GET',
            headers: headers,
            follow: 5
        });

        if (res.status !== 200) {
            throw new Error(`HTTP status ${res.status}`);
        }

        let body = await res.text();
        const $ = cheerio.load(body);

        const filteredHrefs = $('a[href^="https://twitsave.com/download?file="]').map((index, element) => {
            return $(element).attr('href');
        }).get();

        const finalURLs = await Promise.all(filteredHrefs.map(async (href) => {
            const response = await fetch(href);
            return response.redirected ? response.url : href;
        }));

        return finalURLs[server - 1]; // Return the URL from the specified server
    } catch (error) {
        console.error(`Error on server ${server}: ${error.message}`);
        return null;
    }
}
