import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
	conn,
	args,
	usedPrefix,
	text,
	command
}) => {

	let lister = [
		"search",
		"app"
	]

	let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
	if (!lister.includes(feature)) return m.reply("*Example:*\n.apkpure search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

	if (lister.includes(feature)) {

		if (feature == "search") {
			if (!inputs) return m.reply("Input query link\nExample: .apkpure search|vpn")
			await m.reply(wait)
			try {
				let res = await searchapkpures(inputs)
				let teks = res.map((item, index) => {
					return `🔍 *[ RESULT ${index + 1} ]*

🔗 *link:* ${item.link}
🔗 *linkdl:* https://d.apkpure.com/b/APK/${item.link.split("/")[5]}?version=latest
🖼️ *image:* ${item.image}
📰 *name:* ${item.name}
👩‍💻 *developer:* ${item.developer}
🏷️ *tags:* ${item.tags}
⬇️ *downloadLink:* ${item.downloadLink}
📦 *fileSize:* ${item.fileSize}
🔢 *version:* ${item.version}
🔢 *versionCode:* ${item.versionCode}`

				}).filter(v => v).join("\n\n________________________\n\n")
				await m.reply(teks)
			} catch (e) {
				await m.reply(eror)
			}
		}

		if (feature == "app") {
			if (!inputs.startsWith('https://m.apkpure.com')) return m.reply("Input query link\nExample: .apkpure app|link")
			try {
				let resl = await getApkpure(inputs)
				let cap = "*Name:* " + resl.title + "\n" + "*Link:* " + resl.link + "\n\n" + wait
				await conn.sendFile(m.chat, logo, "", cap, m)
				await conn.sendFile(m.chat, resl.link, resl.title, null, m, true, {
					quoted: m,
					mimetype: "application/vnd.android.package-archive"
				})
			} catch (e) {
				await m.reply(eror)
			}
		}
	}
}

handler.help = handler.alias = ['apkpure']
handler.tags = ['downloader', 'limitmenu']
handler.command = /^(apkpure)$/i
handler.limit = true
handler.register = true

export default handler

async function searchapkpures(q) {
	const end = 'https://m.apkpure.com'
	  const url = end + '/cn/search?q=' +q+ '&t=app'; // Ganti dengan URL sumber data Anda
	  const response = await fetch(url);
	  const html = await response.text();
	  const $ = cheerio.load(html);
	
	  const searchData = [];
	  $('ul.search-res li').each((index, element) => {
		const $element = $(element);
		
		const obj = {
		  link: end + $element.find('a.dd').attr('href'),
		  image: $element.find('img').attr('src'),
		  name: $element.find('.p1').text().trim(),
		  developer: $element.find('.p2').text().trim(),
		  tags: $element.find('.tags .tag').map((i, el) => $(el).text().trim()).get(),
		  downloadLink: end + $element.find('.right_button a.is-download').attr('href'),
		  fileSize: $element.find('.right_button a.is-download').data('dt-filesize'),
		  version: $element.find('.right_button a.is-download').data('dt-version'),
		  versionCode: $element.find('.right_button a.is-download').data('dt-versioncode'),
		};
		searchData.push(obj);
	  });
	
	  return searchData;
	}
	
	async function getApkpure(url) {
	  try {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);
	
		const linkTag = $('link[rel="canonical"]').attr('href');
		const titleTag = $('meta[property="og:title"]').attr('content');
		const downloadURL = `https://d.apkpure.com/b/APK/${linkTag.split("/")[5]}?version=latest`;
		const data = {
		  link: downloadURL,
		  title: titleTag
		};
	
		return data;
	  } catch (error) {
		console.log('Error:', error);
	  }
	}