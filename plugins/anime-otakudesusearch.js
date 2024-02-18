import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw `Judulnya?`;
  let res = await fetch(`https://ryzendesu-backend.vercel.app/anime/?search=${text}`);
  let otaku = await res.json();

  if (!otaku || otaku.length === 0) {
    throw `Anime tidak ditemukan.`;
  }

  // Mengambil slug dari JSON
  let animeSlug = otaku[0].slug;

  // Membuat URL dengan menggabungkan URL dasar dan slug
  let animeUrl = `https://www.ryzendesu.vip/anime/${animeSlug}`;

  // Mengambil thumbnail URL
  let thumbnailUrl = otaku[0].gambar;

  // Mengubah thumbnail URL sesuai format yang diinginkan
  thumbnailUrl = `https://external-content.duckduckgo.com/iu/?u=${thumbnailUrl}`;

  let otakuinfo = `• *Title:* ${otaku[0].judul}
• *Link*: ${animeUrl}`;

  conn.sendFile(m.chat, thumbnailUrl, 'otaku.jpeg', otakuinfo, m);
};

handler.help = ['anime <judul>']
handler.tags = ['anime']
handler.command = /^anime$/i

handler.limit = false

export default handler
