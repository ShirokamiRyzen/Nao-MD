import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  let args = text.trim().split(' ');

  let month = args[0] ? parseInt(args[0]) : new Date().getMonth() + 1;
  let year = args[1] ? parseInt(args[1]) : new Date().getFullYear();

  if (month < 1 || month > 12) {
    return await conn.sendMessage(m.chat, { text: 'Bulan harus berupa angka antara 1 - 12!' }, { quoted: m });
  }

  if (isNaN(year)) {
    return await conn.sendMessage(m.chat, { text: 'Tahun harus berupa angka yang valid!' }, { quoted: m });
  }

  try {
    let url = `${APIs.ryzumi}/api/image/calendar?month=${month}&year=${year}`;

    let res = await fetch(url);
    if (!res.ok) throw `Gagal mengambil gambar dari API! Status: ${res.status}`;

    let gambar = await res.buffer();
    let pesan = `Kalender Bulan: ${month}, Tahun: ${year}`;

    await conn.sendMessage(m.chat, { image: gambar, caption: pesan }, { quoted: m });

  } catch (err) {
    await conn.sendMessage(m.chat, { text: `Error: ${err.message || 'Gagal mengambil gambar.'}` }, { quoted: m });
  }
};

handler.help = ['calendar'];
handler.tags = ['internet'];
handler.command = /^(calendar|kalender)$/i;

handler.register = true

export default handler
