import { googleIt } from '@bochilteam/scraper'
let handler = async (m, { conn, command, args }) => {
    const fetch = (await import('node-fetch')).default
    let full = /f$/i.test(command)
    let text = args.join` `
    if (!text) return conn.reply(m.chat, 'Tidak ada teks untuk di cari', m)
    let url = 'https://google.com/search?q=' + encodeURIComponent(text)
    let search = await googleIt(text)
    let msg = search.articles.map(({
        // header,
        title,
        url,
        description
    }) => {
        return `*${title}*\n_${url}_\n_${description}_`
    }).join('\n\n')
    m.reply(msg)
}

handler.help = ['google'].map(v => v + ' <search>')
handler.tags = ['internet']
handler.command = /^google?$/i


export default handler