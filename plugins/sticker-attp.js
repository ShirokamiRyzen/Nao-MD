let handler = async(m, { conn, text, args, usedPrefix, command }) => {
    if (!text) throw `*CONTOH*\n${usedPrefix + command} Nao Tomori`
    let teks = encodeURI(text)
    if (command == 'attp') {
    conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    }
    handler.help = ['attp <teks>']
    handler.tags = ['sticker']
    
    handler.command = /^attp$/i
    
    export default handler