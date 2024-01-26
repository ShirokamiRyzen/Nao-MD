import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw `Judul?`;
  let res = await fetch(`https://ryzendesu.vip/api/anime/${text}`);
  let responseData = await res.json();
  let otaku = responseData.data;

  // Mendapatkan thumbnail URL
  let thumbnailUrl = otaku.thumbnail;

  // Mengubah thumbnail URL sesuai format yang diinginkan
  thumbnailUrl = `https://external-content.duckduckgo.com/iu/?u=${thumbnailUrl}`;

  let links = otaku.links.map(link => {
    let episodeLink = `https://ryzendesu.vip/nonton/${link.id}`;
    return `•(${episodeLink})`;
  }).join('\n');

  let otakuinfo = `• *Status:* ${otaku.info[5]}
• *Judul:* ${otaku.title}
• *Rating:* ${otaku.info[2]}
• *Produser:* ${otaku.info[3]}
• *Tipe:* ${otaku.info[4]}
• *Total Eps:* ${otaku.info[6]}
• *Durasi:* ${otaku.info[7]}
• *Rilis:* ${otaku.info[8]}
• *Studio:* ${otaku.info[9]}
• *Genre:* ${otaku.info[10]}

• *Link Episode:*
${links}
`;

  conn.sendFile(m.chat, thumbnailUrl, 'otaku.jpeg', otakuinfo, m);
};

handler.help = ['otakudesu <Judul>']
handler.tags = ['anime']
handler.command = /^otakudesu$/i

handler.limit = false

export default handler
