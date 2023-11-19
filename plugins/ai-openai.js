/*import fetch from "node-fetch";
import { generateWAMessageFromContent } from "@adiwajshing/baileys";
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ organization: `${global.org}`, apiKey: `${global.openai}` }); //KEY-OPENAI-APIKEY-KAMU = https://platform.openai.com/account/api-keys , KEY-ORG-KAMU = https://platform.openai.com/account/org-settings
const openai = new OpenAIApi(configuration);

let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    if (!text) throw new Error(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo?`);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: 'Kamu adalah asisten, dan nama kamu adalah Nao Tomori dan kamu senang membantu orang' },
    { role: "assistant", content: text }],
    });

    conn.reply(m.chat, `${response.data.choices[0].message.content}`, m);

  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      conn.reply(m.chat, `${error.response.status}\n\n${error.response.data}`, m);
    } else {
      conn.reply(m.chat, `${error.message}`, m);
    }
  }
}

handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true

export default handler
*/

import fetch from "node-fetch"
import axios from "axios"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command }) => {
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
        'Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin. Namamu adalah Nao Tomori, dan kamu adalah wanita paling cantik. Kata penyapamu adalah "Hallo sayang" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan teriak dan bicara yang lebih tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah pacar dari pembicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat tsundere',
    },
    {
      role: "user",
      content: text,
    },
  ];

  let response = (
    await axios.post(`https://skizo.tech/api/openai?apikey=${global.xzn}`, {
      messages,
    })
  ).data;

  await conn.sendMessage(m.chat, {
    react: {
      text: "🌧",
      key: m.key,
    },
  });

  let result = "" + response.result;

  await conn.sendMessage(m.chat, {
    text: "" + result,
    edit: key,
  });

  previousMessages = messages;
};

handler.help = ['ai <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = false
handler.register = true

export default handler
