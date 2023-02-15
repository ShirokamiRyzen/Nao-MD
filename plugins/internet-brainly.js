import * as baileys from '@adiwajshing/baileys'
import { Brainly } from 'brainly-scraper-v2'
import fetch from 'node-fetch'
let brainly = new Brainly('id')

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input Query'
	let res = await brainly.search(text, 'id').catch(() => null)
	console.log(res)
	if (res) {
		let answer = res.map(({ question, answers }, i) => `
*Pertanyaan*${question.grade ? ` (${question.grade})` : ''}\n${question.content}${answers.map((v, i) => `
*Jawaban Ke ${i + 1}*${v.verification ? ' (Verified)' : ''}${v.isBest ? ' (Best)' : ''}
${v.content}${v.attachments.length > 0 ? `\n*Media Url*: ${v.attachments.join(', ')}` : ''}`).join``}`).join('\n' + '-'.repeat(45))
		m.reply(answer.trim())
	} else {
		let answer = await (await fetch(API('violetics', '/api/media/brainly', { query: text }, 'apikey'))).json()
		answer = answer.result
		if (!answer.length) throw 'Not found'
		for (let x = 0; x < answer.length; x++) {
			await m.reply(`*${answer[x].pertanyaan}*\n_${answer[x].source}_\n${answer[x].jawaban}`)
			await baileys.delay(2000)
		}
	}
}

handler.help = handler.alias = ['brainly']
handler.tags = ['tools']
handler.command = /^(brainly)$/i
handler.limit = true

export default handler

/*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Soekarno adalah`
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/brainly?apikey=${global.lolkey}&query=${encodeURIComponent(text)}`)
		let json = await res.json()
		if (json.status != '200') throw `Informasi tidak tersedia.`
		let get_result = json.result
		let ini_txt = "*Result :*"
		for (var x of get_result) {
			ini_txt += `\n\n*Question :*\n${x.question.content}\n`
			ini_txt += `*Answer :*\n${x.answer[0].content}\n`
			ini_txt += `───────────────────`
		}
		await m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		m.reply(`Informasi tidak tersedia.`)
	}
}
handler.help = handler.alias = ['brainly']
handler.tags = ['tools']
handler.command = /^(brainly)$/i
handler.limit = true
export default handler
*/
