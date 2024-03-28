let handler = async (m, { conn, args }) => {
  let user = Object.entries(global.db.data.users).filter(user => user[1].premiumTime).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let name = 'Premium'
  let fkon = {
    key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16500000000@s.whatsapp.net' } : {}) }, message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        verified: true
      }
    }
  }
  let premTime = global.db.data.users[m.sender].premiumTime
  let prem = global.db.data.users[m.sender].premium
  let waktu = clockString(`${global.db.data.users[m.sender].premiumTime - new Date() * 1} `)
  let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))
  let page = args[0] && /^\d+$/.test(args[0]) ? parseInt(args[0]) : 1; // Check if page number is provided and is a number
  let perPage = 10; // Number of users per page
  let startIndex = (page - 1) * perPage;
  let endIndex = startIndex + perPage;
  let usersToShow = sortedP.slice(startIndex, endIndex);

  // Calculate total number of pages
  let totalPages = Math.ceil(sortedP.length / perPage);

  await conn.reply(m.chat, `┌✦ *My Premium Time:*
┊• *Name:* ${conn.getName(m.sender)}
${prem ? `${clockString(global.db.data.users[m.sender].premiumTime - new Date() * 1)}` : '┊ *PremiumTime:* Expired'}
┗━═┅═━––––––๑

•·–––––––––––––––––––––·•
${usersToShow.map(({ jid, name, premiumTime, registered }, i) => `\n\n┌✦ ${registered ? name : conn.getName(jid)}\n┊• wa.me/${jid.split`@`[0]}\n${premiumTime > 0 ? `${clockString(premiumTime - new Date() * 1)}` : '┊ *Expired*'}`).join`\n┗━═┅═━––––––๑`}
┗━═┅═━––––––๑

*Page ${page} of ${totalPages}*`.trim(), fkon)
}

handler.help = ['premlist']
handler.tags = ['info']
handler.command = /^(listprem|premlist)$/i

export default handler

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['┊ ', ye, ' *Tahun*\n', '┊ ', mo, ' *Bulan*\n', '┊ ', d, ' *Hari*\n', '┊ ', h, ' *Jam*\n', '┊ ', m, ' *Menit*\n', '┊ ', s, ' *Detik*'].map(v => v.toString().padStart(2, 0)).join('')
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}
