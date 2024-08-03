import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import fetch from 'node-fetch'
import { youtubedl } from '../lib/youtube.js'

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

  let videoUrl = text;

  m.reply(wait);

  // Get video details and download link
  const { result, resultUrl } = await youtubedl(videoUrl);
  const { title, duration, author } = result;
  const audioInfo = resultUrl.audio.find(a => a.quality === '128kbps') || resultUrl.audio[0];  // Select the highest quality available

  // Fetch the download URL
  const downloadUrl = await audioInfo.download();

  // Create writable stream in temporary directory
  let tmpDir = os.tmpdir();
  let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);

  // Download audio
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error(`Failed to download audio: ${response.statusText}`);

  // Start downloading audio
  await streamPipeline(response.body, writableStream);

  let dl_url = `${tmpDir}/${title}.mp3`;
  let info = `Title: ${title}\nLength: ${duration}s\nAuthor: ${author}`;

  await conn.sendMessage(m.chat, {
    document: {
      url: dl_url,
    },
    mimetype: 'audio/mpeg',
    fileName: `${title}.mp3`,
    caption: info,
  }, { quoted: m });

  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
    if (err) {
      console.error(`Failed to delete audio file: ${err}`);
    } else {
      console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
    }
  });
};

handler.help = ['ytmp3'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp3)$/i

handler.limit = 4
handler.register = true
handler.disable = false

export default handler
