let handler = async (m, { conn }) => {

  if (m.sender.startsWith('62') || m.sender.startsWith('+62')) {
    var txt = `
(Indonesian)
**Ketentuan Layanan (TOS) - Nao-MD ESM**
Dengan menggunakan Nao-MD ESM, Anda setuju dengan ketentuan berikut:

1. *DILARANG KERAS MERUBAH TIMER/PESAN SEMENTARA*
Bot akan secara otomatis melakukan banning terhadap nomormu, untuk unban silahkan lapor owner (+${global.nomorown}).

2. *DILARANG MENGIRIM MEDIA NSFW*
Bot akan otomatis mendeteksi media dan melakukan banning terhadap nomormu, untuk unban silahkan lapor owner (+${global.nomorown}).

3. *DILARANG SPAM NOMOR BOT*
Bot akan melakukan ban permanent jika ada indikasi spam pada nomormu.

4. *CHAT OWNER BILA PERLU*
Tidak ada gunanya chat ke nomor bot, karena nomor bot tersimpan di server dan owner tidak akan melihat chatmu.

Dengan menggunakan Nao-MD ESM, Anda setuju dengan semua ketentuan yang berlaku.

*Ketentuan ini terakhir diperbarui pada 12 Mei 2024.*
`
  } else {

    txt = `
(English)
**Term of Service (TOS) - Nao-MD ESM**
By using Nao-MD ESM, you agree to the following terms:

1. *STRICTLY PROHIBITED TO MODIFY TIMERS/TEMPORARY MESSAGES*
The bot will automatically ban your number if you attempt to modify timers/temporary messages. To request an unban, please contact the owner at (+${global.nomorown}).

2. *PROHIBITED TO SEND NSFW MEDIA*
The bot will automatically detect NSFW media and ban your number. To request an unban, please contact the owner at (+${global.nomorown}).

3. *PROHIBITED TO SPAM BOT NUMBERS*
The bot will issue a permanent ban if there is any indication of spam from your number.

4. *CONTACT OWNER WHEN NECESSARY*
There is no point in messaging the bot number directly, as it is stored on the server and the owner will not see your messages.

By using Nao-MD ESM, you agree to abide by all applicable terms.

*These terms were last updated on May 12, 2024.*
`
  }

  let name = global.author
  let fkon = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16500000000@s.whatsapp.net' } : {})
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        verified: true
      }
    }
  };

  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: txt,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://telegra.ph/file/14a7745f434cd21e900d6.jpg',
          sourceUrl: 'https://www.instagram.com/ryzen_vermillion',
        }
      }, mentions: [m.sender]
    }
  }, { quoted: fkon });
}

handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules|tos|peraturan)$/i

export default handler
