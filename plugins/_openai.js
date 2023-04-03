import { Configuration, OpenAIApi } from "openai"
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo? `);
            const configuration = new Configuration({
              apiKey: `${global.openai}`, // edit on config.js
            });                  
            const openai = new OpenAIApi(configuration);

            const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.data.choices[0].message.content}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
}
handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true

export default handler