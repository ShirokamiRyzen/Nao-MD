import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Usage: ${usedPrefix}${command} url reso`;

    m.reply(wait);

    const args = text.split(' ');
    const videoUrl = args[0];
    let resolution = '480';

    if (args[1] && /^[0-9]+p$/.test(args[1])) {
        resolution = args[1].replace('p', '');
    }

    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(videoUrl)}&reso=${resolution}`;

    try {
        const response = await axios.get(apiUrl);
        const { url: videoStreamUrl } = response.data;

        if (!videoStreamUrl) throw 'Video URL not found in API response.';

        const videoStream = await axios({
            url: videoStreamUrl,
            method: 'GET',
            responseType: 'stream'
        }).then(res => res.data);

        const tmpDir = os.tmpdir();
        const filePath = `${tmpDir}/${new URL(videoUrl).pathname.split('/').pop()}_${resolution}.mp4`;
        const writableStream = fs.createWriteStream(filePath);

        // Mulai mengunduh video
        await streamPipeline(videoStream, writableStream);

        let doc = {
            video: {
                url: filePath
            },
            mimetype: 'video/mp4',
            fileName: filePath.split('/').pop(),
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: videoUrl,
                    title: filePath.split('/').pop(),
                    sourceUrl: videoUrl
                }
            }
        };

        await conn.sendMessage(m.chat, doc, { quoted: m });

        // Hapus file video
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete video file: ${err}`);
            } else {
                console.log(`Deleted video file: ${filePath}`);
            }
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw `Failed to process request: ${error.message || error}`;
    }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = /^(ytmp4)$/i;

handler.limit = 10
handler.register = true
handler.disable = false

export default handler
