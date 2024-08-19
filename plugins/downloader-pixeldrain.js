import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Pixeldrain URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        // Panggil fungsi download dari Pixeldrain
        const { url: downloadUrl, filename, filetype } = await pixeldrainDL(url);
        
        // Ambil file videonya
        const { data: videoBuffer } = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

        const caption = `Ini kak videonya @${sender}`;

        await conn.sendMessage(
            m.chat, {
                video: videoBuffer,
                mimetype: filetype,
                fileName: filename,
                caption: caption,
                mentions: [m.sender],
            }, {
                quoted: m
            }
        );
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
}

handler.help = ['pixeldrain <url>']
handler.tags = ['downloader']
handler.command = /^(pddl|pixeldrain|pixeldrain(dl)?)$/i

handler.limit = true
handler.register = true

export default handler

// Fungsi download dari Pixeldrain
async function pixeldrainDL(url) {
    if (typeof url !== 'string' || !isValidUrl(url)) {
        throw new Error("Invalid URL");
    }

    const DEFAULT_HEADERS = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    };

    const { data } = await axios.get(url, {
        headers: DEFAULT_HEADERS
    });

    const $ = cheerio.load(data);
    const scriptData = $('script').eq(0).html();
    const jsonData = /window\.viewer_data\s*=\s*({.*?});/.exec(scriptData)?.[1];

    if (!jsonData) {
        throw new Error("Failed to retrieve viewer data");
    }

    const viewerData = JSON.parse(jsonData);
    const fileData = viewerData.api_response;

    const fileSizeMB = fileData.size / (1024 * 1024); // Convert bytes to MB

    if (fileSizeMB > 300) {
        throw new Error(`File is too large (${fileSizeMB.toFixed(2)} MB). Maximum allowed size is 300 MB.`);
    }

    const result = {
        url: `https://pixeldrain.com/api/file/${fileData.id}?download`,
        filename: fileData.name,
        filetype: fileData.mime_type,
        filesize: fileSizeMB
    };

    return result;
}

// Fungsi validasi URL
function isValidUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?pixeldrain\.com\/.*$/;
    return regex.test(url);
}
