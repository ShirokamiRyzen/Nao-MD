import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => 
 {
  if (!text) throw `Masukan Query\n*Example:* ${usedPrefix + command} miku`
  let res = await fetch(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${global.lolkey}&query=${text}`)
  let res2 = await res.json()
  let cap = `*Hasil Pencarian Dari ${text}*\n`
  for (let json of res2.result) {
   cap += ` • *ID:* ${json.id} 
• *English:* ${json.title_english}
• *Japanese:* ${json.title_japanese}
• *Native:* ${json.title_native}
• *page:* ${json.page}
`
cap += '\n' + '••••••••••••••••••••••••' + '\n'
  	}
  conn.sendButton(m.chat, cap, author, [['MENU', '.m']], m)
}
handler.command = /^(nhentai)$/i
handler.tag = ['nsfw']
handler.premium = true

export default handler