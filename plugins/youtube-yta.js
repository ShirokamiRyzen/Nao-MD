/*
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
*/

import { 
    youtubedl,
    youtubedlv2 
} from '@bochilteam/scraper'

var handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Urlnya Mana Banh? >:('
  let q = '128kbps'
  let v = args[0]

  // Ambil info dari video
  const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
  const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
  const size = await yt.audio[q].fileSizeH

  await m.reply('Permintaan download audio/mp3 youtube sedang diproses, mohon bersabar...')

  // Tampilkan informasi file beserta thumbnail
  const info = `
● Judul: ${ttl}
● Ukuran: ${size}
● Link YouTube: ${v}
● Credits by Xnuvers007, https://github.com/Xnuvers007`

  // Kirim pesan dan file audio ke user
  await conn.sendMessage(m.chat, { 
    document: { url: dl_url }, 
    mimetype: 'audio/mpeg', 
    fileName: `${ttl}.mp3`,
    caption: info
  }, {quoted: m})
}

// Jika ingin menambahkan tag, ubah code berikut:
handler.tags = ['downloader']
handler.help = ['ytmp3 <link>']
handler.command = /^yta|ytmp3|youtubemp3$/i
export default handler