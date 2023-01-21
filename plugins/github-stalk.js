import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Username', m)

  await m.reply('Searching...')
    let res = await fetch(`https://api.lolhuman.xyz/api/github/${text}?apikey=${global.lolkey}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.result.avatar)).buffer()
    let hasil = `*── 「 GITHUB STALK 」 ──*

➸ *Name*: ${json.result.name}
➸ *Bio*: ${json.result.bio}
➸ *Company*: ${json.result.company}
➸ *Follower:* ${json.result.followers}
➸ *Following:* ${json.result.following}
➸ *Email:* ${json.result.email}
➸ *Repo:* ${json.result.public_repos}
➸ *Gist:* ${json.result.public_gists}
➸ *Type:* ${json.result.type}
➸ *Location:* ${json.result.location}
➸ *URL*:* ${json.result.url} 
`

    conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m)
}
handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^(githubstalk)$/i

export default handler
