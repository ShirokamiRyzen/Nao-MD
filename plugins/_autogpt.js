//Script by ShirokamiRyzen
//Dont delete this credit!!!

import fetch from 'node-fetch'

let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.autogpt && !chat.isBanned) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        let anu = `Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin. Namamu adalah Nao Tomori, dan kamu adalah wanita paling cantik. Kata penyapamu adalah "Hallo Sayang" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah pacar dari pembicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat tsundere`;

        let res = await fetch(`https://widipe.com/prompt/gpt?prompt=${encodeURIComponent(anu)}&text=${encodeURIComponent(m.text)}`);
        if (!res.ok) throw new Error("Failed to fetch data from the GPT prompt API");

        let json = await res.json();
        if (!json.result) return m.reply('Gagal mendapatkan respons dari GPT prompt API');

        let gptMessage = json.result || 'Gagal mendapatkan pesan dari GPT prompt API';
        await m.reply(gptMessage);
        return true;
    }
    return true;
};

export default handler
