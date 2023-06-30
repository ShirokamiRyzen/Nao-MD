import { youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

const handler = async (m, { conn, args, command }) => {
  const v = args[0]

  const resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p"]
  let qu = args[1] && resolutions.includes(args[1]) ? args[1] : "360p"
  let q = qu.replace('p', '')

  await m.reply('Permintaan download video/mp4 youtube sedang diproses, mohon bersabar...')

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

    await conn.sendMessage(m.chat, { video: { url: dlUrl, caption: title, ...thumb } }, { quoted: m })

    await m.reply(`● Title: ${title}
● Resolution: ${selectedResolution}
● Size: ${size}
● Video Telah Berhasil Diunduh!`)
  } else {
    await m.reply(`Maaf, Video Tidak Ada.`)
  }
}

handler.help = ["ytmp4 <link>"]
handler.tags = ['downloader']
handler.command = /(^ytmp4)$/i

handler.register = true

export default handler