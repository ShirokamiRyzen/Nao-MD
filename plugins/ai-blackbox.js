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

    let hasil = await fetch(`https://api.ryzendesu.vip/api/ai/blackbox?chat=${encodeURIComponent(text)}&options=gpt-4o`);

    if (!hasil.ok) {
      throw new Error("Request to Gemini AI failed");
    }

    let result = await hasil.json();

    await conn.sendMessage(m.chat, {
      text: "" + result.response,
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

handler.help = ['blackbox <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(blackbox)$/i

handler.limit = 6
handler.premium = false
handler.register = true

export default handler