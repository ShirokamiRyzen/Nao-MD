import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "☁",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = 'Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik dan tsundere. dan kamu adalah pacar penulis.';

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      react: {
        text: "🌧",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: "" + result.response,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
}

handler.help = ['gpt <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(gpt)$/i
handler.limit = 1
handler.register = true

export default handler

/*import OpenAI from "openai";
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) throw `Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`;
            const openai = new OpenAI({
              apiKey: "KEY-OPENAI-APIKEY-KAMU", //KEY-OPENAI-APIKEY-KAMU = https://platform.openai.com/account/api-keys 
            });
            const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.choices[0].message.content}`) 
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

handler.command = /^(ai)$/i;
handler.help = ["ai"].map(v => v + " <teks>");
handler.tags = ["ai"]
handler.fail = null

handler.limit = true
handler.exp = 0
handler.register = true

export default handler
*/

