import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Masukkan username yang valid!'
    let username = text.trim()

    m.reply(wait)

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/stalk/youtube?username=${username}`)
        let channel = data.channelMetadata
        let videos = data.videoDataList || []

        let caption = `
Username: ${channel.username}
Channel URL: ${channel.channelUrl}
External ID: ${channel.externalId}
Subscriber Count: ${channel.subscriberCount ?? 'N/A'}
Video Count: ${channel.videoCount ?? 'N/A'}
Description: ${channel.description}
Family Safe: ${channel.isFamilySafe ? 'Yes' : 'No'}
        `.trim()

        if (videos.length > 0) {
            caption += '\n\nVideo Terbaru:'
            videos.slice(0, 2).forEach((video, index) => {
                caption += `\n\nVideo ${index + 1}:\nTitle: ${video.title}\nDuration: ${video.duration}\nLink: https://www.youtube.com${video.navigationUrl}`
            })
        }

        await conn.sendMessage( m.chat, { image: { url: channel.avatarUrl }, caption }, { quoted: m } )
    } catch (err) {
        m.reply('Error: ' + err.message)
    }
}

handler.help = ['ytstalk']
handler.tags = ['stalk']
handler.command = /^(ytstalk|youtubestalk)$/i

handler.register = true
handler.limit = true

export default handler
