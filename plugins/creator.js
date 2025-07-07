let handler = async (m) => {
    const sentMsg = await conn.sendContactArray(m.chat, [
        [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `💌 Developer Bot `, `Not Famous`, `ryzendesu.vip@gmail.com`, `🇮🇩 Indonesia`, `📍 https://www.ryzumi.vip`, `👤 Owner Nao Bot`],
        [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 Whatsapp Bot`, `📵 Dont Spam`, `ryzumistarlette@gmail.com`, `🇮🇩 Indonesia`, `📍 https://github.com/ShirokamiRyzen/Nao-MD`, `Hanya bot biasa yang kadang error ☺`]
    ], fkontak)
    await m.reply(`Hello @${m.sender.split(`@`)[0]} Thats my owner, dont spam or i will block u`)
}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i
export default handler