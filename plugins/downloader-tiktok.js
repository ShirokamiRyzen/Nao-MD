import nodeF from 'node-fetch'
let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`
if (!args[0].match(/tiktok/gi)) throw `URL Tidak Ditemukan!`
m.reply('*Please wait..*.')
 let tioxd = await nodeF(`https://api.botcahx.biz.id/api/dowloader/tikok?url=${args[0]}&apikey=Admin`)
if (!tioxd.ok) throw await tioxd.text()
let tiodl = await tioxd.json()
if (!tiodl.status) throw tiodl
let { 
video, 
video2, 
username,
description 
} = tiodl.result
await conn.sendFile(m.chat, video, 'tiovid.mp4', `
*Deskripsi*: ${description}
\n*Username*: ${username}`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})

conn.sendFile(m.chat, video2, 'tok2.mp4', 'hasil 2', m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i

export default handler