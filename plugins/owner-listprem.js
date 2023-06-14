let handler = async (m, { conn, command, args }) => {
  if (command == "listpremium") {
    let prem = global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
    let teks = `▢ *PREMIUM USERS*\n─────────────\n` + prem.map(v => '- @' + v.replace(/@.+/, '')).join`\n`
    await m.reply(teks, null, { mentions: conn.parseMention(teks) })
  } else {
    let user = Object.entries(global.db.data.users).filter(user => user[1].premiumTime).map(([key, value]) => {
      return { ...value, jid: key }
    })
    let name = '🌟 Premium'
    let premTime = global.db.data.users[m.sender].premiumTime
    let prem = global.db.data.users[m.sender].premium
    let waktu = clockString(`${premTime - new Date() * 1} `)
    let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))
    let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)

    let capt = `${htki} *PREMIUM* ${htka}
  ┌✦ *My Premium Time:*
  ┊• *Name:* ${conn.getName(m.sender)}
  ${prem ? `${clockString(premiumTime - new Date() * 1)}` : '┊• *PremiumTime:* Expired 🚫'}
  ┗━═┅═━––––––๑
  
  •·–––––––––––––––––––––·•
  ${sortedP.slice(0, len).map(({ jid, name, premiumTime, registered }, i) => `\n\n┌✦ ${registered ? name : conn.getName(jid)}\n┊• wa.me/${jid.split`@`[0]}\n${premiumTime > 0 ? `${clockString(premiumTime - new Date() * 1)}` : '┊ *EXPIRED 🚫*'}`).join`\n┗━═┅═━––––––๑`}
  ┗━═┅═━––––––๑`.trim()
    await m.reply(capt, null, { mentions: conn.parseMention(capt) })
  }
}

handler.help = ['premlist [angka]']
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
  return ['┊ ', ye, ' *Years 🗓️*\n', '┊ ', mo, ' *Month 🌙*\n', '┊ ', d, ' *Days ☀️*\n', '┊ ', h, ' *Hours 🕐*\n', '┊ ', m, ' *Minute ⏰*\n', '┊ ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
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