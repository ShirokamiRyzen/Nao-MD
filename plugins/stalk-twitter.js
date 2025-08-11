import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Masukkan username yang valid!'
    let username = text.trim()

    m.reply(wait)

    try {
        let { data } = await axios.get(`${APIs.ryzumi}/api/stalk/twitter?username=${username}`)
        if (data.message !== 'OK') throw data.message || 'Terjadi kesalahan saat mengambil data!'

        let user = data.user
        let caption = `
ID: ${user.id}
URL: ${user.url}
Screen Name: ${user.screen_name}
Name: ${user.name}
Location: ${user.location}
Description: ${user.description}
Followers: ${user.followers}
Following: ${user.following}
Likes: ${user.likes}
Banner URL: ${user.banner_url}
Avatar URL: ${user.avatar_url}
Joined At: ${user.joined_at}
Website: ${user.website ? user.website : '-'}
        `.trim()

        await conn.sendMessage( m.chat, { image: { url: user.avatar_url }, caption }, { quoted: m } )
    } catch (err) {
        m.reply('Error:' + err.message)
    }
}

handler.help = ['twitterstalk']
handler.tags = ['stalk']
handler.command = /^(twitterstalk|xstalk)$/i

handler.register = true
handler.limit = true

export default handler
