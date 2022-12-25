import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
Type .ai <your question> for using chatGPT AI
`.trim()
  m.reply(caption)
}
handler.help = ['openai <pertanyaan>']
handler.tags = ['main']
handler.command = /^(openai)$/i
handler.limit = false
handler.register = true

export default handler

/*
want to use this cmd? you need to run another nodejs for openAI to make this work
you can fork from this link :
https://github.com/ShirokamiRyzen/Wa-OpenAI
*/
