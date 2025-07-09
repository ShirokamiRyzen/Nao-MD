async function handler(m, { text }) {
    this.anonymous = this.anonymous ? this.anonymous : {}
    let sender = m.sender
    let room = Object.values(this.anonymous).find(room => room.check(sender))
    if (!room) throw 'kamu tidak berada di anonymous chat'
    let other = room.other(sender)
    let tks = `➔ Nomor: ${sender.split`@`[0]}
➔ Nama: ${this.getName(sender)}`
    this.reply(m.chat, 'Sedang Menggirimkan Kontak...')
    if (other) this.reply(other, `Partner mengirimkan kontak kepadamu`)
    if (other) this.sendFile(other, await this.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png'), '', `${htki} Anonymous Chat ${htka}\n` + tks)
}

handler.help = ['sendkontak']
handler.tags = 'anonymous'
handler.command = /^(sendkontak)$/i
handler.private = true

export default handler