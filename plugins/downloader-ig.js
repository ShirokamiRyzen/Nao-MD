/*
import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv`
  let api = await axios.get(`https://xzn.wtf/api/igdl?url=${linknya}&apikey=${global.xzn}`)
  let wm = `${global.wm}`
  await m.reply('Sedang diproses...')
  for (let e of api.data.media)
    await conn.sendFile(m.chat, e, '', wm, m)
}
*/
import { instagramdl } from '@bochilteam/scraper'
var handler = async (m, { args }) => {
    if (!args[0]) throw 'Input URL'
    try { 
    	let res = await bochil.snapsave(args[0]) 
    let media = await res[0].url
    if (!res) throw 'Can\'t download the post'
    m.reply(global.wait)
    conn.sendMessage(m.chat, { video : { url : media }}, global.wm, m) 
    } catch {
     try {
     	let res2 = await instagramdl(args[0]) 
   let media2 = res2.url
     return conn.sendFile(m.chat, media2, 'instagram.mp4', global.wm, m)
     } catch {
     conn.sendFile(m.chat,  media, '','', global.wm, m) } finally {
   }
  }
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i
handler.limit = true
handler.register = true

export default handler