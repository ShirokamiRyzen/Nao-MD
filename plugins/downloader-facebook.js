import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.facebook.com/100082288819998/videos/3440449526202780/`
  try {
    let get = await fetch(`https://api.botcahx.live/api/dowloader/fbdown?url=${args[0]}&apikey=${global.botcahx}`);
    let js = await get.json()
    conn.sendFile(m.chat, js.result.HD, 'fb.mp4', '', m)
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m)
    }
  }
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.register = true

handler.command = /^(fb(dl)?)$/i

export default handler