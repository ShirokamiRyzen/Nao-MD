import axios from 'axios'
import cheerio from 'cheerio'

var handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw 'Uhm... URL-nya mana?';
    }

    try {
        await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download... server 1', m);

        const tiktokData = await tryServer1(args[0]);

        if (!tiktokData) {
            throw 'Gagal mendownload video!';
        }

        const videoURL = tiktokData.video.noWatermark;

        const videoURLWatermark = tiktokData.video.watermark;

        let ppTiktok = '';
        if (tiktokData.author && tiktokData.author.avatar) {
            ppTiktok = tiktokData.author.avatar;
        }

        const infonya_gan = `Judul: ${tiktokData.title}\nUpload: ${tiktokData.created_at}\n\nSTATUS:\n=====================\nLike = ${tiktokData.stats.likeCount}\nKomen = ${tiktokData.stats.commentCount}\nShare = ${tiktokData.stats.shareCount}\nViews = ${tiktokData.stats.playCount}\nSimpan = ${tiktokData.stats.saveCount}\n=====================\n\nUploader: ${tiktokData.author.name || 'Tidak ada informasi penulis'}\n(${tiktokData.author.unique_id} - https://www.tiktok.com/@${tiktokData.author.unique_id})\nBio: ${tiktokData.author.signature}\nLagu: ${tiktokData.music.play_url}\nResolusi: ${tiktokData.video.ratio}\nFoto Profile: ${ppTiktok}`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', `Ini kak videonya\n\n${infonya_gan}`, m);
            setTimeout(async () => {
            }, 25000);
        } else {
            throw 'Tidak ada tautan video yang tersedia.';
        }
    } catch (error1) {
        // jika server 1 gagal, gunakan server 2
        try {
            await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download... server 2', m);
            const tiktokData2 = await tryServer2(args[0]);

            if (!tiktokData2) {
                throw 'Gagal mendownload video!';
            }

            const videoURL2 = tiktokData2.video0;
            //const soundURL2 = tiktokData2.sound;

            await conn.sendFile(m.chat, videoURL2, 'tiktok2.mp4', 'Ini kak videonya dari Server 2', m);
           // await conn.sendFile(m.chat, soundURL2, 'tiktok_sound.mp3', 'Ini kak soundnya dari Server 2', m);

        } catch (error2) {
            conn.reply(m.chat, `Error: ${error2}`, m);
        }
    }
};

handler.help = ['tiktok'].map((v) => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i
handler.register = true
handler.limit = true

export default handler

async function tryServer1(url) {
    // server 1 tiklydown.eu.org
    let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
    let response = await axios.get(tiklydownAPI);
    return response.data;
}

async function tryServer2(url) {
    // server 2 
    try {
        const response = await axios.get(`https://tikdown.ryzendesu.vip/api/download?mobile=${url}`);

        if (response.status === 200) {
            const data = response.data;

            if (data.video) {
                return {
                    video: true,
                    video0: data.video0,
                    video1: data.video1,
                    sound: data.sound,
                    author: data.author
                };
            } else {
                return {
                    status: false
                };
            }
        } else {
            return {
                status: false
            };
        }
    } catch (error) {
        throw error;
    }
}