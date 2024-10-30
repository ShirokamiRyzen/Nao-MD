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
  const resolution = args[1] || '480';

  const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&reso=${resolution}`;

  try {
    const response = await axios.get(apiUrl);
    const { url: videoStreamUrl } = response.data;

    if (!videoStreamUrl) throw 'Video URL not found in API response.';

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${new URL(videoUrl).pathname.split('/').pop()}_${resolution}p.mp4`;

    // Mengunduh video dengan pipeline dan menyimpan di buffer sementara
    const videoStream = await axios({
      url: videoStreamUrl,
      method: 'GET',
      responseType: 'stream'
    }).then(res => res.data);

    const writableStream = fs.createWriteStream(filePath);

    // Mulai mengunduh video dengan pipeline langsung ke filePath
    await streamPipeline(videoStream, writableStream);

    // Kirim video langsung dari file hasil unduhan
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

    // Hapus file video setelah dikirim
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

handler.limit = 10;
handler.register = true
handler.disable = false

export default handler
