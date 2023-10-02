import axios from 'axios'
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
        const response = await axios.get(`https://backend.shirokamiryzen.repl.co/fb?u=${args[0]}`);
        
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
    } catch (error) {
        console.error(error);
        const cap = 'Gagal mengunduh video FB';
        conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
    }
}

handler.help = ['fb <url>']
handler.tags = ['downloader']
handler.command = /^(fbdownload|fb(dl)?)$/i
handler.limit = true
handler.register = true

export default handler
