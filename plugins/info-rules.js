let handler = async (m, { conn }) => {

  if (m.sender.startsWith('62') || m.sender.startsWith('+62')) {
    var txt = `
(Indonesian)
**Ketentuan Layanan (TOS) - Nao-MD ESM**
Dengan menggunakan Nao-MD ESM, Anda setuju dengan ketentuan berikut:

1. **Penafian Tanggung Jawab:**
   Sebagai pengembang Nao-MD ESM, saya sebagai developer (${global.author}) tidak bertanggung jawab atas penggunaan Nao-MD ESM oleh pengguna, dalam bentuk atau cara apapun. Pengguna sepenuhnya bertanggung jawab atas tindakan mereka saat menggunakan layanan ini.

2. **Tanpa Jaminan:**
   Nao-MD ESM disediakan "sebagaimana adanya" tanpa jaminan apa pun, baik secara tersurat maupun tersirat. Saya tidak menjamin akurasi, kehandalan, atau kesesuaian layanan untuk tujuan tertentu.

3. **Risiko Penggunaan:**
   Pengguna mengakui bahwa penggunaan Nao-MD ESM dapat melibatkan risiko, dan mereka setuju untuk menggunakan layanan ini atas risiko mereka sendiri. Saya tidak bertanggung jawab atas konsekuensi yang timbul dari penggunaan layanan ini.

4. **Perubahan Ketentuan:**
   Saya berhak mengubah atau merevisi ketentuan ini kapan saja. Pengguna bertanggung jawab untuk memeriksa ketentuan ini secara berkala untuk pembaruan.

Dengan menggunakan Nao-MD ESM, Anda menunjukkan penerimaan Anda terhadap ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, harap hindari penggunaan Nao-MD ESM.

Untuk pertanyaan atau kekhawatiran, hubungi saya di (+${global.nomorown}).

*Ketentuan ini terakhir diperbarui pada 26 Desember 2023.*
`
  } else {

    txt = `
(English)
**Term of Service (TOS) - Nao-MD ESM**
By using Nao-MD ESM, you agree to the following terms:

1. **Disclaimer of Liability:**
   As the developer of Nao-MD ESM, I as developer (${global.author}) do not assume any responsibility or liability for the usage of Nao-MD ESM by any user, in any form or manner. Users are solely responsible for their actions while using this service.

2. **No Warranty:**
   Nao-MD ESM is provided "as is" without any warranty of any kind, either expressed or implied. I do not guarantee the accuracy, reliability, or suitability of the service for any purpose.

3. **Usage Risks:**
   Users acknowledge that the use of Nao-MD ESM may involve risks, and they agree to use it at their own discretion. I am not responsible for any consequences resulting from the use of this service.

4. **Changes to Terms:**
   I reserve the right to modify or revise these terms at any time. Users are responsible for checking these terms regularly for updates.

By using Nao-MD ESM, you indicate your acceptance of these terms. If you do not agree with these terms, please refrain from using Nao-MD ESM.

For any inquiries or concerns, please contact me at (${global.nomorown}).

*This TOS was last updated on 26 December 2023.*
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
