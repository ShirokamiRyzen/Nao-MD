import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text || !text.trim()) throw 'Masukkan username yang valid!'
    let username = text.trim()

    m.reply(wait)

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/stalk/tiktok?username=${username}`)
        const user = data.userInfo

        let caption = `
ID: ${user.id}
Username: ${user.username}
Name: ${user.name}
Bio: ${user.bio}
Verified: ${user.verified ? 'Yes' : 'No'}
Followers: ${user.totalFollowers}
Following: ${user.totalFollowing}
Likes: ${user.totalLikes}
Videos: ${user.totalVideos}
Friends: ${user.totalFriends}
Avatar: ${user.avatar}
        `.trim()

        await conn.sendMessage( m.chat, { image: { url: user.avatar }, caption }, { quoted: m } )
    } catch (err) {
        m.reply('Error: ' + err.message)
    }
}

handler.help = ['ttstalk']
handler.tags = ['stalk']
handler.command = /^(ttstalk|tiktokstalk)$/i

handler.register = true
handler.limit = true

export default handler
