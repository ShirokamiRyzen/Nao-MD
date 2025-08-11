import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `[❗] Contoh: ${usedPrefix + command} https://www.tiktok.com/@m4uryy/video/7350083403556883745\n\natau\n\n${usedPrefix + command} https://v.douyin.com/i5GhvkBY/`

  conn.reply(m.chat, wait, m)

  try {
    const isDouyin = args[0].includes("douyin")
    const API = isDouyin
      ? `${APIs.ryzumi}/api/downloader/v2/ttdl?url=${args[0]}`
      : `${APIs.ryzumi}/api/downloader/ttdl?url=${args[0]}`

    const { data: response } = await axios.get(API)
    let videoData, videoURL, videoURLWatermark, hdURL, info

    if (isDouyin) {
      if (!response.success || !response.data)
        throw "Gagal mendownload video Douyin!"
      videoData = response.data
      const videoInfo = videoData.video_data
      hdURL = videoInfo.nwm_video_url_HQ
      videoURL = args[1] === "hd" && hdURL ? hdURL : videoInfo.nwm_video_url
      videoURLWatermark = videoInfo.wm_video_url
      const uploadTime = new Date(videoData.create_time * 1000).toLocaleString()
      const author = videoData.author || {}
      const authorId = author.unique_id || author.short_id || "unknown"
      info = `Judul: ${videoData.desc}\nUpload: ${uploadTime}\n\nUploader: ${author.nickname || "unknown"}\n(${authorId} - https://www.douyin.com/user/${authorId})\nSound: ${videoData.music.author}\n`
    } else {
      videoData = response.data?.data
      if (!videoData) throw "Gagal mendownload video TikTok!"
      hdURL = videoData.hdplay
      videoURL = args[1] === "hd" && hdURL ? hdURL : videoData.play
      videoURLWatermark = videoData.wmplay
      const author = videoData.author || {}
      info = `Judul: ${videoData.title}\nUpload: ${videoData.create_time}\n\nSTATUS:\n=====================\nLike = ${videoData.digg_count}\nKomen = ${videoData.comment_count}\nShare = ${videoData.share_count}\nViews = ${videoData.play_count}\nSimpan = ${videoData.download_count}\n=====================\n\nUploader: ${author.nickname || "unknown"}\n(${author.unique_id || "unknown"} - https://www.tiktok.com/@${author.unique_id || "unknown"})\nSound: ${videoData.music}\n`
    }

    if (
      videoURL && videoURL.endsWith('.mp3') &&
      videoURLWatermark && videoURLWatermark.endsWith('.mp3') &&
      (!hdURL || hdURL.endsWith('.mp3'))
    ) {
      if (videoData.images?.length) {
        for (let i = 0; i < videoData.images.length; i++) {
          const caption = i === 0 ? `Ini kak gambar ${i + 1}\n\n${info}` : `Ini kak gambar ${i + 1}`
          await conn.sendFile(m.chat, videoData.images[i], `image${i + 1}.jpg`, caption, m)
        }
      } else throw "Tidak ada gambar yang tersedia."
    } else {
      if (videoURL || videoURLWatermark)
        await conn.sendFile(m.chat, videoURL, isDouyin ? "douyin.mp4" : "tiktok.mp4", `Ini kak videonya\n\n${info}`, m)
      else throw "Tidak ada tautan video yang tersedia."
    }
  } catch (error) {
    conn.reply(m.chat, `Error: ${error}`, m)
  }
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tt|ttdl|douyin|tiktok(dl)?)$/i;

handler.disable = false
handler.register = true
handler.limit = true

export default handler
