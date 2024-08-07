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
  const audioInfo = resultUrl.audio.find(a => a.quality === '128kbps') || resultUrl.audio[0];  // Select the highest quality available

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

handler.limit = 4
handler.register = true
handler.disable = false

export default handler
