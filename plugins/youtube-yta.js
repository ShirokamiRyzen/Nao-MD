import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import yts from 'yt-search'

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;
  const videoUrl = text;

  m.reply(wait)

  try {
    // Mengambil informasi video menggunakan yt-search
    const videoInfo = await yts(videoUrl);
    if (!videoInfo || !videoInfo.videos.length) throw new Error('Video tidak ditemukan.');
    
    const video = videoInfo.videos[0];
    const { title, timestamp: lengthSeconds, views, ago: uploadDate, thumbnail } = video;

    // Fetch audio URL dari ryzendesu API
    const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`);
    const { url } = response.data;

    if (!url) throw new Error('Gagal mengambil URL audio dari API.');

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;

    // Mengunduh file audio menggunakan url
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
    console.error('Error fetching audio URL:', error.message);
    throw `Error: Tidak dapat mengunduh audio. Silakan coba lagi nanti.`;
  }
};

handler.help = ['ytmp3'].map((v) => v + ' <URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp3)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler