import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗] Example: ${usedPrefix + command} https://www.tiktok.com/@tuanliebert/video/7313159590349212934?is_from_webapp=1&sender_device=pc*`;
  }

  conn.reply(m.chat, wait, m);

  try {
    let API = `${APIs.ryzen}/api/downloader/ttdl?url=${args[0]}`;
    let response = await (await fetch(API)).json();
    const videoData = response.data?.data;
    if (!videoData) {
      throw "Gagal mendownload video!";
    }

    let videoURL = videoData.play;
    const videoURLWatermark = videoData.wmplay;
    const hdURL = videoData.hdplay;

    if (args[1] === "hd" && hdURL) {
      videoURL = hdURL;
    }

    const author = videoData.author || {};
    const authorNickname = author.nickname || "unknown";
    const authorUniqueId = author.unique_id || "unknown";

    const infonya_gan = `Judul: ${videoData.title}\nUpload: ${videoData.create_time}\n\nSTATUS:\n=====================\nLike = ${videoData.digg_count}\nKomen = ${videoData.comment_count}\nShare = ${videoData.share_count}\nViews = ${videoData.play_count}\nSimpan = ${videoData.download_count}\n=====================\n\nUploader: ${authorNickname}\n(${authorUniqueId} - https://www.tiktok.com/@${authorUniqueId})\nSound: ${videoData.music}\n`;

    if (
      videoURL && videoURL.endsWith('.mp3') &&
      videoURLWatermark && videoURLWatermark.endsWith('.mp3') &&
      (!hdURL || hdURL.endsWith('.mp3'))
    ) {
      if (videoData.images && videoData.images.length > 0) {
        for (let i = 0; i < videoData.images.length; i++) {
          const imageURL = videoData.images[i];
          let caption = i === 0 ? `Ini kak gambar ${i + 1}\n\n${infonya_gan}` : `Ini kak gambar ${i + 1}`;
          await conn.sendFile(m.chat, imageURL, `image${i + 1}.jpg`, caption, m);
        }
      } else {
        throw "Tidak ada gambar yang tersedia.";
      }
    } else {
      if (videoURL || videoURLWatermark) {
        await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `Ini kak videonya\n\n${infonya_gan}`, m);
      } else {
        throw "Tidak ada tautan video yang tersedia.";
      }
    }
  } catch (error) {
    conn.reply(m.chat, `Error: ${error}`, m);
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url> [hd]');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

handler.disable = false
handler.register = true
handler.limit = true

export default handler
