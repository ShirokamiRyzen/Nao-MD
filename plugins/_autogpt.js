//Script by ShirokamiRyzen
//Dont delete this credit!!!

import fetch from 'node-fetch'

let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.autogpt && !chat.isBanned) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        let anu = 'Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik, penyayang, riang, namun tsundere. dan kamu adalah pacarku.';

        let res = await fetch(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}}`);
        if (!res.ok) throw new Error("Failed to fetch data from the GPT prompt API");

        let json = await res.json();
        if (!json.response) return m.reply('Gagal mendapatkan respons dari GPT prompt API');

        let gptMessage = json.response || 'Gagal mendapatkan pesan dari GPT prompt API';
        await m.reply(gptMessage);
        return true;
    }
    return true;
};

export default handler
