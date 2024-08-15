import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

  const videoUrl = text;
  m.reply('Processing...');

  try {
    // Fetch video data from the API
    const { data } = await axios.get(`https://apis.ryzendesu.vip/api/downloader/ytdl?url=${videoUrl}`);
    
    if (!data || !data.audioFormats || data.audioFormats.length === 0) {
      throw 'No audio formats available for this video.';
    }

    // Select the first audio format (you can modify this to choose different formats)
    const audioFormat = data.audioFormats[0];
    const audioUrl = audioFormat.download;

    // Download the audio file
    const filePath = path.join(__dirname, `${Date.now()}.mp3`);
    const writer = fs.createWriteStream(filePath);

    // Pipe the audio stream to a file
    const response = await axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(writer);

    // Wait for the file to be fully written
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Send the audio file
    await conn.sendMessage(m.chat, {
      document: {
        url: filePath,
      },
      mimetype: 'audio/mpeg',
      fileName: `${data.result.title}.mp3`,
      caption: `Title: ${data.result.title}\nDuration: ${data.result.duration}\nAuthor: ${data.result.author}`,
    }, { quoted: m });

    // Clean up: delete the file after sending
    await unlinkAsync(filePath);

  } catch (error) {
    console.error(`Failed to process video: ${error}`);
    m.reply('Failed to download audio');
  }
}

handler.help = ['ytmp3'].map((v) => v + ' <URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp3)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
