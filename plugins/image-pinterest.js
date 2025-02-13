import axios from 'axios'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Input *Query*`;

  m.reply(wait);

  try {
    const url = `${APIs.ryzen}/api/search/pinterest?query=${encodeURIComponent(text)}`;
    const response = await axios.get(url);
    const data = response.data;

    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    for (const item of selected) {
      const imageRes = await axios.get(item.directLink, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageRes.data, 'binary');
      const caption = `🔗 *Source:* ${item.link}`;

      await conn.sendFile(m.chat, imageBuffer, 'gambar.jpg', caption);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (e) {
    conn.reply(m.chat, 'Terjadi kesalahan saat mendownload gambar.', m);
  }
};

handler.help = ['pinterest'];
handler.tags = ['internet'];
handler.command = /^pin(terest)?$/i;

handler.limit = 2
handler.register = true

export default handler
