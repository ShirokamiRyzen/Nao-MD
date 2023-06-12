import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 Owner Website 」*

Main Site: ryzendesu.com
KMS Activator: kms.ryzendesu.com
Cloud: cloud.ryzendesu.site

`.trim()
  m.reply(caption)
}
handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i
handler.limit = false

export default handler
