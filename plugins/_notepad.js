let handler = async(m, {conn, command, usedPrefix, text}) => {
  let fail = 'format salah, example: ' +usedPrefix+command+ ' Menggulingkan Megawati|1. Cari-'
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  let catatan = global.db.data.users[m.sender].catatan
  let split = text.split('|')
  let title = split[0]
  let isi = split[1]
  if (catatan.includes(title)) return m.reply('Judul tidak tersedia!\n\nAlasan: Sudah digunakan')
  if (!title || !isi) return m.reply(fail)
  let cttn = {
    'title': title,
    'isi': isi
  }
  global.db.data.users[m.sender].catatan.push(cttn)
  conn.reply(m.chat, `Catatan berhasil dibuat!\nUntuk melihat catatan. Ketik: ${usedPrefix}viewnote`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['notepad <title|isi>']
handler.tags = ['internet']
handler.command = /^(notepad)$/i
handler.limit = false
handler.register = true

export default handler