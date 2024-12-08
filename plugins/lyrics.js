import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh\n*${usedPrefix}${command} Seven oops Orange Romaji*`;

    m.reply(wait)

    try {
        const response = await axios.get(`${APIs.ryzen}/api/search/lyrics?query=${encodeURIComponent(text)}`);
        const result = response.data;

        if (result && result.lyrics) {
            m.reply(`
Title *${result.title}*
Artist *${result.artist}*

${result.lyrics}

Url: ${result.url}
`.trim());
        } else {
            throw new Error('Lirik tidak ditemukan');
        }
    } catch (error) {
        conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error.message}`, m);
    }
}

handler.help = ['lirik'].map(v => v + ' <Apa>');
handler.tags = ['internet'];
handler.command = /^(lirik|lyrics|lyric)$/i;

handler.register = true

export default handler
