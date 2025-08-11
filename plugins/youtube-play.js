import yts from 'yt-search'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { pipeline } from 'stream'
import { promisify } from 'util'

const streamPipeline = promisify(pipeline)

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example: ${usedPrefix}${command} <search term>`

  const search = await yts(text)
  const vid = search.videos[Math.floor(Math.random() * search.videos.length)]
  if (!vid) throw 'Video not found, coba judul lain ya Sayang~'

  const { title, thumbnail, timestamp, views, ago, url } = vid

  await conn.sendMessage(m.chat, {
    image: { url: thumbnail },
    caption: `🔍 Menemukan lagu: *${title}*\nSedang diunduh ya...`,
  }, { quoted: m })

  try {
    const response = await axios.get(`${APIs.ryzumi}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`)
    const data = response.data

    if (!data.url) throw new Error('Audio URL not found')

    const safeTitle = data.title.replace(/[\\/:*?"<>|]/g, '').slice(0, 50)
    const tmpDir = path.join(process.cwd(), 'tmp')

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    const filePath = path.join(tmpDir, `${safeTitle}.mp3`)

    const audioResponse = await axios({
      method: 'get',
      url: data.url,
      responseType: 'stream',
    })

    await streamPipeline(audioResponse.data, fs.createWriteStream(filePath))

    await conn.sendMessage(m.chat, {
      audio: { url: filePath },
      mimetype: 'audio/mpeg',
      fileName: `${safeTitle}.mp3`,
      caption: `*${data.title}*\n*Duration*: ${data.lengthSeconds} sec\n*Views*: ${data.views}\n*Uploaded*: ${data.uploadDate}`,
      contextInfo: {
        externalAdReply: {
          //showAdAttribution: true,
          mediaType: 2,
          mediaUrl: data.videoUrl,
          title: data.title,
          body: 'Audio Download',
          sourceUrl: data.videoUrl,
          thumbnail: await (await conn.getFile(data.thumbnail)).data,
        },
      },
    }, { quoted: m })

    fs.unlink(filePath, () => { })

  } catch (error) {
    console.error('Error:', error.message)
    throw `Gagal download audionya Sayang 😢: ${error.message}`
  }
}

handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i

handler.limit = 8
handler.register = true
handler.disable = false

export default handler
