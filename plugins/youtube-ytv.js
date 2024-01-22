import ytdl from 'ytdl-core'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Masukkan Link:\n${usedPrefix + command} https://youtu.be/iik25wqIuFo`);
  }

  const videoURL = args[0];

  try {
    const loadingMessage = await conn.reply(m.chat, `Sedang mengambil informasi video...\n${global.wait}`, m);

    const info = await ytdl.getInfo(videoURL, { quality: 'highest' });

    // Mengurutkan format berdasarkan resolusi dari yang tertinggi
    const sortedFormats = info.formats.sort((a, b) => b.height - a.height);

    // Memilih format dengan kualitas tertinggi
    const highestQualityFormat = sortedFormats[0];

    // Mengirim video dengan kualitas tertinggi
    await conn.sendFile(m.chat, highestQualityFormat.url, 'video.mp4', `Resolusi Video ${highestQualityFormat.qualityLabel}`, m, null, true);

    await m.reply("Done\nThe highest quality video has been sent");

  } catch (error) {
    console.error('Error fetching video info:', error);
    await m.reply(`Error fetching video info: error ${error}`);
  }
}

handler.help = ['ytmp4'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = true
handler.register = true

export default handler
