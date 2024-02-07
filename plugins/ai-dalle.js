import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm

    if (!text) throw `This command generates image from texts\n\n Example usage\n${usedPrefix + command} Wooden house on snow mountainh`
    await m.reply(wait)

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://aemt.me/dalle?text=${text}`

        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'dalle.jpg', wm, m)
        m.react(done)

    } catch (e) {
        console.log(e)
        conn.reply(eror)
    }
}

handler.help = ['dalle <prompt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = true
handler.register = true

export default handler

/*import OpenAI from 'openai'

const mySecret = process.env[`${global.openai}`] // process.env['key-apikey'] ubah jadi key-APIKEY kamu di openai.com

const openai = new OpenAI({ apiKey: mySecret });

let handler = async (m, { conn, text, command }) => {
    try {
        if (!text) throw new Error(`Membuat gambar dari AI.\n\nContoh:\n.img Wooden house on snow mountain`);

        await m.reply(wait)
        const response = await openai.images.generate({
            model: "dall-e-2", // dall-e-3 terlalu banyak permintaan jadi sering error
            prompt: text,
            n: 1,
            // quality: 'hd', // jika mau ganti optional, defaultnya adalah standart
            size: "1024x1024", // Pixel Tersedia 1024x1024, 1024x1792 or 1792x1024
        });

        conn.sendFile(m.chat, response.data[0].url, 'image.png', `Done`, m)
        // Or use conn.reply:
        // conn.reply(m.chat, `Done\n\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\n Dana: ${Nomor}\nGopay: ${Nomor}`, m);

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
        } else {
            console.log(error);
            m.reply(error.message);
        }
    }
}
*/