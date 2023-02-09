import axios from 'axios'

export async function before(m) {
	let chat = db.data.chats[m.chat] || {}
	if (!chat.latestNews) chat.latestNews = []
	if (chat && chat.updateAnimeNews) {
		let latest = chat.latestNews
		setInterval(async () => {
			this.logger.info(`Checking anime news for "${m.chat}"`)
			let res = await getNews().catch(console.error)
			let { id, sourceUrl, url, caption } = res
			if (latest.includes(id)) return this.logger.info(`ID ${id} already sent to "${m.chat}"`)
			let length = latest[latest.length - 1]
			latest.push(id)
			if (latest.indexOf(length) !== -1) latest.splice(latest.indexOf(length), 1)
			this.logger.info(`Sending anime news to "${m.chat}"`)
			let templateButtons = [{ urlButton: { displayText: 'Source', url: sourceUrl }}]
			for (let x = 0; x < url.length; x++) {
				let { mime, data } = await this.getFile(url[x]), type = mime.split('/')[0]
				if (x == 0) return this.sendMessage(m.chat, { [type]: data, caption, footer: null, templateButtons })
				await this.sendMessage(m.chat, { [type]: data })
			}
		}, 10*60*1000) // 10 minutes 10*60*1000
	}
}
export const disabled = false

function getNews() {
	return new Promise((resolve, reject) => {
		axios.get('https://expressjs-akkun.up.railway.app/instagram/stalk/v2?user=otaku_anime_indonesia').then((res) => {
			let data = res?.data?.result?.edge_owner_to_timeline_media?.edges[0]?.node 
			let result = {
				type: data?.__typename, id: data?.id, sourceUrl: 'https://instagram.com/p/' + data?.shortcode,
				url: [], caption: data?.edge_media_to_caption?.edges?.[0]?.node?.text, ...data // maybe u need this...
			}
			if (/GraphImage/.test(data?.__typename)) result.url.push(data?.display_url)
			else if (/GraphVideo/.test(data?.__typename)) result.url.push(data?.video_url)
			else {
				data?.edge_sidecar_to_children?.edges.map(({ node }) => {
					if (/GraphImage/.test(node?.__typename)) result.url.push(node?.display_url)
					if (/GraphVideo/.test(node?.__typename)) result.url.push(node?.video_url)
				})
			}
			resolve(result)
		}).catch(reject)
	})
}