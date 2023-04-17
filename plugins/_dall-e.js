import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ organization: `${global.org}`, apiKey: `${global.openai}`});
const openaiii = new OpenAIApi(configuration);
let handler = async (m, { conn, text, command }) => {
        
            if (!text) throw (`Membuat gambar dari AI.\n\nContoh:\n.aiimage Wooden house on snow mountain`);
            await m.reply(wait)
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "1024x1024",
            });
conn.sendButtonImg(m.chat, response.data.data[0].url, 'Done', wm, 'Menu', '.m', m)
}

handler.help = ['dalle <prompt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = true

export default handler