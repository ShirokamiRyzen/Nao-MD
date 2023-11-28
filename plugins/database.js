import fs from 'fs'
import moment from 'moment-timezone'

let handler = async (m) => {

  let totalreg = Object.keys(global.db.data.users).length
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let kon = `*Database saat ini ${totalreg} user*\n*Registrasi saat ini ${rtotalreg} user*`
  m.reply(kon)
}

handler.help = ['user']
handler.tags = ['info']
handler.command = /^(user)$/i

export default handler
