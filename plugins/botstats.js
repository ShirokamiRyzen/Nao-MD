import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, generateWAMessageFromContent, }) => {
    let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw, statusupdate, autogetmsg, antivirus, publicjoin } = global.db.data.settings[conn.user.jid]
    const chats = Object.keys(await conn.chats)
    const groups = Object.keys(await conn.groupFetchAllParticipating())
    const block = await conn.fetchBlocklist()
    const fgclink = {
           "key": {
               "fromMe": false,
               "participant": "0@s.whatsapp.net",
               "remoteJid": "0@s.whatsapp.net"
           },
           "message": {
               "groupInviteMessage": {
                   "groupJid": "6282127487538-1625305606@g.us",
                   "inviteCode": "null",
                   "groupName": "Halo", 
                   "caption": wm, 
                   'jpegThumbnail': fs.readFileSync('./media/ok.jpg')
               }
           }
       }
       let tag = `@${m.sender.replace(/@.+/, '')}`
  let mentionedJid = [m.sender]
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let sts = `┌────〔 Status 〕───⬣
│✧  Aktif selama ${uptime}
│✧  *${groups.length}* Grup
│✧  *${chats.length - groups.length}* Chat Pribadi
│✧  *${Object.keys(global.db.data.users).length}* Pengguna
│✧  ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* Diblokir'}
│✧  *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
│✧  *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
╰────────────⬣

┌───〔 Pengaturan 〕───⬣
│✧  ${anon ? '✅' : '❌'} *Anon Chat*
│✧  ${anticall ? '✅' : '❌'} *Anti Call*
│✧  ${antispam ? '✅' : '❌'} *Anti Spam*
│✧  ${antitroli ? '✅' : '❌'} *Anti Troli*
│✧  ${backup ? '✅' : '❌'} *Auto Backup DB*
│✧  ${groupOnly ? '✅' : '❌'} *Mode Grup*
│✧  ${jadibot ? '✅' : '❌'} *Jadi Bot*
│✧  ${nsfw ? '✅' : '❌'} *Mode Nsfw*
╰────────────⬣`

conn.sendButtonDoc(m.chat, '▷ʙᴏᴛ sᴛᴀᴛᴜs◁', sts, 'Owner', '.owner', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: 'https//wa.me/6281361281833?text=Hᴀʟᴏ+ɢᴀɴᴛᴇɴɢᴋᴜ',
    mediaType: 2, 
    description: 'wa.me/6281361281833?text=Hᴀʟᴏ+ɢᴀɴᴛᴇɴɢᴋᴜ',
    title: "Iɴɪ Fᴀᴄᴇʙᴏᴏᴋ Gᴡ!",
    body: wm,
    thumbnail: fs.readFileSync('./thumbnail.jpg'),
    sourceUrl: 'https://facebook.com/sadtime098'
     }}
  })

}
handler.help = ['botstatus']
handler.tags = ['info']
handler.command = /^botstat(us)?$/i

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
