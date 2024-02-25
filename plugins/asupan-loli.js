import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let res = await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/asupan_loli.json')
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await res.json();
  let url = json[Math.floor(Math.random() * json.length)]
  await conn.sendFile(m.chat, url, null, 'Nih Kak', '', m)
}

handler.command = /^(asupanloli)$/i
handler.tags = ['internet']
handler.help = ['asupanloli']

handler.register = true
handler.premium = false
handler.limit = true

export default handler