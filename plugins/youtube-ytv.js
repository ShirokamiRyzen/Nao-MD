import axios from 'axios'
import fs from 'fs'
import os from 'os'
import ffmpeg from 'fluent-ffmpeg'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Usage: ${usedPrefix}${command} url reso`;

  m.reply(wait);

  // Parsing URL dan resolusi
  const args = text.split(' ');
  const videoUrl = args[0];
  const resolution = args[1] || '480';

  // URL API untuk mendapatkan link unduhan video
  const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&reso=${resolution}`;

  try {
    // Mendapatkan URL video dari API
    const response = await axios.get(apiUrl);
    const { url: videoStreamUrl } = response.data;

    if (!videoStreamUrl) throw 'Video URL not found in API response.';

    // Tentukan direktori sementara dan nama file
    const tmpDir = os.tmpdir();
    const fileName = `${new URL(videoUrl).pathname.split('/').pop()}_${resolution}p.mp4`;
    const filePath = `${tmpDir}/${fileName}`;

    // Unduh video langsung ke file lokal
    const writer = fs.createWriteStream(filePath);
    const downloadResponse = await axios({
      url: videoStreamUrl,
      method: 'GET',
      responseType: 'stream' // Mengunduh langsung sebagai stream ke file
    });

    // Pipe stream langsung ke file
    downloadResponse.data.pipe(writer);

    // Tunggu sampai unduhan selesai
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Proses video dengan ffmpeg untuk memperbaiki metadata (durasi)
    const outputFilePath = `${tmpDir}/${fileName.replace('.mp4', '_fixed.mp4')}`;

    // Gunakan ffmpeg untuk memproses video tanpa mengubah isi (c copy)
    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .outputOptions('-c copy') // Menghindari re-encoding, hanya memperbaiki metadata
        .output(outputFilePath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Caption pesan
    const caption = `Ini kak videonya @${m.sender.split('@')[0]}`;

    // Kirim video dengan caption langsung dari file yang diunduh dan diproses
    await conn.sendMessage(m.chat, {
      video: { url: outputFilePath },
      mimetype: "video/mp4",
      fileName,
      caption,
      mentions: [m.sender]
    }, { quoted: m });

    // Hapus file setelah dikirim
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete original video file: ${err}`);
      } else {
        console.log(`Deleted original video file: ${filePath}`);
      }
    });

    // Hapus file yang telah diproses
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
