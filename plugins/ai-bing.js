import axios from 'axios'

const handler = async (m, { text, conn, command }) => {
    const teks = text || 'hi';
    let varian;
    
    if (command === 'bingc') {
        varian = 'Creative';
    } else if (command === 'bing') {
        varian = 'Balanced';
    } else if (command === 'bingp') {
        varian = 'Precise';
    }
    try {
        const result = await fetchData(teks, varian);
        m.reply(result.adaptiveResponse.text)
        if (result.generatedImage && result.generatedImage.data && result.generatedImage.data.length > 0) {
    for (let imageUrl of result.generatedImage.data) {
        await conn.sendFile(m.chat, imageUrl, '', '', m);
    }
} else if (result.generatedImage) {
    m.reply(result.generatedImage.message);
} else {
    m.reply('No generated image data available.');
}
    } catch (error) {
        conn.reply('120363152277068835@g.us', 'https://skizo.tech/api/bing-chat? error', m)
        m.reply('Oops, something went wrong!');
    }
}

handler.help = ['bing']
handler.tags = ['ai']
handler.command = /^(bingc|bing|bingp)$/i

handler.premium = false
handler.disable = true

export default handler

async function fetchData(teks, varian) {
  try {
    const server = await axios.post(`https://skizo.tech/api/bing-chat?apikey=${global.xzn}`, {
      text: teks,
      cookie: '',
      image: 'base64',
      generateImage: true,
      variant: varian
    });
      
    const serverUrl = server.data;
    return serverUrl;
  } catch (error) {
    throw error;
  }
}