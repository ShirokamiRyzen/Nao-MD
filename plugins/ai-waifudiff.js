import axios from "axios"
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let wm = global.wm;

  if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} girl big oppai, hair cut collor red, full body, bokeh`;
  await m.reply(wait);

  await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id });
  try {
      let url = `https://api.neoxr.eu/api/waifudiff?q=${text}`;

      // Mengambil respon dari API
      let response = await fetch(url);
      let json = await response.json();

      // Mengambil nilai "url" dari properti "data" dalam respon JSON
      let imageUrl = json.data.url;

      // Mengirim file gambar ke obrolan
      await conn.sendFile(m.chat, await (await fetch(imageUrl)).buffer(), 'fubuki.jpg', wm, m);
      m.react(done);

  } catch (e) {
      console.log(e);
      conn.reply(eror);
  }
}

handler.help = ['waifudiff <prompt>']
handler.tags = ['ai']
handler.command = /^(waifudiff)$/i

handler.premium = false
handler.limit = true
handler.register = true

export default handler