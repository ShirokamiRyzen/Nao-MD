import yts from 'yt-search'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'
import fetch from 'node-fetch'
import { youtubedl } from '../lib/youtube.js'

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} 7!! Orange`;

  let search = await yts(text);
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  if (!vid) throw 'Video Not Found, Try Another Title';
  let { title, thumbnail, timestamp, views, ago, url } = vid;

  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: wait }, { quoted: m });

  // Get video details and download link
  const { result, resultUrl } = await youtubedl(url);
  const audioInfo = resultUrl.audio.find(a => a.quality === '128kbps') || resultUrl.audio[0];  // Select the highest quality available

  // Fetch the download URL
  const downloadUrl = await audioInfo.download();

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);

  // Download audio
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error(`Failed to download audio: ${response.statusText}`);

  // Start downloading audio
  await streamPipeline(response.body, writableStream);

  let doc = {
    audio: {
      url: `${tmpDir}/${title}.mp3`
    },
    mimetype: 'audio/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: 'Audio Download',
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });

  // Delete the audio file
  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
    if (err) {
      console.error(`Failed to delete audio file: ${err}`);
    } else {
      console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
    }
  });
};

handler.help = ['play'].map((v) => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i

handler.limit = 2
handler.register = true
handler.disable = false

export default handler
