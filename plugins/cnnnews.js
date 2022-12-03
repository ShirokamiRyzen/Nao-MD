import fetch from 'node-fetch'
import bo from 'dhn-api'
let handler = async(m, { conn }) => {
   var a = await bo.CNNNews()
   var b = JSON.parse(JSON.stringify(a))
   var c = await conn.rand(b)
   //var c = b[Math.floor(Math.random() * b.length)]
   var { berita, berita_url, berita_thumb } = c
   var sell = `📺 *CNN News*
📢 *Berita:* ${berita}
🛰 *Source Url:* ${berita_url}`
   conn.sendButton(m.chat, sell, wm, berita_thumb, [['CNN News', '.cnnnews']], m, {jpegThumbnail: await(await fetch(berita_thumb)).buffer()})
}
handler.help = ['cnnnews']
handler.tags = ['berita']
handler.command = /^cnn(news)?$/i
handler.limit = true

export default handler
