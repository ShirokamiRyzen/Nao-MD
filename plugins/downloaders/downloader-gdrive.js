import fetch from 'node-fetch'
import { sizeFormatter } from 'human-readable'
let handler = async (m, { conn, args }) => {
	if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '[!] Input GoogleDrive URL'
	try {
		let res = await GDriveDl(args[0])
		if (res.fileSize.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${res.fileSize}`)
		if (!someincludes(['kB','KB'], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 500) return m.reply(`Filesize: ${res.fileSize}\nTidak dapat mengirim, maksimal file 500 MB`)
		let txt = `*[ Downloading file ]*\n\n`
		txt += `*Name :* ${res.fileName}\n`
		txt += `*Size :* ${res.fileSize}\n`
		txt += `*Type :* ${res.mimetype}`
		await m.reply(txt)
		if (!res.downloadUrl) throw eror
		await conn.sendFile(m.chat, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m)
	} catch (e) {
		console.log(e)
		throw 'Bot tidak memiliki akses ke GoogleDrive ini'
	}
}

handler.help = ['gdrive'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(gdrive)$/i

handler.limit = true
handler.register = true

export default handler

const someincludes = ( data, id ) => {
	let res = data.find(el => id.includes(el) )
	return res ? true : false;
}
const formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})
async function GDriveDl(url) {
	let id, res = { "error": true }
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true' 
			}
		})
		let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
	} catch (e) {
		console.log(e)
		return res
	}
}