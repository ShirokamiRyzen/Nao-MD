import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Input *URL*`;
  m.reply(wait);
  try {
    let res = await fetch(`https://api.ryzendesu.com/api/search/wallpaper?text=${text}&apikey=${global.ryzen}`);
    let result = await res.json();
    let wallpapers = result.result; // Array of wallpaper objects
    let randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)]; // Select a random wallpaper
    let cap = "api.ryzendesu.com";
    conn.sendMessage(m.chat, { image: { url: randomWallpaper.image }, caption: cap }, m);
  } catch (e) {
    console.log(e);
    m.reply(`Fitur error atau Otak pengguna error`);
  }
}


handler.help = ['wallpaper' + ' <query>']
handler.tags = ['downloader']
handler.command = /^wallpaper$/i

export default handler