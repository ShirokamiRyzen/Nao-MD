import ytdl from '@distube/ytdl-core'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const proxyAgent = ytdl.createProxyAgent({ uri: "http://167.71.41.76:8080" });

let streamPipeline = promisify(pipeline);
let handler = async (m, { conn, command, text, usedPrefix }) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: '⏳',
      key: m.key,
    },
  });

  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;
  let videoUrl = text;

  let videoInfo = await ytdl.getInfo(videoUrl);
  //let videoInfo = await ytdl.getInfo(videoUrl, { agent: proxyAgent });

  let { videoDetails } = videoInfo;
  let { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
  let thumbnail = thumbnails[0].url;
  let audioStream = ytdl(videoUrl, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });
  let tmpDir = os.tmpdir();
  let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
  await streamPipeline(audioStream, writableStream);

  let dl_url = `${tmpDir}/${title}.mp3`;
  let info = `Title: ${title}\nLength: ${lengthSeconds}s\nViews: ${viewCount}\nUploaded: ${uploadDate}`;

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

handler.limit = true
handler.register = true
handler.exp = 0

export default handler
