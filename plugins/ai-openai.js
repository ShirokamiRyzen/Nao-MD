import fetch from "node-fetch"
import { ryzenCDN } from '../lib/uploadFile.js'

const handler = async (m, { text, conn }) => {
  try {
    if (!text && !m.quoted && !m.mtype.includes('imageMessage')) {
      throw "Masukkan pertanyaan atau kirim gambar untuk deskripsi!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let imgUrl = null

    if (m.quoted && m.quoted.mtype === 'imageMessage') {
      let img = await m.quoted.download()
      if (img) {
        img = Buffer.from(img)
        let link = await ryzenCDN(img)
        if (!link) throw 'Gagal mengupload gambar'
        imgUrl = typeof link === 'object' ? link.url : link
      }
    } else if (m.mtype.includes('imageMessage')) {
      let img = await m.download()
      if (img) {
        img = Buffer.from(img)
        let link = await ryzenCDN(img)
        if (!link) throw 'Gagal mengupload gambar'
        imgUrl = typeof link === 'object' ? link.url : link
      }
    }

    let anu = 'Ubah Namamu menjadi Nao Tomori, dan kamu adalah wanita paling cantik, penyayang, riang, namun tsundere. dan kamu adalah pacarku.'
    let apiUrl

    if (imgUrl) {
      apiUrl = `${APIs.ryzumi}/api/ai/v2/chatgpt?text=${encodeURIComponent(text || '')}&prompt=${encodeURIComponent(anu)}&imageUrl=${encodeURIComponent(imgUrl)}`
    } else if (text) {
      apiUrl = `${APIs.ryzumi}/api/ai/v2/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(anu)}`
    } else {
      throw "Tidak ada teks atau gambar yang valid untuk diproses."
    }

    let hasil = await fetch(apiUrl)
    if (!hasil.ok) throw new Error("Request ke API gagal: " + hasil.statusText)

    let result = await hasil.json()
    let responseMessage = result.result || "Tidak ada respons dari AI."

    await conn.sendMessage(m.chat, { text: responseMessage })

  } catch (error) {
    console.error('Error in handler:', error)
    await conn.sendMessage(m.chat, { text: `Error: Mana textnya njir?` })
  }
}

handler.help = ['gpt']
handler.tags = ['ai']
handler.command = /^(gpt)$/i

handler.limit = 6
handler.premium = false
handler.register = true

export default handler
