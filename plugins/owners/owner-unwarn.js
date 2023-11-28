let handler = async (m, { conn, text }) => {
    if (!text) throw 'Who wants to be unwarn ?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag??'
    let users = global.db.data.users
    users[who].warning = 0
    conn.reply(m.chat, 'Done!', m)
}
handler.help = ['unwarn']
handler.tags = ['owner']
handler.command = /^unwarn(user)?$/i
handler.rowner = true

export default handler
