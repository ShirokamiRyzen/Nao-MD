let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'reply saluran channel nya lah'
    try {
        let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
        await m.reply(`Name: ${id.newsletterName}\nId: ${id.newsletterJid}`)
    } catch (e) {
        throw 'Harus chat dari channel bang'
    }
}

handler.help = handler.command = ['ci']
handler.tags = ['tools']

handler.register = true

export default handler