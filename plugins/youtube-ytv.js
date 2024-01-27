//import ytdl from 'ytdl-core'
//
//let handler = async (m, { conn, args, usedPrefix, command }) => {
//  if (!args[0]) {
//    return m.reply(`Masukkan Link:\n${usedPrefix + command} https://youtu.be/iik25wqIuFo`);
//  }
//
//  const videoURL = args[0];
//
//  try {
//    const loadingMessage = await conn.reply(m.chat, `Sedang mengambil informasi video...\n${global.wait}`, m);
//
//    const info = await ytdl.getInfo(videoURL, { quality: 'highest' });
//
//    // Mengurutkan format berdasarkan resolusi dari yang tertinggi
//    const sortedFormats = info.formats.sort((a, b) => b.height - a.height);
//
//    // Memilih format dengan kualitas tertinggi
//    const highestQualityFormat = sortedFormats[0];
//
//    // Mengirim video dengan kualitas tertinggi
//    await conn.sendFile(m.chat, highestQualityFormat.url, 'video.mp4', `Resolusi Video ${highestQualityFormat.qualityLabel}`, m, null, true);
//
//    await m.reply("Done\nThe highest quality video has been sent");
//
//  } catch (error) {
//    console.error('Error fetching video info:', error);
//    await m.reply(`Error fetching video info: error ${error}`);
//  }
//}
import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    command,
    usedPrefix
}) => {
    const url = args[0];
    if (!url) {
        return m.reply(`Silakan masukkan link YouTube\n${usedPrefix + command} https://www.youtube.com/watch?v=LkKSzz_S3xk`);
    }

    const sender = m.sender.split(`@`)[0];

    try {
        const response = await axios.get(`https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(url)}`);
        const result = response.data;

        if (result.status) {
            const {
                title,
                thumbnail,
                duration
            } = result.data;

            // Mendapatkan semua video yang tersedia
            const availableVideos = Object.keys(result.data)
                .filter(key => key.startsWith('vid_'))
                .reduce((videos, key) => {
                    const resolution = key.replace('vid_', '');
                    videos[resolution] = result.data[key];
                    return videos;
                }, {});

            if (Object.keys(availableVideos).length > 0) {
                for (const [resolution, videoUrl] of Object.entries(availableVideos)) {
                    await conn.sendMessage(
                        m.chat, {
                            video: {
                                url: videoUrl
                            },
                            caption: `Youtube_${resolution}.mp4\nIni kak videonya @${sender} dengan resolusi ${resolution}`,
                            mentions: [m.sender],
                        },
                        m,
                    );
                }
            } else {
                return m.reply('Tidak ditemukan video yang dapat diunduh.');
            }
        } else {
            return m.reply('Gagal mengambil informasi video. Pastikan link YouTube valid.');
        }
    } catch (error) {
        console.error(error);
        return m.reply('Terjadi kesalahan saat melakukan pengambilan data. Coba lagi nanti.');
    }
}

handler.help = ['ytmp4'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = true
handler.register = true

export default handler
