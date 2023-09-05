let handler = async (m, { conn, text }) => {
    if (!text) throw 'Number?.'
    let who
    if (m.isGroup) {
        if (!m.mentionedJid) throw 'No user mentioned to ban.'
        who = m.mentionedJid[0]
    } else {
        // Check if the input is a valid phone number
        let phoneNumber = text.replace(/[^0-9]/g, '') // Remove non-numeric characters
        who = phoneNumber + '@s.whatsapp.net'
    }
    let users = global.db.data.users
    if (users[who]) {
        users[who].premium = false
        users[who].premiumTime = 0
        conn.reply(m.chat, 'Done!', m)
    } else {
        throw 'User not found.'
    }
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^delprem(user)?$/i
handler.rowner = true

export default handler