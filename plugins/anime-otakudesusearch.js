import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw `Judulnya?`;

  // Function to fetch anime or movie data
  const fetchData = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  };

  // Try fetching from anime endpoint first
  let otaku = await fetchData(`https://backend.ryzumi.vip/anime/?search=${text}`);
  let isAnime = true;

  if (!otaku || otaku.length === 0) {
    // If no anime found, try fetching from movies endpoint
    let movies = await fetchData(`https://ryzendesu-movie-backend.netlify.app/movies`);
    otaku = movies.filter(movie => movie.judul.toLowerCase().includes(text.toLowerCase()));
    isAnime = false;

    if (!otaku || otaku.length === 0) {
      throw `Anime atau film tidak ditemukan.`;
    }
  }

  // Mengambil slug dari JSON
  let animeSlug = otaku[0].slug;

  // Membuat URL dengan menggabungkan URL dasar dan slug
  let animeUrl = isAnime ? 
    `https://www.ryzumi.vip/anime/${animeSlug}` : 
    `https://www.ryzumi.vip/movie/${animeSlug}`;

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
