import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {

  if (!text) throw `Mana textnya?`;

  try {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = 'Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik, penyayang, riang, namun tsundere. dan kamu adalah pacarku.';

    let response = await fetch(`${APIs.ryzen}/api/ai/gemini-pro?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}`);

    if (!response.ok) {
      throw new Error("Request to Gemini AI failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.answer,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: "" + `Error: ${error.message}`,
      edit: key,
    });
  }
}

handler.help = ['gemini <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(gemini)$/i

handler.limit = 6
handler.premium = false
handler.register = true

export default handler