// Don't delete this credit!!!
// Script by ShirokamiRyzen

import axios from 'axios'
import { exec } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a BiliBili video URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const { data } = await axios.get(`${APIs.ryzen}/api/downloader/bilibili?url=${encodeURIComponent(url)}`);

        if (!data.status || !data.data || !data.data.mediaList || !data.data.mediaList.videoList || data.data.mediaList.videoList.length === 0) {
            throw 'No available video found';
        }

        const video = data.data.mediaList.videoList[0];
        const title = data.data.title || "Video";
        const views = data.data.views || "0";
        const likes = data.data.like || "0";

        if (video.url) {
            const videoBuffer = await axios.get(video.url, { responseType: 'arraybuffer' }).then(res => res.data);
            const tempFilePath = path.join('/tmp', `${video.filename || 'video'}.mp4`);
            const outputFilePath = path.join('/tmp', `${video.filename || 'video'}_fixed.mp4`);

            // Write the video buffer to a temporary file
            await fs.writeFile(tempFilePath, videoBuffer);

            // Use ffmpeg command to copy the video without re-encoding
            await new Promise((resolve, reject) => {
                exec(`ffmpeg -i ${tempFilePath} -c copy ${outputFilePath}`, (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });

            const caption = `Ini videonya kak @${sender}!\n\n*Judul:* ${title}\n*Ditonton:* ${views}\n*Suka:* ${likes}`;

            // Read the processed video file as buffer
            const fixedVideoBuffer = await fs.readFile(outputFilePath);

            // Send the video with correct metadata
            await conn.sendMessage(
                m.chat, {
                    video: fixedVideoBuffer,
                    mimetype: "video/mp4",
                    fileName: video.filename,
                    caption: caption,
                    mentions: [m.sender],
                }, {
                    quoted: m
                }
            );

            await fs.unlink(tempFilePath);
            await fs.unlink(outputFilePath);
        } else {
            throw 'No available video found';
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error.message || error}`, m);
    }
};

handler.help = ['bilibili'];
handler.tags = ['downloader'];
handler.command = /^(bili(bili)?)$/i;

handler.limit = 2
handler.register = true

export default handler
