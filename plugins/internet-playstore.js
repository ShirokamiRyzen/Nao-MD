import hxz from 'hxz-api'
import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, command, text }) => {
try {
if (!text) throw `Ex: ${usedPrefix}${command} BotWa` 
	let ps = await playstore(text)
	if (!ps.length) throw 'Not Found'
	let msg = '\t\t\t\t*• PLAYSTORE •*\n\n'
	for (let x of ps)
	msg += `*Name :* ${x.name}\n*Developer :* ${x.dev}\n*Rate :* ${x.rate}\n*Link :*\n${x.link}\n\n`
	m.reply(msg)
} catch (e) {
    if (!text) throw 'Masukkan Link\n\nContoh: .playstore coc'
  let f = await hxz.playstore(text)
let v = await f.json()
let teks = v.map(v => {
return `
*PLAY STORE*
NAMA: ${v.name}
DEVELOPER: ${v.developer}
LINK: ${v.link}
      `.trim()
  }).filter(v => v).join('\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n')
  //m.reply(teks)
  await conn.sendButton(m.chat, teks, wm, null, [
                ['Search!', `${usedPrefix + command}`]
            ], m)
            }

}
handler.help = ['playstore <apk>']
handler.tags = ['internet']
handler.command = /^playstore$/i

export default handler
async function playstore(query) {
	let html = (await axios.get(`https://play.google.com/store/search?q=${query}&c=apps`)).data
	let $ = cheerio.load(html)
	return $('div.VfPpkd-aGsRMb').get().map(x => {
		return {
			name: $(x).find('span.DdYX5').text(),
			rate: $(x).find('span.w2kbF').text(),
			dev: $(x).find('span.wMUdtb').text(),
			image: $(x).find('.j2FCNc img').attr('src').replace('s64', 's256'),
			link: 'https://play.google.com' + $(x).find('a.Si6A0c').attr('href')
		}
	})
}