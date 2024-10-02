/*
import fs from 'fs'
import os from 'os'
import fetch from 'node-fetch'
import { youtubedl } from '../lib/youtube.js'

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL> [resolution]`;

  // Split the text to get the video URL and the optional resolution
  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1];

  m.reply(wait);

  // Get video details and download link
  const { result, resultUrl } = await youtubedl(videoUrl);
  const { title, duration, author, thumbnail } = result;

  // Select the video quality based on user input or default to the highest quality
  const videoInfo = resolution
    ? resultUrl.video.find(v => v.quality === resolution)
    : resultUrl.video[0];

  if (!videoInfo) throw `Resolution ${resolution} not available for this video.`;

  // Fetch the download URL
  const downloadUrl = await videoInfo.download();

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();
  const filePath = `${tmpDir}/${title}.mp4`;

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(filePath);

  // Download video
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error(`Failed to download video: ${response.statusText}`);

  // Pipe the response into the writable stream
  response.body.pipe(writableStream);

  writableStream.on('finish', async () => {
    let doc = {
      video: {
        url: filePath
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
          thumbnail: await (await conn.getFile(thumbnail)).data
        }
      }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });

    // Delete the video file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete video file: ${err}`);
      } else {
        console.log(`Deleted video file: ${filePath}`);
      }
    });
  });

  writableStream.on('error', (err) => {
    console.error(`Failed to write video file: ${err}`);
    m.reply('Failed to download video');
  });
}

handler.help = ['ytmp4'].map((v) => v + ' <URL> [resolution]')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
*/

import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Usage: ${usedPrefix}${command} url reso`;

    m.reply(wait);

    const args = text.split(' ');
    const videoUrl = args[0];
    let resolution = '720';

    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await axios.get(apiUrl);
        const { url: videoStreamUrl } = response.data;

        if (!videoStreamUrl) throw 'Video URL not found in API response.';

        const videoStream = await axios({
            url: videoStreamUrl,
            method: 'GET',
            responseType: 'stream'
        }).then(res => res.data);

        const tmpDir = os.tmpdir();
        const filePath = `${tmpDir}/${new URL(videoUrl).pathname.split('/').pop()}_${resolution}.mp4`;
        const writableStream = fs.createWriteStream(filePath);

        // Mulai mengunduh video
        await streamPipeline(videoStream, writableStream);

        let doc = {
            video: {
                url: filePath
            },
            mimetype: 'video/mp4',
            fileName: filePath.split('/').pop(),
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: videoUrl,
                    title: filePath.split('/').pop(),
                    sourceUrl: videoUrl
                }
            }
        };

        await conn.sendMessage(m.chat, doc, { quoted: m });

        // Hapus file video
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete video file: ${err}`);
            } else {
                console.log(`Deleted video file: ${filePath}`);
            }
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw `Failed to process request: ${error.message || error}`;
    }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
