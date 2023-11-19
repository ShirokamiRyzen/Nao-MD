import ytdl from 'ytdl-core'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: '⏳',
      key: m.key,
    },
  });

  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

  const videoUrl = text;

  const videoInfo = await ytdl.getInfo(videoUrl);

  const { videoDetails } = videoInfo;
  const { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
  const thumbnail = thumbnails[0].url;

  const videoStream = ytdl(videoUrl, {
    filter: 'audioandvideo', // Change here to filter audio and video
    quality: 'highest', // You may want to adjust this based on the available qualities
  });

  const writableStream = fs.createWriteStream(`tmp/${title}.mp4`);

  await streamPipeline(videoStream, writableStream);

  let doc = {
    video: {
      url: `tmp/${title}.mp4`,
    },
    mimetype: 'video/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: videoUrl,
        title: title,
        sourceUrl: videoUrl,
        thumbnail: await (await conn.getFile(thumbnail)).data,
      },
    },
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });

  fs.unlink(`tmp/${title}.mp4`, (err) => {
    if (err) {
      console.error(`Failed to delete video file: ${err}`);
    } else {
      console.log(`Deleted video file: tmp/${title}.mp4`);
    }
  });
}

handler.help = ['ytmp4'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = true
handler.register = true

export default handler
