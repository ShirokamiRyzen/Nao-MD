import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import yts from 'yt-search'

const streamPipeline = promisify(pipeline);

// Fungsi untuk mengekstrak ID video dari URL
const extractVideoID = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;
  const videoUrl = text;

  // Ekstrak ID video dari URL
  const videoID = extractVideoID(videoUrl);
  if (!videoID) throw new Error('Format URL tidak valid.');

  m.reply(wait)

  try {
    // Mengambil informasi video menggunakan yt-search dengan ID video
    const videoInfo = await yts(videoID);
    if (!videoInfo || !videoInfo.videos.length) throw new Error('Video tidak ditemukan.');
    
    const video = videoInfo.videos[0];
    const { title, timestamp: lengthSeconds, views, ago: uploadDate, thumbnail } = video;

    // Fetch audio URL dari ryzendesu API
    const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`);

    if (!response.data.url) throw new Error('URL audio tidak tersedia.');
    const { url } = response.data;
    
    if (!url) throw new Error('URL audio tidak tersedia.');

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;

    // Mengunduh file audio menggunakan URL
    const audioResponse = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });

    // Menulis stream ke file
    const writableStream = fs.createWriteStream(filePath);
    await streamPipeline(audioResponse.data, writableStream);

    const info = `Title: ${title}\nLength: ${lengthSeconds}\nViews: ${views}\nUploaded: ${uploadDate}`;

    // Mengirim file audio
    await conn.sendMessage(m.chat, {
      document: {
        url: filePath,
      },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      caption: info,
    }, { quoted: m });

    // Membersihkan: hapus file audio
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Gagal menghapus file audio: ${err}`);
      } else {
        console.log(`Berhasil menghapus file audio: ${filePath}`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    throw `Error: ${error.message}. Silakan periksa format URL dan coba lagi.`;
  }
};

handler.help = ['ytmp3'].map((v) => v + ' <URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp3)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
