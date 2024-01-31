//Dont delete this credit!!!
//Script by ShirokamiRyzen

import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'Kirim/Reply Gambar dengan caption .anime?';
        
        m.reply(wait);
        
        let media = await q.download();
        let url = await uploadImage(media);
        let hasil = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(url)}`);
        let response = await hasil.json();

        if (response && response.result && response.result.length > 0) {
            let firstResult = response.result[0];
            
            let filename = firstResult.filename;
            let episode = firstResult.episode;
            let similarity = firstResult.similarity;
            let videoURL = firstResult.video;

            let caption = `Name: ${filename}\nEpisode: ${episode}\n\nSimilarity: ${similarity}`;
            
            await conn.sendFile(m.chat, videoURL, filename, caption, m);
        } else {
            m.reply('No result found');
        }
    } catch (error) {
        console.error(error);
        m.reply('Internal server error');
    }
};

handler.help = ['animesearch']
handler.tags = ['anime']
handler.command = /^(animesearch)$/i

handler.register = true
handler.limit = false

export default handler
