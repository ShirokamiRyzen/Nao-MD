import fs from 'fs'
import os from 'os'
import axios from 'axios'

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL> [resolution]`;

  // Split the text to get the video URL and the optional resolution
  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1];

  m.reply(wait);

  // Fetch video details and download links from the API
  const apiUrl = `https://apis.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(videoUrl)}`;
  let data;
  try {
    const response = await axios.get(apiUrl);
    data = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch video details: ${error.response ? error.response.statusText : error.message}`);
  }

  const { result, videoFormats } = data;
  const { title, thumbnail } = result;

  // Select the video quality based on user input or default to the highest quality
  const videoInfo = resolution
    ? videoFormats.find(v => v.quality === resolution)
    : videoFormats[0];

  if (!videoInfo) throw `Resolution ${resolution} not available for this video.`;

  // Get the download URL
  const downloadUrl = videoInfo.download;

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();
  const filePath = `${tmpDir}/${title}.mp4`;

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(filePath);

  // Download video
  try {
    const videoResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Pipe the response into the writable stream
    videoResponse.data.pipe(writableStream);

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

  } catch (error) {
    console.error(`Failed to download video: ${error.response ? error.response.statusText : error.message}`);
    m.reply('Failed to download video');
  }
}

handler.help = ['ytmp4'].map((v) => v + ' <URL> [resolution]');
handler.tags = ['downloader'];
handler.command = /^(ytmp4)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
