/*import axios from 'axios'
import fetch from 'node-fetch'

const getBuffer = async (url) => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    return buffer;
};

var handler = async (m, { args }) => {
    if (!args[0]) {
        throw 'Input URL\nEx: .fb https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz';
    }
    
    try {
        const response = await axios.get(`https://tr.deployers.repl.co/fb?u=${url}`);
        
        // Check if the response data is an array with at least one URL
        if (Array.isArray(response.data) && response.data.length > 0) {
            const videoUrl = response.data[0];
            
            // Fetch and send the video
            const videoBuffer = await getBuffer(videoUrl);
            conn.sendFile(m.chat, videoBuffer, 'video.mp4', 'Video Kualitas HD', m);
        } else {
            // Handle the case where the response data structure is different
            throw 'Invalid response format from the server';
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Invalid response format from the server', m)
      }
}*/

import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const linknya = args[0];

    if (!args[0]) throw `Input *URL*\n\n*Dont use m.facebook link!!!!!*`;

    try {
        let response = await fetch(`https://api.ryzendesu.com/api/dowloader/fbdown?url=${linknya}&apikey=${global.ryzen}`);
        let data = await response.json();

        // Check if the status is true before proceeding
        if (data.status) {
            let videoUrl = data.result.HD || data.result.Normal_video;

            if (videoUrl) {
                await m.reply(wait);
                await conn.sendFile(m.chat, videoUrl, '', global.wm, m);
            } else {
                throw 'HD and Normal video links not found in the API response.';
            }
        } else {
            throw 'API returned false status';
        }
    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e}`);
    }
}

handler.help = ['fb <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|fb(dl)?)$/i
handler.limit = true
handler.register = true

export default handler
