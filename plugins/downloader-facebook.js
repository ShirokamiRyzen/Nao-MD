import fetch from 'node-fetch'

async function getFinalUrl(url) {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    if (response.headers.get('location')) {
        return await getFinalUrl(response.headers.get('location'));
    }
    return url || response.url;
}

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Input URL\nEx: ${usedPrefix + command} https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz\n\n*Peringatan:* Dilarang menggunakan link fb.watch, karena tidak dapat diakses langsung. Harap salin link tersebut, buka browser, dan tempelkan di sana. Salin link yang diakses dan gunakan di sini.`;
    }

    try {
        if (args[0].includes('fb.watch')) {
            throw '*Dilarang menggunakan link fb.watch. Harap salin link tersebut, buka browser, dan tempelkan di sana. Salin link yang diakses dan gunakan di sini.*';
        }

        const res = await fetch(args[0]);
        const finalUrl = (await getFinalUrl(args[0])) || res.url;

        await conn.reply(m.chat, `Redirected URL: ${finalUrl}\n\n${global.wait}`, m);

        const server = `https://vihangayt.me/download/alldownload?url=${finalUrl}`;

        const hasil = await fetch(server);
        const data = await hasil.json();

        if (data.status) {
            await conn.sendFile(m.chat, data.data.thumbnail, 'thumbnail.jpg', `Title: ${data.data.title}\nURL: ${data.data.url}`);

            if (Array.isArray(data.data.medias)) {
                for (const media of data.data.medias) {
                    const { url, quality, formattedSize, videoAvailable, audioAvailable, chunked, cached } = media;

                    const sizeInfo = formattedSize ? `\nSize: ${formattedSize}` : '';
                    const videoInfo = videoAvailable !== undefined ? `\nAda Video: ${videoAvailable}` : '';
                    const audioInfo = audioAvailable !== undefined ? `\nAda Audio: ${audioAvailable}` : '';
                    const chunkedInfo = chunked !== undefined ? `\nTerpotong-potong: ${chunked}` : '';
                    const cachedInfo = cached !== undefined ? `\nCache: ${cached}` : '';

                    await conn.sendFile(m.chat, url, `${quality}.mp4`, `Quality: ${quality}${sizeInfo}${videoInfo}${audioInfo}${chunkedInfo}${cachedInfo}\n\n${global.wm}\nDonasi: ${global.nomorown}`);
                }
            } else {
                console.warn('Warning: Media data is not iterable or is undefined.');
            }
        } else {
            throw 'Error fetching Facebook media. Please try again later.';
        }
    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, `An error occurred while processing the request. \n\n${error}`, m);
    }
};

handler.help = ['fbdownload <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|fb(dl)?)$/i

handler.register = true
handler.limit = true

export default handler
