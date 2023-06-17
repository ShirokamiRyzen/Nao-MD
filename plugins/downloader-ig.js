import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv`
  let api = await axios.get(`https://xzn.wtf/api/igdl?url=${linknya}&apikey=ikyy`)
  let wm = `${global.wm}`
  await m.reply('Sedang diproses...')
  for (let e of api.data.media)
    await conn.sendFile(m.chat, e, '', wm, m)
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i
handler.limit = true
handler.register = true

export default handler