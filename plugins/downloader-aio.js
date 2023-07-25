import axios from 'axios'
import fs from 'fs'

const handler = async (m, { conn, args, command }) => {
  if (!args[0]) throw 'Where\'s the URL?';
  const userUrl = args[0];

  const apiUrl = `https://xzn.wtf/api/download?url=${encodeURIComponent(userUrl)}&apikey=${global.xzn}`;

  try {
    const response = await axios.get(apiUrl);
    const videoUrl = response.data.url[0].url;

    await m.reply(`Downloading video from ${videoUrl}`);

    const videoResponse = await axios({
      method: 'GET',
      url: videoUrl,
      responseType: 'stream',
    });

    const videoName = `video-${Date.now()}.mp4`;
    const videoPath = `./${videoName}`;

    const writer = fs.createWriteStream(videoPath);
    videoResponse.data.pipe(writer);

    writer.on('finish', async () => {
      await conn.sendFile(m.chat, fs.readFileSync(videoPath), videoName, '', m);

      fs.unlinkSync(videoPath);

      m.reply('Video successfully downloaded and sent!');
    });

    writer.on('error', (err) => {
      m.reply(`Error occurred while downloading the video: ${err.message}`);
    });
  } catch (error) {
    m.reply(`Error occurred: ${error.message}`);
  }
};

handler.help = ['aiodl'].map((v) => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(aio|aiodl)$/i

handler.register = true
handler.limit = true

export default handler