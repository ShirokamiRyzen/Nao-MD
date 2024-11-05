import yts from 'yt-search'
import fs from 'fs'
import os from 'os'
import axios from 'axios'

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} <search term>`;

  // Pencarian video berdasarkan query text
  const search = await yts(text);
  const vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  if (!vid) throw 'Video not found, try another title';

  const { title, thumbnail, timestamp, views, ago, url } = vid;

  // Mengirim pesan awal dengan thumbnail
  await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: 'Please wait...' }, { quoted: m });

  try {
    // Mendapatkan URL audio menggunakan API ryzendesu
    const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`);
    const downloadUrl = response.data.url;

    if (!downloadUrl) throw new Error('Audio URL not found');

    // Lokasi file sementara
    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;

    // Mengunduh file audio dan menyimpannya di direktori sementara
    const audioResponse = await axios({
      method: 'get',
      url: downloadUrl,
      responseType: 'stream',
    });

    const writableStream = fs.createWriteStream(filePath);
    audioResponse.data.pipe(writableStream);

    writableStream.on('finish', async () => {
      // Mengirim file audio
      await conn.sendMessage(m.chat, {
        document: {
          url: filePath,
        },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        caption: `Title: ${title}\nLength: ${timestamp}\nViews: ${views}\nUploaded: ${ago}`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title: title,
            body: 'Audio Download',
            sourceUrl: url,
            thumbnail: await (await conn.getFile(thumbnail)).data,
          },
        },
      }, { quoted: m });

      // Menghapus file setelah dikirim
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete audio file: ${err}`);
        } else {
          console.log(`Deleted audio file: ${filePath}`);
        }
      });
    });

    writableStream.on('error', (err) => {
      console.error(`Failed to write audio file: ${err}`);
      m.reply('Failed to download audio');
    });
  } catch (error) {
    console.error('Error:', error.message);
    throw `Error: ${error.message}. Please check the URL and try again.`;
  }
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

handler.limit = 8
handler.register = true
handler.disable = false

export default handler
