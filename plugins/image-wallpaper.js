import { wallpaper } from "../lib/scrape.js";

let handler = async (m, { conn, command, text, usedPrefix }) => {
    let query = text
    if (!query) throw `Input *URL*`;
    m.reply(wait);
    try {
        let wallpapers = await wallpaper(query);
        let randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        let cap = "Source: wallpaperflare.com";
        conn.sendMessage(m.chat, { image: { url: randomWallpaper }, caption: cap }, m);
    } catch (e) {
        console.log(e);
        m.reply(`Error`);
    }
};

handler.help = ['wallpaper' + ' <query>']
handler.tags = ['downloader']
handler.command = /^wallpaper$/i

export default handler

