import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Masukkan UID Genshin yang valid!'
    let userId = text.trim()

    m.reply(wait)

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/stalk/genshin?userId=${userId}`)

        if (!data.status || !data.data) throw 'Data tidak ditemukan!'

        let result = data.data

        let caption = `
*====== [Genshin Profile Info] ======*
• Nickname: ${result.nickname}
• Level: ${result.level}
• World Level: ${result.world_level}
• Achievement: ${result.achievement}
• Card ID: ${result.card_id}
• Spiral Abyss: ${result.spiral_abyss}
• UID: ${result.uid}
• Detail: ${result.detail}
        `.trim()

        await conn.sendMessage(m.chat, { image: { url: result.screenshot }, caption }, { quoted: m })
    } catch (err) {
        m.reply('Error: ' + err.message)
    }
}

handler.help = ['gistalk']
handler.tags = ['stalk']
handler.command = /^(genshinstalk|gistalk)$/i

handler.register = true
handler.limit = true

export default handler
