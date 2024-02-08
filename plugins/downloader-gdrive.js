import { GDriveDl } from '../lib/scrape.js'

let handler = async (m, { conn, args }) => {
	if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '[!] Input GoogleDrive URL'

	const someincludes = ( data, id ) => {
        let res = data.find(el => id.includes(el) )
        return res ? true : false;
    }
	
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
