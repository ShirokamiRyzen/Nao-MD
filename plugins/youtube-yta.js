import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  m.reply(wait)
    let res = await fetch(`https://api.ryzendesu.com/api/dowloader/ytmp3?url=${linknya}&apikey=${global.ryzen}`)
    let result = await res.json()
    let audio = result.result.link
    //let audio = result.data.audio
    let cap = global.wm
    conn.sendMessage(m.chat, { document: { url: audio }, caption: cap }, m)
    //conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, { quoted : m })
  
}

handler.help = ['ytmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.register = true

handler.command = /^ytmp3$/i

export default handler