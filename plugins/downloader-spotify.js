import axios from 'axios'

let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`

    let url = args[0]

    m.reply(wait)

    try {
        let { data } = await axios.get(`https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(url)}`)

        if (data.success) {
            if (data.metadata.playlistName) {
                // Jika URL yang diberikan adalah playlist
                let playlistName = data.metadata.playlistName;
                let cover = data.metadata.cover;
                let tracks = data.tracks;

                m.reply(`*Playlist:* ${playlistName}\n*Cover:* ${cover}\n*Total Tracks:* ${tracks.length}`);

                for (let i = 0; i < tracks.length; i++) {
                    let track = tracks[i];

                    if (track.success) {
                        let { title, artists, album, cover, link } = track.metadata;

                        await conn.sendFile(m.chat, link, `${title} - ${artists}.mp3`,
                            `
*Title:* ${title}
*Artists:* ${artists}
*Album:* ${album}
*Release Date:* ${track.metadata.releaseDate}
*Cover:* ${cover}
`, m);

                        // Delay sebelum mengirimkan track berikutnya
                        await delay(1500);
                    } else {
                        m.reply(`Error: Failed to download track ${i + 1}`);
                    }
                }
            } else {
                // Jika URL yang diberikan adalah track tunggal
                let { title, artists, album, cover, link } = data.metadata;

                await conn.sendFile(m.chat, link, `${title} - ${artists}.mp3`,
                    `
*Title:* ${title}
*Artists:* ${artists}
*Album:* ${album}
*Release Date:* ${data.metadata.releaseDate}
*Cover:* ${cover}
`, m);
            }
        } else {
            throw 'Error: Failed to download. Please check the URL and try again.';
        }
    } catch (err) {
        console.error(err)
        throw 'Error: Something went wrong while processing the request.'
    }
}

handler.help = ['spotify <url>']
handler.tags = ['downloader']
handler.command = /^(spotify(dl)?)$/i

handler.limit = 2
handler.register = true

export default handler
