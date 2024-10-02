/*
import fs from 'fs'
import os from 'os'
import fetch from 'node-fetch'
import { youtubedl } from '../lib/youtube.js'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

  let videoUrl = text;

  m.reply(wait);

  // Get video details and download link
  const { result, resultUrl } = await youtubedl(videoUrl);
  const { title, duration, author } = result;
  const audioInfo = resultUrl.audio.find(a => a.quality === '128kbps') || resultUrl.audio[0];

  // Fetch the download URL
  const downloadUrl = await audioInfo.download();

  // Create writable stream in temporary directory
  let tmpDir = os.tmpdir();
  let filePath = `${tmpDir}/${title}.mp3`;
  let writableStream = fs.createWriteStream(filePath);

  // Download audio
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error(`Failed to download audio: ${response.statusText}`);

  // Pipe the response into the writable stream
  response.body.pipe(writableStream);

  writableStream.on('finish', async () => {
    let info = `Title: ${title}\nLength: ${duration}s\nAuthor: ${author}`;

    await conn.sendMessage(m.chat, {
      document: {
        url: filePath,
      },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      caption: info,
    }, { quoted: m });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete audio file: ${err}`);
      } else {
        console.log(`Deleted audio file: ${filePath}`);
      }
    });
  });

  writableStream.on('error', (err) => {
    console.error(`Failed to write audio file: ${err}`);
    m.reply('Failed to download audio');
  });
}

handler.help = ['ytmp3'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp3)$/i

handler.limit = 8
handler.register = true
handler.disable = false

export default handler
*/

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
