/*import OpenAI from "openai";
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`);
            const openai = new OpenAI({
              apiKey: `${global.openai}`, //KEY-OPENAI-APIKEY-KAMU = https://platform.openai.com/account/api-keys 
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

import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command }) => {
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

    let messages = [
      ...previousMessages,
      {
        role: "system",
        content:
          'Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin. Namamu adalah Nao Tomori, dan kamu adalah wanita paling cantik. Kata penyapamu adalah "Hallo Sayang" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah pacar dari pembicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat tsundere',
      },
      {
        role: "user",
        content: text,
      },
    ];

    let response = await fetch(`https://skizo.tech/api/openai?apikey=${global.xzn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
      }),
    });

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
      text: "" + result.result,
      edit: key,
    });

    previousMessages = messages;
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: "Error, please try again later",
    });
  }
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = 5
handler.premium = false
handler.register = true

export default handler