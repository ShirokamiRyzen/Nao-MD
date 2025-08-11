import axios from 'axios'

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Please provide a Twitter URL';
  const sender = m.sender.split('@')[0];
  const url = args[0];

  m.reply(wait);

  try {
    let downloadResult = (await axios.get(`${APIs.ryzumi}/api/downloader/twitter?url=${url}`)).data;

    if (!downloadResult.status || !downloadResult.media || downloadResult.media.length === 0) {
      const tempResult = (await axios.get(`${APIs.ryzumi}/api/downloader/v2/twitter?url=${url}`)).data;
      downloadResult = Array.isArray(tempResult) && tempResult.length > 0
        ? { status: true, media: tempResult }
        : { status: false, media: [] };
    }

    if (!downloadResult.status || !downloadResult.media || downloadResult.media.length === 0) {
      throw 'Gagal mendownload konten dari Twitter';
    }

    const type = downloadResult.type || 'video';

    if (type === 'image') {
      for (let i = 0; i < downloadResult.media.length; i++) {
        const mediaUrl = downloadResult.media[i];
        const { data: imageBuffer } = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const caption = i === 0 ? `Ini kak fotonya @${sender}` : '';
        await conn.sendMessage(
          m.chat,
          {
            image: imageBuffer,
            caption: caption,
            fileName: `image_${i + 1}.jpg`,
            mentions: i === 0 ? [m.sender] : [],
          },
          { quoted: m }
        );
      }
    } else {
      const mediaUrl = downloadResult.media[0].url || downloadResult.media[0];
      const { data: videoBuffer } = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
      const caption = `Ini kak videonya @${sender}`;
      await conn.sendMessage(
        m.chat,
        {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: 'video.mp4',
          caption: caption,
          mentions: [m.sender],
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error('Handler Error:', error);
    conn.reply(m.chat, `An error occurred: ${error}`, m);
  }
};

handler.help = ['twitter <url>'];
handler.tags = ['downloader'];
handler.command = /^(x|twt|twitter(dl)?)$/i;

handler.limit = true
handler.register = true

export default handler
