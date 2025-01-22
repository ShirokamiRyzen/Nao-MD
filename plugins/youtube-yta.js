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
    // Mengambil data dari API ryzendesu
    const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`);
    const data = response.data;

    if (!data.url) throw new Error('Audio URL not found or unavailable.');

    const { title, lengthSeconds, views, uploadDate, url, author, thumbnail, filename } = data;

    // Lokasi file sementara
    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${filename}`;

    // Mengunduh file audio
    const audioResponse = await axios({
      method: 'get',
      url: data.url,
      responseType: 'stream'
    });

    // Menyimpan file audio ke direktori sementara
    const writableStream = fs.createWriteStream(filePath);
    await streamPipeline(audioResponse.data, writableStream);

    // Informasi yang akan dikirim sebagai caption
    const info = `Title: ${title}\n*Author*: ${author}\nLength: ${lengthSeconds}\nViews: ${views}\nUploaded: ${uploadDate}`;

    // Mengirim file audio sebagai dokumen
    await conn.sendMessage(m.chat, {
      document: {
        url: filePath,
      },
      mimetype: 'audio/mpeg',
      fileName: filename,
      caption: info,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: data.videoUrl,
          title: title,
          body: 'Audio Download',
          sourceUrl: data.videoUrl,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    }, { quoted: m });

    // Menghapus file setelah dikirim
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