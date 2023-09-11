import { File } from "megajs"

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text) return m.reply(`Contoh:\n${usedPrefix + command} https://mega.nz/file/0FUA2bzb#vSu3Ud9Ft_HDz6zPvfIg_y62vE1qF8EmoYT3kY16zxo`);
        
        const file = File.fromURL(text);
        await file.loadAttributes();
        
        if (file.size >= 300000000) return m.reply('Error: ukuran file terlalu besar (Ukuran Max: 300MB)');
        
        m.reply(`*_Mohon tunggu beberapa menit..._*\n${file.name} sedang diunduh...`);
        
        const data = await file.downloadBuffer();
        
        // Menambahkan ekstensi yang didukung (zip, rar, 7z, jpg, png) ke dalam daftar
        if (/mp4/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "video/mp4", filename: `${file.name}.mp4` }, { quoted: m });
        } else if (/pdf/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/pdf", filename: `${file.name}.pdf` }, { quoted: m });
        } else if (/zip/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/zip", filename: `${file.name}.zip` }, { quoted: m });
        } else if (/rar/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/x-rar-compressed", filename: `${file.name}.rar` }, { quoted: m });
        } else if (/7z/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "application/x-7z-compressed", filename: `${file.name}.7z` }, { quoted: m });
        } else if (/jpg|jpeg/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "image/jpeg", filename: `${file.name}.jpg` }, { quoted: m });
        } else if (/png/.test(file.name)) {
            await conn.sendMessage(m.chat, { document: data, mimetype: "image/png", filename: `${file.name}.png` }, { quoted: m });
        } else {
            return m.reply('Error: Format file tidak didukung');
        }
    } catch (error) {
        return m.reply(`Error: ${error.message}`);
    }
}

handler.help = ["mega"]
handler.tags = ["downloader"]
handler.command = /^(mega)$/i
export default handler
