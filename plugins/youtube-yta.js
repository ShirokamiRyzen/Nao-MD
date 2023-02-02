/*let limit = 80
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let audio, source, res, link, lastError, isLimit
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      audio = link = source = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download audio')
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*${htki} YOUTUBE ${htka}*
*${htjava} Title:* ${title}
*${htjava} Type:* mp3
*${htjava} Filesize:* ${audio.fileSizeH}
*L O A D I N G. . .*
`.trim(), m)
  if (!isLimit) await conn.sendFile(m.chat, source, title + '.mp3', `
*${htki} YOUTUBE ${htka}*
*${htjava} Title:* ${title}
*${htjava} Type:* mp3
*${htjava} Filesize:* ${audio.fileSizeH}
*L O A D I N G. . .*
`.trim(), m, null, {
    asDocument: chat.useDocument, mimetype: 'audio/mp4', ptt: false, contextInfo: {
        externalAdReply: { showAdAttribution: true,
            title: 'Nao-MD', 
            body: 'Now Playing...',
            description: 'Now Playing...',
            mediaType: 2,
          thumbnail: await (await fetch(thumb)).buffer()
        }
     }
  })
}
*/
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import { niceBytes, isUrl, somematch } from '../lib/others.js'

let handler = async (m, { conn, text, args, command }) => {
	if (!text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	command = command.toLowerCase()
	try {
		const { audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
		let audio, source, res, link, lastError, sizeh
		for (let i in _audio) {
			try {
				audio = _audio[i]
				link = await audio.download()
				sizeh = await audio.fileSize
				if (link) res = await fetch(link)
				if (res) source = await res.arrayBuffer()
				if (source instanceof ArrayBuffer) break
			} catch (e) {
				audio = link = source = null
				lastError = e
			}
		}
		if (sizeh > 300000) throw `Filesize: ${audio.fileSizeH}\nTidak dapat mengirim, maksimal file 300 MB`
		if (!link) throw new Error('No URL')
		if (command.includes('mp3')) await conn.sendMessage(m.chat, { document: { url: link }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, { quoted : m })
		else await conn.sendMessage(m.chat, { audio: { url: link }, mimetype: 'audio/mp4' }, { quoted : m })
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${global.lolkey}&url=${text}`)
			let anu = await res.json()
			anu = anu.result
			let vsize = anu.link.size.slice(-2)
			if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.link.size}`)
			if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.link.size}\nTidak dapat mengirim, maksimal file 300 MB`)
			if (!anu.link.link) throw new Error('Error')
			if (command.includes('mp3')) await conn.sendMessage(m.chat, {document: { url: anu.link.link }, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3`}, { quoted : m })
			else await conn.sendMessage(m.chat, { audio: { url: anu.link.link }, mimetype: 'audio/mp4' }, { quoted : m })
		} catch (e) {
			console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${global.lolkey}&url=${text}`)
				let anu = await res.json()
				anu = anu.result
				let vsize = anu.size.slice(-2)
				if (vsize == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${anu.size}`)
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.size.replace(" MB", "")) > 200) return m.reply(`Filesize: ${anu.size}\nTidak dapat mengirim, maksimal file 300 MB`)
				if (!anu.link) throw new Error('Error')
				if (command.includes('mp3')) await conn.sendMessage(m.chat, {document: { url: anu.link }, mimetype: 'audio/mpeg', fileName: `${anu.result.title}.mp3`}, { quoted : m })
				else await conn.sendMessage(m.chat, { audio: { url: anu.link }, mimetype: 'audio/mp4' }, { quoted : m })
			} catch (e) {
				console.log(e)
				throw `Invalid Youtube URL / terjadi kesalahan.`
			}
		}
	}
}

handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url> <without message>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i

handler.register = true
handler.limit = true

export default handler