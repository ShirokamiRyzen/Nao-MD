import { googleImage } from '@bochilteam/scraper'

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    
    if (/(hentai|lewd|nude|bokep|porn|sex|furry|bugil|pussy|telanjang|pusy|memek|mmk)/i.test(text) && global.db.data.users[m.sender].role === 'Free user') {
        return conn.reply(m.chat, 'Hayoo mau ngapain lu?\n\nPesan ini otomatis diteruskan ke owner', m)
    }
    
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `*${htki} Google Image ${htka}*
🔎 *Result:* ${text}
🌎 *Source:* Google
`, m)
}

handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

handler.register = true

export default handler
