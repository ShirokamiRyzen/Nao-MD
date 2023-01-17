import fetch from 'node-fetch'

const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
		let res = await fetch(link+'autogempa.json')
		let anu = await res.json()
		anu = anu.Infogempa.gempa
		let txt = `*${anu.Wilayah}*\n\n`
		txt += `Tanggal : ${anu.Tanggal}\n`
		txt += `Waktu : ${anu.Jam}\n`
		txt += `Potensi : *${anu.Potensi}*\n\n`
		txt += `Magnitude : ${anu.Magnitude}\n`
		txt += `Kedalaman : ${anu.Kedalaman}\n`
		txt += `Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`
		await conn.sendMessage(m.chat, { image: { url: link+anu.Shakemap }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/infogempa?apikey=${global.api}`)
			let anu = await res.json()
			anu = anu.result
			let txt = `*${anu.lokasi}*\n\n`
			txt += `Waktu : ${anu.waktu}\n`
			txt += `Potensi : *${anu.potensi}*\n\n`
			txt += `Magnitude : ${anu.magnitude}\n`
			txt += `Kedalaman : ${anu.kedalaman}\n`
			txt += `Koordinat : ${anu.koordinat}`
			await conn.sendMessage(m.chat, { image: { url: anu.map }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`[!] Fitur Error.`)
		}
	}
}

handler.help = ['gempa']
handler.tags = ['internet']
handler.command = /^(gempa)$/i

handler.premium = true
handler.limit = true

export default handler