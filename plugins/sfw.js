import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `select tag:
awoo
bite
blush
bonk
bully
cringe
cry
cuddle
dance
glomp
handhold
happy
highfive
hug
kick
kill
kiss
lick
megumin
neko
nom
pat
poke
shinobu
slap
smile
smug
wave
wink
yeet
waifu`
  let res = await fetch(`https://api.waifu.pics/sfw/${text}`)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.url) throw 'Error!'
  conn.sendFile(m.chat, json.url, '', global.wm, m)
}

handler.tags = ['anime']
handler.help = ['sfw']
handler.command = /^(sfw)$/i
handler.premium = false
handler.limit = false

export default handler