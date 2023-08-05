import yts from 'yt-search'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async(m, { conn, usedPrefix, text, command, args }) => {
    let user = m.sender
    let name = conn.getName(user)
    if (!text) throw `Harap masukkan query!\n\nContoh: ${usedPrefix + command} yanagi nagi one's hope`
    let results = await yts(text)
    let vid = results.all.find(video => video.seconds < 3600)
    if (!vid) throw 'Konten Tidak ditemukan'
    const { thumbnail, audio: _audio, title } = await youtubedl(vid.url).catch(async _ => await youtubedlv2(vid.url)).catch(async _ => await youtubedlv3(vid.url))
    let audio, source, res, link, lastError
    for (let i in _audio) {
        try {
            audio = _audio[i]
            link = await audio.download()
            if (link) res = await fetch(link)
            if (res) source = await res.arrayBuffer()
            if (source instanceof ArrayBuffer) break
        } catch (e) {
            audio = link = source = null
            lastError = e
        }
    }
    if ((!(source instanceof ArrayBuffer) || !link || !res.ok)) throw 'Error: ' + (lastError || 'Can\'t download audio')
    let capt = `
${title}
Requested by @${user.split`@`[0]}

Bot akan secara otomatis mengirimkan file audio.`
    const message = {
        image: { url: thumbnail},
        jpegThumbnail: await(await fetch(thumbnail)).buffer(),
        caption: capt,
        footer: watermark,
        mentions: [user],
        templateButtons: [
            {
                urlButton: {
                    displayText: 'Open on Youtube',
                    url: vid.url
                }
            }, {
                quickReplyButton: {
                    displayText: 'Download mp4',
                    id: `.ytmp4 ${vid.url}`
                }
            }
        ]
    }
    await conn.sendMessage(m.chat, message, { quoted: m})
    // await conn.sendFile(m.chat, thumbnail, '', `${title}\nRequested by @${user.split`@`[0]}`, m, null, { mentions: [user]})
    await conn.sendFile(m.chat, source, title + '.mp3', null, m, null, { mimetype: 'audio/mp4' })
}

handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader', 'limitmenu']
handler.command = /^play?$/i

handler.exp = 0
handler.register = true

export default handler
