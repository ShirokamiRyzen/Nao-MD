import axios from 'axios'

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`

    let url = args[0]

    m.reply(wait)

    try {
        let response = await axios.get(`${APIs.ryzumi}/api/downloader/spotify?url=${encodeURIComponent(url)}`)
        let data = response.data

        if (data.success) {
            if (data.metadata.playlistName) {
                // Jika URL yang diberikan adalah playlist
                let playlistName = data.metadata.playlistName
                let cover = data.metadata.cover
                let tracks = data.tracks

                m.reply(`*Playlist:* ${playlistName}\n*Cover:* ${cover}\n*Total Tracks:* ${tracks.length}`)

                for (let i = 0; i < tracks.length; i++) {
                    let track = tracks[i]

                    if (track.success) {
                        let { title, artists, album, cover, releaseDate } = track.metadata
                        let link = track.link  // Mengambil link dari dalam objek track

                        // Mengunduh file audio sebagai buffer
                        let audioResponse = await axios.get(link, { responseType: 'arraybuffer' })
                        let audioBuffer = audioResponse.data

                        // Mengirim file audio sebagai dokumen
                        await conn.sendMessage(m.chat, {
                            document: audioBuffer, // Buffer langsung dimasukkan di sini
                            mimetype: 'audio/mpeg',
                            fileName: `${title}.mp3`,
                            caption: `
*Title:* ${title}
*Artists:* ${artists}
*Album:* ${album}
*Release Date:* ${releaseDate}
*Cover:* ${cover}
                            `,
                        }, { quoted: m })

                        // Delay sebelum mengirimkan track berikutnya
                        await delay(1500)
                    } else {
                        m.reply(`Error: Failed to download track ${i + 1}`)
                    }
                }
            } else {
                // Jika URL yang diberikan adalah track tunggal
                let { title, artists, album, cover, releaseDate } = data.metadata
                let link = data.link  // Mengambil link dari response utama

                // Mengunduh file audio sebagai buffer
                let audioResponse = await axios.get(link, { responseType: 'arraybuffer' })
                let audioBuffer = audioResponse.data

                // Mengirim file audio sebagai dokumen
                await conn.sendMessage(m.chat, {
                    document: audioBuffer, // Buffer langsung dimasukkan di sini
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`,
                    caption: `
*Title:* ${title}
*Artists:* ${artists}
*Album:* ${album}
*Release Date:* ${releaseDate}
*Cover:* ${cover}
                    `,
                }, { quoted: m })
            }
        } else {
            throw 'Error: Failed to download. Please check the URL and try again.'
        }
    } catch (err) {
        console.error(err)
        throw `Error: ${err.message}`
    }
}

handler.help = ['spotify <url>']
handler.tags = ['downloader']
handler.command = /^(spotify(dl)?)$/i

handler.limit = 2
handler.register = true

export default handler
