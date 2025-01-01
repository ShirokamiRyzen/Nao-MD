import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;
  const videoUrl = text;

  m.reply(wait);

  try {
    const response = await axios.get(`${APIs.ryzen}/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`);

    if (!response.data) throw new Error('Audio not found or unavailable.');

    const { title, lengthSeconds, views, uploadDate, downloadUrl, author } = response.data;

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}`;

    const audioResponse = await axios({
      method: 'get',
      url: downloadUrl,
      responseType: 'stream'
    });

    const writableStream = fs.createWriteStream(filePath);
    await streamPipeline(audioResponse.data, writableStream);

    const info = `Title: ${title}\n*Author*: ${author}\nLength: ${lengthSeconds}\nViews: ${views}\nUploaded: ${uploadDate}`;

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
        console.log(`Successfully deleted audio file: ${filePath}`);
      }
    });

  } catch (error) {
    console.error('Error:', error.message);
    throw `Error: ${error.message}. Please check the URL and try again.`;
  }
};

handler.help = ['ytmp3'].map((v) => v + ' <URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp3)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
