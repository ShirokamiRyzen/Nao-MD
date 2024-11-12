import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw 'Masukkan text!'

  // Mendapatkan gambar brat dari API
  let res = await fetch(`https://api.ryzendesu.vip/api/sticker/brat?text=${encodeURIComponent(text)}`)
  if (!res.ok) throw 'Gagal mengambil gambar!'

  let imageBuffer = await res.buffer()

  // Menyimpan stiker menggunakan fungsi sticker (jika diperlukan)
  let stiker = await sticker(false, imageBuffer, global.stickpack, global.stickauth)

  // Mengirim gambar sebagai stiker
  conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
}

handler.help = ['brat']
handler.tags = ['sticker']
handler.command = /^(brat)$/i

handler.register = true

export default handler
