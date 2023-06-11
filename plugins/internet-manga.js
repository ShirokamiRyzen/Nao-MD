// Update By Xnuvers007

import fetch from 'node-fetch'

var handler = async (m, { conn, text }) => {
if (!text) throw `*Masukan Judul Manga Yang Ingin Kamu Cari !*`
conn.reply(m.chat, 'Sedang mencari manga... Silahkan tunggu', m)
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) throw 'Tidak Ditemukan'
let json = await res.json()
let { chapters, url, type, score, scored, scored_by, rank, popularity, members, background, status, volumes, synopsis, favorites } = json.data[0]
let judul = json.data[0].titles.map(jud => `${jud.title} [${jud.type}]`).join('\n');
let xnuvers007 = json.data[0].authors.map(Xnuvers007 => `${Xnuvers007.name} (${Xnuvers007.url})`).join('\n');
let genrenya = json.data[0].genres.map(xnvrs007 => `${xnvrs007.name}`).join('\n');
  
let animeingfo = `📚 Title: ${judul}
📑 Chapter: ${chapters}
✉️ Transmisi: ${type}
🗂 Status: ${status}
😎 Genre: ${genrenya}
🗃 Volumes: ${volumes}
🌟 Favorite: ${favorites}
🧮 Score: ${score}
🧮 Scored: ${scored}
🧮 Scored BY: ${scored_by}
🌟 Rank: ${rank}
🤩 Popularitas: ${popularity}
👥 Members: ${members}
⛓️ Url: ${url}
👨‍🔬 Author: ${xnuvers007}
📝 Background: ${background}
💬 Sinopsis: ${synopsis}
`
conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'manga.jpg', `*MANGA INFO*\n` + animeingfo, m)
}
handler.help = ['mangainfo <manga>']
handler.tags = ['anime']
handler.command = /^(mangainfo)$/i

export default handler