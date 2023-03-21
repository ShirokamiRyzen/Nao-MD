import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text, usedPrefix, command }) => {
        
            if (!text) throw (`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: `${global.openai}`
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
        
conn.send3TemplateButtonImg(m.chat, response.data.data[0].url, 'Ini Resultnya Kak', wm, 'SewaBot', '.sewa', 'Owner', '.owner', 'Menu', '.menu', m)
}

handler.help = ['dalle <prompt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = true

export default handler