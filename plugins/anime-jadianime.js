import uploadImage from '../lib/uploadImage.js'
import { JadiAnime } from 'jadianime-ts'
import fs from 'fs'
import crypto from 'crypto'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	let anu, buffer, c = `*Jadi Anime*`
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let img = await q.download?.()
			let id = 'jDa' + crypto.randomBytes(15).toString('hex')
			let path = `./tmp/${id}.jpg`
			buffer = Buffer.from(img)
			await fs.writeFile(path, buffer, (err) => { if (err) throw err })
			let image = await JdiAnime(path)
			await conn.sendMessage(m.chat, { image: { url: image.img }, caption: c }, { quoted: m })
		} catch (e) {
			console.log(e)
			let img = await q.download?.()
			let out = await uploadImage(img)
			try {
				anu = await fetch(`https://api.ibeng.tech/api/maker/anime?url=${out}&apikey=ibeng`)
				buffer = Buffer.from(await anu.arrayBuffer())
				if (Buffer.byteLength(buffer) < 100) throw Error('error, no buffer')
				await conn.sendMessage(m.chat, { image: buffer, caption: c }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					anu = await fetch(`https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.api}&img=${out}`)
					buffer = Buffer.from(await anu.arrayBuffer())
					if (Buffer.byteLength(buffer) < 100) throw Error('error, no buffer')
					await conn.sendMessage(m.chat, { image: buffer, caption: c }, { quoted: m })
				} catch (e) {
					console.log(e)
					m.reply(`[ ! ] Gagal, gunakan foto lainnya.`)
				}
			}
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['jadianime']
handler.tags = ['anime', 'ai']
handler.command = /^(jadianime)$/i

handler.limit = true

export default handler