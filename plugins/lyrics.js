import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh\n*${usedPrefix}${command} Seven oops - Orange*`;

    m.reply(wait);

    try {
        const response = await axios.get(`${APIs.ryzen}/api/search/lyrics?query=${encodeURIComponent(text)}`);
        const results = response.data;

        if (results && results.length > 0) {
            const firstResult = results[0];

            m.reply(`
*Title:* ${firstResult.name}
*Artist:* ${firstResult.artistName}
*Album:* ${firstResult.albumName}
*Duration:* ${Math.floor(firstResult.duration / 60)}:${(firstResult.duration % 60).toString().padStart(2, '0')}

*Lyrics:*
${firstResult.plainLyrics}

*Url:* ${APIs.ryzen}/api/search/lyrics?query=${encodeURIComponent(text)}
`.trim());
        } else {
            throw new Error('Lirik tidak ditemukan');
        }
    } catch (error) {
        conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error.message}`, m);
    }
};

handler.help = ['lirik'].map(v => v + ' <Apa>');
handler.tags = ['internet'];
handler.command = /^(lirik|lyrics|lyric)$/i;

handler.register = true

export default handler
