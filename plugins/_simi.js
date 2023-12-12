import fetch from 'node-fetch'

let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.simi && !chat.isBanned) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        let lang = "id";
        let res = await fetch('https://api.simsimi.vn/v1/simtalk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `text=${encodeURIComponent(m.text)}&lc=${lang}&key=`
        });

        if (!res.ok) throw new Error("Failed to fetch data from SimSimi API");

        let json = await res.json();
        if (json.status !== '200') return m.reply('Gagal mendapatkan respons dari Simi');

        let simiMessage = json.message || 'Gagal mendapatkan pesan dari Simi';
        await m.reply(simiMessage);
        return true;
    }
    return true;
};

export default handler
