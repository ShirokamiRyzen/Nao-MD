import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { uploadPomf } from '../lib/uploadImage.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.ownreply = conn.ownreply ? conn.ownreply : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|pesan\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Halo.`;
    let [jid, pesan] = text.split('|');
    if ((!jid || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|pesan\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';

    //if (jid == m.sender) throw 'tidak bisa mengirim pesan memfess ke diri sendiri.'

    let mf = Object.values(conn.ownreply).find(mf => mf.status === true)
    if (mf) return !0
    try {
        let q = m.quoted ? m.quoted : m
        let media = await q.download()
        let gambar = await uploadPomf(media)
        let id = + new Date
        let imagePath = `${gambar}`;
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan Dari: *Owner*\nPesan: \n${pesan}`.trim();
        await conn.sendFile(data.jid, imagePath, 'gambar.jpg', txt, m);
        conn.ownreply[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        }
        await m.reply('Berhasil mengirim pesan dengan media.')
        return !0;
    } catch (e) {
        console.log(e)
        return m.reply('Mana gambarnya?');
    }
}
handler.help = ['balas-img'].map(v => v + ' <nomor|pesan>')
handler.tags = ['owner']
handler.command = /^(balas-img|reply-img)/i
handler.owner = true
handler.fail = null

export default handler