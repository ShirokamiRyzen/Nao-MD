import fetch from 'node-fetch'

const handler = async (m, { text, args, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `Gunakan contoh *${usedPrefix}simi halo*\nJika Simi tidak merespon, coba *${usedPrefix + command}2 halo Simi*`;
    }

    // Updated API endpoint and method
    const url = 'https://api.simsimi.vn/v1/simtalk';
    const lang = 'id'; // specify your desired language code
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&lc=${lang}&key=`,
    });

    if (!response.ok) {
      throw 'Gagal mengambil data.';
    }

    const data = await response.json();
    const simiMessage = data.message || 'Gagal mendapatkan respons dari Simi';
    m.reply(simiMessage);
  } catch (error) {
    console.error('Error:', error);
    m.reply(text ? 'Gagal mengambil data.' : error);
  }
}

handler.command = ['simi']
handler.tags = ['fun']
handler.help = ['simi']

export default handler
