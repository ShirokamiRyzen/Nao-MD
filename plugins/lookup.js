import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* ryzendesu.com`;

  if (text.includes('https://') || text.includes('http://')) throw `Tolong masukkan domain/sub domain secara lengkap. Contoh: ryzendesu.com`;

  try {
    // fetch pertama
    let api_key = 'E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv';
    let res1 = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${text}`, {
      headers: { 'X-Api-Key': api_key },
      contentType: 'application/json'
    })
    .then(response => response.text())
    .catch(error => {
      console.log(error);
      return fetch(`https://api.hackertarget.com/dnslookup/?q=${text}`)
      .then(response => response.text())
      .then(data => {
        m.reply(`*Ini Adalah Hasil Dns Lookup Untuk ${text}:*\n${data}`)
        console.log(data)
      })
      .catch(error => {
        console.error(error)
        m.reply('*Tidak dapat memproses permintaan DNS Lookup*')
      })
    })
    m.reply(`*Ini Adalah Hasil Dns Lookup Untuk ${text}:*\n${res1}`)
    console.log(res1)

  } catch (error) {
    console.log(error);
    m.reply('*Invalid data!*')
  }
}

handler.help = ['lookup']
handler.tags = ['internet']
handler.command = /^(lookup)$/i

export default handler
