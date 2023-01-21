/*let { MessageType } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, args, text }) => {
    conn.req = conn.req ? conn.req : {}
    if (!args || !text) return m.reply('Silahkan Masukan Teksnya')
    let lmfao = args[0]
    let bruh = (lmfao + '@s.whatsapp.net')
    let tex = args.slice(1).join(' ')
    let txt = conn.req[bruh].text || m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : text ? text : m.text
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let _text = (txt)
    conn.reply(m.chat, 'Pesan Anda sudah terkirim', m)
    conn.sendMessage(bruh, _text, MessageType.text)
    delete conn.req[bruh]
    
}
handler.help = ['balas'].map(v => v + ' [nomor] [teks]')
handler.tags = ['owner']
handler.command = /^(balas|reply)/i

handler.owner = true

handler.fail = null

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.ownreply = conn.ownreply ? conn.ownreply : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|pesan\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Halo.`;
    let [jid, pesan] = text.split('|');
    if ((!jid || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|pesan\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
    
   // if (jid == m.sender) throw 'tidak bisa mengirim pesan memfess ke diri sendiri.'
    
    let mf = Object.values(conn.ownreply).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan Dari: *Owner*\nPesan: \n${pesan}`.trim();
        await conn.sendButton(data.jid, txt, wm, null, [[' ']])
        .then(() => {
            conn.ownreply[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        m.reply('Berhasil mengirim pesan owner.');
    }
}
handler.help = ['balas'].map(v => v + ' <nomor|pesan>')
handler.tags = ['owner']
handler.command = /^(balas|reply)/i

handler.owner = true

handler.fail = null

export default handler
