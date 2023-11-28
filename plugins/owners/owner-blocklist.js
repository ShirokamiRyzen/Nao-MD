let handler = async (m, { conn, usedPrefix }) => {
	await conn.fetchBlocklist().then(async data => {
		let txt = `*「  Daftar Nomor Yang Diblokir  」*\n\n*Total:* ${data.length}\n\n┌─\n`
		for (let i of data) {
			txt += `├ @${i.split("@")[0]}\n`
		}
		txt += "└────"
		return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
	}).catch(err => {
		console.log(err);
		throw 'tidak ada yang diblokir!'
	})
}
handler.tags = ['info']
handler.help = ['blocklist']
handler.command = /^(blocklist)$/i

export default handler