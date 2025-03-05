import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Input Youtube URL!'
    let youtubeUrl = text.trim()

    m.reply(wait)

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/tool/yt-transcript?url=${encodeURIComponent(youtubeUrl)}`)
        if (data.status) {
            let transcript = data.transcript
            let caption = `Transcript:\n\n${transcript}`
            await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
        } else {
            m.reply('Transcript tidak tersedia!')
        }
    } catch (err) {
        m.reply('Error: ' + err.message)
    }
}

handler.help = ['transcript']
handler.tags = ['tools']
handler.command = /^(transcript)$/i

handler.register = true
handler.limit = true

export default handler
