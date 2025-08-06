import { createHash } from 'crypto'
import { getConsistentUserId } from '../lib/jid-utils.js'

let handler = async function (m, { args }) {
  if (!args[0]) throw 'Serial Number kosong'
  
  // Use consistent user ID to handle @lid issue
  const consistentUserId = getConsistentUserId(m)
  const userKey = consistentUserId || m.sender
  
  let user = global.db.data.users[userKey]
  let sn = createHash('md5').update(userKey).digest('hex')
  if (args[0] !== sn) throw 'Serial Number salah'
  user.registered = false
  m.reply('```Success Unreg !```')
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <SN|SERIAL NUMBER>')
handler.tags = ['xp']

handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler