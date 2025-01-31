import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text || !text.trim()) throw '⚠️ Masukkan nomor telepon yang valid!';

  try {
    let url = `https://api.ryzendesu.vip/api/stalk/get-contact?number=${encodeURIComponent(text.trim())}`;
    let res = await fetch(url);
    if (!res.ok) throw `❌ Gagal mengambil data dari API! Status: ${res.status}`;

    let json = await res.json();
    if (!json.result) throw '❌ Tidak ada data yang ditemukan untuk nomor tersebut.';

    let { name, phone, provider } = json.result.userData;
    let tags = json.result.tags || [];
    let message = `
📞 *Informasi Kontak* 📞
━━━━━━━━━━━━━━━━━━━
👤 *Nama*: ${name}
📱 *Nomor*: ${phone}
🌐 *Provider*: ${provider}

🏷️ *Tags*:
${tags.length ? tags.map(tag => `- ${tag}`).join('\n') : 'Tidak ada tag.'}
    `.trim();

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (err) {
    await conn.sendMessage(m.chat, { text: `❌ Error: ${err.message || 'Gagal mengambil data.'}` }, { quoted: m });
  }
};

handler.help = ['getcontact <nomor>']
handler.tags = ['tools']
handler.command = /^(getcontact|stalkcontact)$/i

export default handler
