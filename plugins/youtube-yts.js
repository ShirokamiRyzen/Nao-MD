/*
import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { text }) => {
  if (!text) throw 'Cari apa?'
  const { video, channel } = await youtubeSearch(text)
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': return `
💌 *${v.title}* 
🔗 _${v.url}_
⏰ Duration: ${v.durationH}
📤 Uploaded ${v.publishedTime}
👁️ ${v.view} views
      `.trim()
      case 'channel': return `
╭──────━• *CHANNEL*
│🎀 *${v.channelName}* 
│🔗 _${v.url}_
│📛 _${v.subscriberH} Subscriber_
│🎥 ${v.videoCount} video
┗──────━•
`.trim()
    }
  }).filter(v => v).join('\n\n─────────────━─────────────\n\n')
  m.reply(`*${htki} SEARCH ${htka}*\n\n` + teks)
}
*/
import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, {conn, text }) => {
  if (!text) throw 'Cari apa?'
  await conn.reply(m.chat, global.wait, m)
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
° *_${v.title}_*
↳ 🫐 *_Link :_* ${v.url}
↳ 🕒 *_Duration :_* ${v.timestamp}
↳ 📥 *_Uploaded :_* ${v.ago}
↳ 👁 *_Views :_* ${v.views}`}}).filter(v => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n')
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i

export default handler
