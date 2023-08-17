import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Main Site: ryzendesu.com
Mod APK: app.ryzendesu.com
KMS Activator: kms.ryzendesu.com
Rest API: api.ryzendesu.com

`.trim()
  m.reply(caption)
}
handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i
handler.limit = false

export default handler
