/*
import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const linknya = args[0]

  if (!args[0]) throw `Input *URL*`
  m.reply(wait)
  try {
    let res = await fetch(`https://api.ryzendesu.com/api/dowloader/fbdown?url=${encodeURIComponent(linknya)}&apikey=${global.ryzen}`)
    let result = await res.json()
    let video = result.result.HD
    //let audio = result.data.audio
    let cap = global.wm
    conn.sendMessage(m.chat, { video: { url: video }, caption: cap }, m)
    //conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, { quoted : m })
  } catch (e) {
    console.log(e)
    m.reply(`Fitur error atau Otak pengguna error`)
  }
}
*/

import axios from 'axios'
import fetch from 'node-fetch'

var handler = async (m, { args }) => {
    if (!args[0]) {
        throw 'Input *URL*';
    }
    
    try {
        const url = args[0];
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const reqOptions = {
            url: `https://backend.ryzendesu.com/fb?u=${url}`,
            method: "GET",
            headers: headersList,
        };

        const response = await axios.request(reqOptions);
        const firstUrls = response.data.map(item => item.split(','));

        const hdMedia = firstUrls[0][0];
        const sdMedia = firstUrls[1][0];

        m.reply(`api.ryzendesu.com`);
        
        const hdCaption = `Video Kualitas HD\nLink HD: ${hdMedia}`;
        const sdCaption = `Video Kualitas SD\nLink SD: ${sdMedia}`;
        
        m.reply(wait);

        try {
            // Send HD video
            const hdFile = await fetch(hdMedia);
            conn.sendFile(m.chat, await hdFile.buffer(), 'video_hd.mp4', hdCaption, m);

            try {
                // Send SD video
                const sdFile = await fetch(sdMedia);
                conn.sendFile(m.chat, await sdFile.buffer(), 'video_sd.mp4', sdCaption, m);
            } catch {
                // If SD video sending fails, no further action needed
            }
        } catch {
            try {
                // Send SD video
                const sdFile = await fetch(sdMedia);
                conn.sendFile(m.chat, await sdFile.buffer(), 'video_sd.mp4', sdCaption, m);
            } catch {
                // If both HD and SD videos don't exist, send an error message
                const cap = 'Gagal mengunduh video FB';
                conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
            }
        }
    } catch {
        // Jika terjadi kesalahan pada tahap lainnya, kirim pesan kesalahan
        const cap = 'Gagal mengunduh video FB';
        conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
    }
}

handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.register = true

handler.command = /^(fb(dl)?)$/i

export default handler