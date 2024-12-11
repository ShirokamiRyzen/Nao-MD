import { promisify } from 'util'
import { exec as execCallback } from 'child_process'
const exec = promisify(execCallback);

const handler = async (m, { conn }) => {

    m.reply(wait)

    try {
        const { stdout, stderr } = await exec('python3 speed.py --share --secure');

        const { download, upload, ping, server, client, timestamp, bytes_sent, bytes_received, share, } = JSON.parse(stdout.match(/\{(.|\n)*\}/)[0]);

        const message = `
🚀 Download Speed: ${formatSpeed(download)} Mbps
📤 Upload Speed: ${formatSpeed(upload)} Mbps
⏱ Ping: ${ping} ms

Server Details:
  Name: ${server.name}
  Country: ${server.country}
  Sponsor: ${server.sponsor}

Client Details:
  IP: #HIDDEN
  ISP: ${client.isp}
  Country: ${client.country}

📅 Timestamp: ${formatTimestamp(timestamp)}
💾 Bytes Sent: ${formatBytes(bytes_sent)}
💽 Bytes Received: ${formatBytes(bytes_received)}
🔗 Share Link: ${share}
`;

        await conn.reply(m.chat, message, m, {
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    body: "SPEEDTEST",
                    containsAutoReply: true,
                    mediaType: 1,
                    mediaUrl: 'https://www.speedtest.net/id',
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    sourceUrl: 'https://www.speedtest.net/id',
                    thumbnail: await conn.resize(share, 350, 200),
                    thumbnailUrl: share,
                    title: " O O K L A ",
                },
            },
        });
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest)$/i;

handler.register = true
handler.rowner = true

export default handler

function formatSpeed(speed) {
    return (speed / (1024 * 1024)).toFixed(2);
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}