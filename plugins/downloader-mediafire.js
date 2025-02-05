import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.mediafire.com/file/in5j3u2zwoq1x33/BLUR_BLUR_ASIK.zip/file`;
    
    let mediafireApi = `${APIs.ryzen}/api/downloader/mediafire?url=${encodeURIComponent(args[0])}`;

    m.reply(wait)

    try {
        let res = await axios.get(mediafireApi);
        let data = res.data;

        if (!data || !data.download) throw 'Failed to fetch download link. Please try again later.';

        let { filename, size, mimetype: ext, created, download, cookie } = data;

        let caption = `
*💌 Name:* ${filename}
*📊 Size:* ${size}
*🗂️ Extension:* ${ext}
*📨 Uploaded:* ${new Date(created).toLocaleString()}
`.trim();

        let fileRes = await axios.get(download, {
            headers: {
                Cookie: cookie
            },
            responseType: 'arraybuffer'
        });

        m.reply(caption);
        await conn.sendFile(
            m.chat, 
            Buffer.from(fileRes.data), 
            filename, 
            '', 
            m, 
            null, 
            { mimetype: ext, asDocument: true }
        );
    } catch (e) {
        throw 'An error occurred: ' + e;
    }
};

handler.help = ['mediafire'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;

handler.limit = true
handler.register = true

export default handler
