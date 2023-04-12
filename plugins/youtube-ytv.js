/*
let limit = 80
import fetch from 'node-fetch'
import { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, video: _video, title} = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let video, source, res, link, lastError, isLimit
  for (let i in _video) {
    try {
      video = _video[i]
      isLimit = limitedSize < video.fileSize
      if (isLimit) continue
      link = await video.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      video = source = link = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download video')
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${title}
*${htjava} Status:* Video sedang diproses...
`.trim(), m)
  let _thumb = {}
  try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
  catch (e) { }
  if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp4', `
*${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${title}
*${htjava} Quality:* 1080p
*${htjava} Format:* mp4
`.trim(), m, false, {
    ..._thumb,
    asDocument: chat.useDocument
  })
}
handler.help = ['ytmp4 <url> <without message>']
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i

handler.exp = 0
handler.register = false
handler.limit = true


export default handler
*/

// Update by Xnuvers007

import { youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

const handler = async (m, { conn, args, command }) => {
  const v = args[0]

  const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p"]
  let qu = args[1] && resolutions.includes(args[1]) ? args[1] : "360p"
  let q = qu.replace('p', '')

  let thumb = {}
  try {
    const thumb2 = yt.thumbnails[0].url
    thumb = { jpegThumbnail: thumb2 }
  } catch (e) {}

  let yt
  try {
    yt = await youtubedlv2(v)
  } catch {
    yt = await youtubedlv3(v)
  }

  const title = await yt.title

  let size = ''
  let dlUrl = ''
  let selectedResolution = ''
  let selectedQuality = ''
  for (let i = resolutions.length - 1; i >= 0; i--) {
    const res = resolutions[i]
    if (yt.video[res]) {
      selectedResolution = res
      selectedQuality = res.replace('p', '')
      size = await yt.video[res].fileSizeH
      dlUrl = await yt.video[res].download()
      break
    }
  }

  if (dlUrl) {
    await m.reply(`Permintaan download video YouTube. Sedang diproses, mohon bersabar...`)

    await conn.sendMessage(m.chat, { video: { url: dlUrl, caption: title, ...thumb } }, { quoted: m })

    await m.reply(`● Title: ${title}
● Resolution: ${selectedResolution}
● Size: ${size}
● Video telah berhasil diunduh!`)
  } else {
    await m.reply(`Maaf, video tidak tersedia untuk diunduh.`)
  }
}

handler.command = /^(ytmp4|youtubemp4)$/i
handler.help = ["ytmp4 <link>"]
handler.tags = ['downloader']

export default handler