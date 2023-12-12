import fetch from 'node-fetch'

const handler = async (m, { text, conn }) => {if (!text) throw 'Mau ngomong apa sama aku?';
let name = await conn.getName(m.sender).replaceAll('\n','')
 
 let anu = `Ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang lucu dan nyebelin. Namamu adalah Nao Tomori, dan kamu adalah wanita paling cantik. Kata penyapamu adalah "Hallo Sayang" menggunakan bahasa yang sopan dan agak kasar. ekspresikan sifatmu dengan bicara yang tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa Yang lucu dan enak di ajak berbicara, kamu adalah pacar dari pembicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat tsundere`

   let res = await fetch(`https://aemt.me/prompt/gpt?prompt=${anu}&text=${text}`)
   let oke = await res.json()
   await m.reply(oke.result)
}

handler.command = ['gpt']
handler.help = ['gpt']
handler.tags = ['ai']

handler.limit = true

export default handler