import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const code = args[0];

    if (!code) {
        return conn.reply(m.chat, `Please provide the code to generate the image.`, m);
    }

    m.reply(wait)

    try {
        const response = await axios.get(`${APIs.ryzumi}/api/tool/carbon?code=${encodeURIComponent(code)}`, {
            responseType: 'arraybuffer'
        });

        conn.sendMessage(m.chat, { image: response.data }, { quoted: m });

    } catch (error) {
        conn.reply(m.chat, `Error occurred while generating the code image.`, m);
    }
}

handler.help = ["carbon"];
handler.tags = ["ai"];
handler.command = /^carbon(ify)?$/i;

handler.register = true
handler.limit = true

export default handler
