import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
    try {
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
        else who = m.quoted.sender ? m.quoted.sender : m.sender
        let pp = await conn.profilePictureUrl(who, 'image').catch(e => './src/avatar_contact.png')
        conn.sendFile(m.chat, pp, "nih bang.png", 'Selesai....', m, { jpegThumbnail: await (await fetch(pp)).buffer() })
    } catch {
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(e => './src/avatar_contact.png')
        conn.sendFile(m.chat, pp, 'ppsad.png', "Selesai....", m, { jpegThumbnail: await (await fetch(pp)).buffer() })
    }
}
handler.help = ['getpp <@tag/reply>']
handler.tags = ['group']
handler.command = /^(getpp)$/i

export default handler