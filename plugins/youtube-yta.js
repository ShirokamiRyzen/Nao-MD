import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const streamPipeline = promisify(pipeline)

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`

  m.reply(wait)

  const videoUrl = text
  const apiUrl = `${APIs.ryzen}/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`

  try {
    const response = await axios.get(apiUrl)
    const data = response.data

    if (!data.url) throw new Error('Audio URL not found in API response.')

    const { title, author, lengthSeconds, views, uploadDate, videoUrl, thumbnail } = data
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, '').slice(0, 50)
    const tmpDir = path.join(process.cwd(), 'tmp')

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    const filePath = path.join(tmpDir, `${safeTitle}.mp3`)

    // Download audio file
    const audioResponse = await axios({
      method: 'get',
      url: data.url,
      responseType: 'stream'
    })

    await streamPipeline(audioResponse.data, fs.createWriteStream(filePath))

    const caption = `Ini kak audionya @${m.sender.split('@')[0]}

*Title*: ${title}
*Author*: ${author}
*Duration*: ${lengthSeconds} sec
*Views*: ${views}
*Uploaded*: ${uploadDate}
*URL*: ${videoUrl}`

    // Kirim file audio sebagai dokumen
    await conn.sendMessage(m.chat, {
      document: { url: filePath },
      mimetype: 'audio/mpeg',
      fileName: `${safeTitle}.mp3`,
      caption,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: videoUrl,
          title: title,
          body: 'Audio Download',
          sourceUrl: videoUrl,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    }, { quoted: m })

    fs.unlink(filePath, () => { })

  } catch (error) {
    console.error('Error:', error.message)
    throw `Gagal: ${error.message}`
  }
}

handler.help = ['ytmp3'].map(v => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp3)$/i

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
