import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|${namebot}|Halo.`;
    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|${namebot}|Halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';

    if (jid == m.sender) throw 'tidak bisa mengirim pesan memfess ke diri sendiri.'

    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
        let q = m.quoted ? m.quoted : m
        let media = await q.download()
        let gambar = await uploadImage(media)
        let id = + new Date
        let imagePath = `${gambar}`;
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan Memfess nih.\n\nDari: *${name}*\nPesan: \n${pesan}\n\nMau balas pesan ini kak? bisa kak. kakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim();
        await conn.sendFile(data.jid, imagePath, 'gambar.jpg', txt, m, {
            contextInfo: {
                externalAdReply: {
                    title: global.wm,
                    body: global.author,
                    sourceUrl: global.snh,
                    thumbnail: fs.readFileSync('./thumbnail.jpg')
                }
            }
        })
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        }
        await m.reply('Berhasil mengirim pesan memfess.')
        return !0;
    } catch (e) {
        console.log(e)
        return m.reply('Mana gambarnya?');
    }
}
handler.tags = ['memfess']
handler.help = ['mfs-img'].map(v => v + ' <nomor|nama pengirim|pesan>')
handler.command = /^(mfs-img|memfess-img|memfes-img|confes-img)$/i
handler.register = true
handler.private = true

export default handler