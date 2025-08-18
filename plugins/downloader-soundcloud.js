import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Usage: ${usedPrefix + command} <url>`

	const url = args[0]

	m.reply(wait)

	try {
		// Get metadata and download URL from Ryzumi API
		const { data } = await axios.get(`${APIs.ryzumi}/api/downloader/soundcloud?url=${encodeURIComponent(url)}`)

		const { title, thumbnail, filesize, download_url } = data || {}

		if (!download_url || !title) throw 'Failed to fetch SoundCloud data. Please verify the URL.'

		// Download audio as buffer
		const audioRes = await axios.get(download_url, { responseType: 'arraybuffer' })
		const audioBuffer = audioRes.data

		// Send as document to preserve filename and avoid transcoding
		await conn.sendMessage(m.chat, {
			document: audioBuffer,
			mimetype: 'audio/mpeg',
			fileName: `${title}.mp3`,
			caption: `
*Title:* ${title}
*Filesize:* ${filesize || '-'} bytes
*Thumbnail:* ${thumbnail || '-'}
*Source:* ${url}
			`.trim(),
		}, { quoted: m })
	} catch (err) {
		console.error(err)
		throw `Error: ${err?.message || err}`
	}
}

handler.help = ['soundcloud <url>']
handler.tags = ['downloader']
handler.command = /^(soundcloud(dl)?|sc(dl)?)$/i

handler.limit = 2
handler.register = true

export default handler
