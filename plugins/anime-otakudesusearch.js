import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw `Judulnya?`;
  let res = await fetch(`https://ryzendesu.vip/api/anime/?search=${text}`);
  let otaku = await res.json();

  if (!otaku.data || otaku.data.length === 0) {
    throw `Anime tidak ditemukan.`;
  }

  // Mengambil nilai id dari JSON
  let animeId = otaku.data[0].id;

  // Membuat URL dengan menggabungkan URL dasar dan id
  let animeUrl = `https://ryzendesu.vip/${animeId}`;

  // Mendapatkan thumbnail URL
  let thumbnailUrl = otaku.data[0].thumbnail;

  // Mengubah thumbnail URL sesuai format yang diinginkan
  thumbnailUrl = `https://external-content.duckduckgo.com/iu/?u=${thumbnailUrl}`;

  let otakuinfo = `• *Title:* ${otaku.data[0].title}
• *Genre:* ${otaku.data[0].genres}

• *Link*: ${animeUrl}`;

  conn.sendFile(m.chat, thumbnailUrl, 'otaku.jpeg', otakuinfo, m);
};

handler.help = ['anime <judul>']
handler.tags = ['anime']
handler.command = /^anime$/i

handler.limit = false

export default handler
