/*
import fetch from 'node-fetch'
let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} Apa itu OpenAI`

let res = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${global.lolkey}&text=${text}&user=user-unique-id`)
if (!res.ok) throw eror
        let json = await res.json()
        await m.reply(`${json.result}`)
        return !0
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['main']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true

export default handler
*/
import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text }) => {
if (!text) throw "Contoh:\n${usedPrefix + command} Apa itu OpenAI"
const configuration = new Configuration({
    apiKey: ""
});
const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
            m.reply(response.data.choices[0].text)
    }
handler.help = ['ai <pertanyaan>']
handler.tags = ['main']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true