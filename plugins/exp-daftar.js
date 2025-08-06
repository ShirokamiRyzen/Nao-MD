import { createHash } from 'crypto'
import { getConsistentUserId } from '../lib/jid-utils.js'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  // Use consistent user ID to handle @lid issue
  const consistentUserId = getConsistentUserId(m)
  const userKey = consistentUserId || m.sender
  
  let user = global.db.data.users[userKey]
  if (user.registered === true) throw `Anda sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}register nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 120) throw 'Umur terlalu tua 😂'
  if (age < 16) throw 'Esempe dilarang masuk 😂'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(userKey).digest('hex')
  m.reply(`
Daftar berhasil!

╭─「 Info 」
│ Nama: ${name}
│ Umur: ${age} tahun 
╰────
Serial Number: 
${sn}

**Ketentuan Layanan (TOS) - Nao-MD ESM**
Dengan menggunakan Nao-MD ESM, Anda setuju dengan ketentuan berikut:

1. *DILARANG KERAS MERUBAH TIMER/PESAN SEMENTARA*
Bot akan secara otomatis melakukan banning terhadap nomormu, untuk unban silahkan lapor owner (+${global.nomorown}).

2. *DILARANG MENGIRIM MEDIA NSFW*
Bot akan otomatis mendeteksi media dan melakukan banning terhadap nomormu, untuk unban silahkan lapor owner (+${global.nomorown}).

3. *DILARANG SPAM NOMOR BOT*
Bot akan melakukan ban permanent jika ada indikasi spam pada nomormu.

4. *CHAT OWNER BILA PERLU*
Tidak ada gunanya chat ke nomor bot, karena nomor bot tersimpan di server dan owner tidak akan melihat chatmu.

Dengan menggunakan Nao-MD ESM, Anda setuju dengan semua ketentuan yang berlaku.

*Ketentuan ini terakhir diperbarui pada 12 Mei 2024.*

Mendaftar berarti setuju dengan ketentuan
`.trim())
}

handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')

handler.command = /^(daftar|reg(ister)?)$/i

export default handler
