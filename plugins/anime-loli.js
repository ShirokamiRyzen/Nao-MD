import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let res = await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/anime_loli.json')
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await res.json();
  let url = json[Math.floor(Math.random() * json.length)]
  await conn.sendFile(m.chat, url, null, 'Nih Kak', '', m)
}

handler.command = /^(loli)$/i
handler.tags = ['anime']
handler.help = ['loli']

handler.register = true

export default handler