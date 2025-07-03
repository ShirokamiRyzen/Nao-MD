import axios from 'axios'
import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL> <resolution>`

  m.reply(wait)

  const args = text.split(' ')
  const videoUrl = args[0]
  const resolution = args[1] || '480p'

  const apiUrl = `${APIs.ryzen}/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&quality=${resolution}`

  try {
    const response = await axios.get(apiUrl)
    const data = response.data

    if (!data.url) throw 'Download URL not found in API response.'

    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    const safeTitle = data.title.replace(/[\\/:*?"<>|]/g, '').slice(0, 50) // amanin nama file
    const filePath = path.join(tmpDir, `${safeTitle}.mp4`)

    const writer = fs.createWriteStream(filePath)
    const downloadResponse = await axios({
      url: data.url,
      method: 'GET',
      responseType: 'stream',
    })

    downloadResponse.data.pipe(writer)

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })

    const caption = `Ini kak videonya @${m.sender.split('@')[0]}

*Title*: ${data.title}
*Author*: ${data.author} (${data.authorUrl})
*Duration*: ${data.lengthSeconds}
*Views*: ${data.views}
*Uploaded*: ${data.uploadDate}
*URL*: ${data.videoUrl}

*Description*: ${data.description}`

    await conn.sendMessage(m.chat, {
      video: { url: filePath },
      mimetype: 'video/mp4',
      fileName: `${safeTitle}.mp4`,
      caption,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          //showAdAttribution: true,
          mediaType: 2,
          mediaUrl: data.videoUrl,
          title: data.title,
          body: 'Video Download',
          sourceUrl: data.videoUrl,
          thumbnail: await (await conn.getFile(data.thumbnail)).data,
        },
      },
    }, { quoted: m })

    fs.unlink(filePath, () => {})

  } catch (error) {
    console.error(`Error: ${error.message}`)
    throw `Gagal: ${error.message || error}`
  }
}

handler.help = ['ytmp4'].map((v) => v + ' <URL> <resolution>')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
