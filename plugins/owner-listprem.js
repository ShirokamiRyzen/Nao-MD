let handler = async (m, { conn }) => {
  try {
    // Ambil data user dengan premium: true dari database
    const premiumUsers = Object.keys(db.data.users).filter(jid => db.data.users[jid].premium);

    // Konversi waktu premium ke GMT+7 dan kirim daftar premium ke grup/chat
    const premList = premiumUsers.map(jid => {
      const user = db.data.users[jid];
      const premiumTime = user.premiumTime;
      
      // Konversi waktu premium ke GMT+7
      const premiumTimeGMT7 = new Date(premiumTime + 7 * 60 * 60 * 1000);

      // Format waktu menjadi HH-MM-YYYY jam dan menit
      const formattedTime = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta' // Sesuaikan dengan zona waktu yang diinginkan
      }).format(premiumTimeGMT7);

      return `- @${jid.replace(/@.+/, '')} (Until ${formattedTime})`;
    });

    conn.reply(m.chat, `「 List Premium 」\n${premList.join('\n')}`, m, { contextInfo: { mentionedJid: premiumUsers } });
  } catch (error) {
    console.error('Error:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data premium.', m);
  }
};

handler.help = ['premlist']
handler.tags = ['owner']
handler.command = /^(listprem|premlist)$/i
handler.owner = false

export default handler
