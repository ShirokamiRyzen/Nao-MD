import fetch from 'node-fetch'

var handler = async (m, { conn, text }) => {
if (!text) throw `*Masukan Judul Anime Yang Ingin Kamu Cari !*`
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) throw 'Tidak Ditemukan'
let json = await res.json()
let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0]
let author = json.data[0].authors[0].name
let animeingfo = `📚 Title: ${title_japanese}
📑 Chapter: ${chapters}
✉️ Transmisi: ${type}
🗂 Status: ${status}
🗃 Volumes: ${volumes}
🌟 Favorite: ${favorites}
🧮 Score: ${score}
👥 Members: ${members}
⛓️ Url: ${url}
👨‍🔬 Author: ${author}
📝 Background: ${background}
💬 Sinopsis: ${synopsis}
`
conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'anjime.jpg', `*${htki} ANIME INFO ${htka}*\n` + animeingfo, m)
}
handler.help = ['animeinfo <anime>']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i

export default handler