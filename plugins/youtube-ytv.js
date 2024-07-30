import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { youtubedl } from '../lib/youtube.js'

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {

    if (!text) throw `Usage: ${usedPrefix}${command} <YouTube Video URL>`;

    const videoUrl = text;

    m.reply(wait)

    // Get video details and download link
    const { result, resultUrl } = await youtubedl(videoUrl);
    const { title, duration, author } = result;
    const videoInfo = resultUrl.video.find(v => v.quality === '1080p') || resultUrl.video[0];  // Select the highest quality available

    // Fetch the download URL
    const downloadUrl = await videoInfo.download();

    // Create writable stream in temporary directory
    const writableStream = fs.createWriteStream(`tmp/${title}.mp4`);

    // Download video
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error(`Failed to download video: ${response.statusText}`);

    // Start downloading video
    await streamPipeline(response.body, writableStream);

    let doc = {
        video: {
            url: `tmp/${title}.mp4`
        },
        mimetype: 'video/mp4',
        fileName: `${title}`,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 2,
                mediaUrl: videoUrl,
                title: title,
                sourceUrl: videoUrl,
                thumbnail: await (await conn.getFile(result.thumbnail)).data
            }
        }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });

    // Delete video file
    fs.unlink(`tmp/${title}.mp4`, (err) => {
        if (err) {
            console.error(`Failed to delete video file: ${err}`);
        } else {
            console.log(`Deleted video file: tmp/${title}.mp4`);
        }
    });
};

handler.help = ['ytmp4'].map((v) => v + ' <URL>')
handler.tags = ['downloader']
handler.command = /^(ytmp4)$/i

handler.limit = 2
handler.register = true
handler.disable = false

export default handler
