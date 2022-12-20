import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
Tunggu coy
`.trim()
  m.reply(caption)
}
handler.help = ['openai <pertanyaan>']
handler.tags = ['main']
handler.command = /^(openai)$/i
handler.limit = false
handler.register = true

export default handler
