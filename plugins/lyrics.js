import { lirik } from "../lib/scrape.js"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const judul = args.join(' ');
    if (!judul) throw `Gunakan contoh ${usedPrefix}${command} NamaPenyanyi NamaLagu\n*${usedPrefix}${command} one direction story of my life*`;
    try {
        const result = await lirik(judul);

        m.reply(`
Title *${judul}*

${result.lyrics}

Url ${result.link}
    `.trim());

    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error}`, m);
    }
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

handler.register = true

export default handler
