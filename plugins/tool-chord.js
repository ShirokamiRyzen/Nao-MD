import axios from 'axios'

function decodeHtml(html) {
    const entities = {
        '&quot;': '"',
        '&apos;': "'",
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&#8211;': '–',
        '&#8212;': '—',
        '&#160;': ' '
    };
    
    return html.replace(/&[a-zA-Z0-9#]+;/g, (match) => entities[match] || match);
}

let handler = async (m, { text }) => {
    if (!text) throw 'Input Query';
    let a = await chord(text);
    m.reply(`*Song :* ${a.title}\n*Chord :*\n\n${a.chord}`);
}

handler.help = ['chord <judul lagu>'];
handler.tags = ['tools'];
handler.command = /^(chord)$/i;

handler.register = true;
handler.limit = true;

export default handler;

export async function chord(query) {
    return new Promise(async (resolve, reject) => {
        const url = `${APIs.ryzumi}/api/search/chord?query=${query}`;
        
        try {
            let { data } = await axios.get(url);
            if (data && data.title && data.chord) {
                resolve({
                    title: decodeHtml(data.title),
                    chord: data.chord
                });
            } else {
                reject('No results found');
            }
        } catch (error) {
            reject('Error fetching data: ' + error.message);
        }
    });
}
