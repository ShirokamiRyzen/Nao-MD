import yts from 'yt-search'
import fs from 'fs'
import os from 'os'
import axios from 'axios'

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} 7!! Orange`;

  let search = await yts(text);
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  if (!vid) throw 'Video Not Found, Try Another Title';
  let { title, thumbnail, timestamp, views, ago, url } = vid;

  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: 'Please wait...' }, { quoted: m });

  // Fetch video details and download link from the API
  const apiUrl = `https://apis.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(url)}`;
  let data;
  try {
    const response = await axios.get(apiUrl);
    data = response.data;
  } catch (error) {
    throw new Error(`Failed to fetch video details: ${error.response ? error.response.statusText : error.message}`);
  }

  const { result, resultUrl } = data;
  const audioInfo = resultUrl.audio.find(a => a.quality === '128kbps') || resultUrl.audio[0];  // Select the highest quality available

  // Fetch the download URL
  const downloadUrl = audioInfo.download;

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();
  const filePath = `${tmpDir}/${title}.mp3`;

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(filePath);

  // Download audio
  try {
    const response = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'stream'
    });

    // Pipe the response into the writable stream
    response.data.pipe(writableStream);

    writableStream.on('finish', async () => {
      let doc = {
        audio: {
          url: filePath
        },
        mimetype: 'audio/mp4',
        fileName: title,
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

      await conn.sendMessage(m.chat, doc, { quoted: m }).then(() => {
        // Delete the audio file after sending
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete audio file: ${err}`);
          } else {
            console.log(`Deleted audio file: ${filePath}`);
          }
        });
      }).catch((err) => {
        console.error(`Failed to send message: ${err}`);
      });
    });

    writableStream.on('error', (err) => {
      console.error(`Failed to write audio file: ${err}`);
      m.reply('Failed to download audio');
    });

  } catch (error) {
    console.error(`Failed to download audio: ${error.response ? error.response.statusText : error.message}`);
    m.reply('Failed to download audio');
  }
}

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

handler.limit = 8
handler.register = true
handler.disable = false

export default handler
