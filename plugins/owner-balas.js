import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

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
        await conn.reply(data.jid, txt, m, { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: global.snh, thumbnail: fs.readFileSync('./thumbnail.jpg') }}})
        .then(() => {
            m.reply('Berhasil mengirim pesan.')
            conn.ownreply[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        return m.reply('Error');
    }
}
handler.help = ['balas'].map(v => v + ' <nomor|pesan>')
handler.tags = ['owner']
handler.command = /^(balas|reply)/i

handler.owner = true

handler.fail = null

export default handler
