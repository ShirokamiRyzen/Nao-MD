import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  m.reply(wait)
  try {
    let res = await fetch(`https://api.ryzendesu.com/api/dowloader/fbdown?url=${encodeURIComponent(linknya)}&apikey=${global.ryzen}`)
    let result = await res.json()
    let video = result.result.HD
    //let audio = result.data.audio
    let cap = global.wm
    conn.sendMessage(m.chat, { video: { url: video }, caption: cap }, m)
    //conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, { quoted : m })
  } catch (e) {
    console.log(e)
    m.reply(`Fitur error atau Otak pengguna error`)
  }
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.register = true

handler.command = /^(fb(dl)?)$/i

export default handler