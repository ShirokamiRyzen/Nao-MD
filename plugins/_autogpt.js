// Script by ShirokamiRyzen
// Dont delete this credit!!!

import fetch from 'node-fetch'

let handler = m => m;

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.autogpt && !chat.isBanned) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        try {
            let prompt = encodeURIComponent("Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik, penyayang, riang, namun tsundere. dan kamu adalah pacarku.");
            let res = await fetch(`${APIs.ryzumi}/api/ai/v2/chatgpt?text=${encodeURIComponent(m.text)}&prompt=${prompt}`, {
                method: 'GET'
            });

            if (!res.ok) throw new Error("Failed to fetch data from API");

            let json = await res.json();
            if (json.action !== 'success') return m.reply('Gagal mendapatkan respons dari API');

            let replyMessage = json.response || 'Gagal mendapatkan pesan dari API';
            await m.reply(replyMessage);
        } catch (error) {
            m.reply('Terjadi kesalahan saat memproses permintaan.');
        }

        return true
    }
    return true
};

export default handler
