import axios from 'axios'
import fs from 'fs'
import os from 'os'
import { exec } from 'child_process'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} url reso`;

  m.reply(wait);

  // Parse URL and resolution from the input text
  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1] || '480';

  // API URL to fetch the video download link
  const apiUrl = `${APIs.ryzen}/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&reso=${resolution}`;

  try {
    // Fetch video URL from the API
    const response = await axios.get(apiUrl);
    const { url: videoStreamUrl, filename } = response.data;

    if (!videoStreamUrl) throw 'Video URL not found in API response.';

    // Define the temporary directory and file name
    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${filename}`;

    // Download video directly to a local file
    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      url: videoStreamUrl,
      method: 'GET',
      responseType: 'stream',
    });

    // Pipe the stream directly to the file
    downloadResponse.data.pipe(writer);

    // Wait until the download is complete
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Process the video with ffmpeg to fix metadata (duration)
    const outputFilePath = `${tmpDir}/${filename.replace('.mp4', '_fixed.mp4')}`;
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i "${filePath}" -c copy "${outputFilePath}"`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    // Message caption with the filename from the API
    const caption = `Here's the video for you @${m.sender.split('@')[0]}\n\nFilename: ${filename}`;

    // Send the video with the caption directly from the processed file
    await conn.sendMessage(m.chat, {
      video: { url: outputFilePath },
      mimetype: 'video/mp4',
      fileName: filename,
      caption,
      mentions: [m.sender],
    }, { quoted: m });

    // Delete the original downloaded file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete original video file: ${err}`);
      } else {
        console.log(`Deleted original video file: ${filePath}`);
      }
    });

    // Delete the processed file
    fs.unlink(outputFilePath, (err) => {
      if (err) {
        console.error(`Failed to delete processed video file: ${err}`);
      } else {
        console.log(`Deleted processed video file: ${outputFilePath}`);
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
