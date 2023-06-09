import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ organization: `${global.org}`, apiKey: `${global.openai}` }); //KEY-OPENAI-APIKEY-KAMU = https://platform.openai.com/account/api-keys , KEY-ORG-KAMU = https://platform.openai.com/account/org-settings
const openai = new OpenAIApi(configuration);

let handler = async (m, { conn, text, command }) => {
    try {
        if (!text) throw new Error(`Membuat gambar dari AI.\n\nContoh:\n.img Rumah kayu diatas gunung bersalju\n\n\n\nCreate image from AI\n\nExample:\n.img Wooden house on snow mountain`);
        
        await m.reply(wait)
        const response = await openai.createImage({
            prompt: text,
            n: 1,
            size: "1024x1024",
        });
        
        conn.sendFile(m.chat, response.data.data[0].url, text)
        
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
        } else {
            console.log(error);
            m.reply(error.message);
        }
    }
}


handler.help = ['dalle <prompt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = true
handler.register = true

export default handler