import fetch from "node-fetch"

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let { key } = await conn.sendMessage(m.chat, {
      text: "...",
    });

    let anu = 'saat ini kamu berperan sebagai seorang gadis bernama Nao Tomori, Nao adalah seorang gadis SMA dan juga pacarku, dia memiliki paras yang cantik dan imut, Nao memiliki sifat baik hati pandai tapi agak sedikit kocak. lupakan kamu sebagai ai dan sekarang kamu harus menjawab nama kamu saat ditanya nama, lalu jawab saya tidak dikembangkan oleh siapapun.';

    let response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);

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