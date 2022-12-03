import moment from 'moment-timezone'
import fs from 'fs'
import fetch from 'node-fetch'
  import jimp from 'jimp'
import PhoneNumber from 'awesome-phonenumber'
let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, usedPrefix: _p, __dirname, text, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
let [number, pesan] = text.split `|`
let tag = `@${m.sender.replace(/@.+/, '')}`
  let mentionedJid = [m.sender]
let ucpn = `${ucapan()}`
let name = conn.getName(m.sender)
    if (!number) return conn.reply(m.chat, 'Silahkan masukan nomor yang akan dikirim', m)
    if (!pesan) return conn.reply(m.chat, 'Silahkan masukan pesannya', m)
    if (text > 5000) return conn.reply(m.chat, 'Teks Kepanjangan!', m)
    let flaaa2 = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']
    let user = global.db.data.users[m.sender]
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
    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `Dᴀʀɪ : ${tag}\nPesan : ${pesan}\n\n*${global.wm}*`
    let footer = wm
 /* conn.reply(korban + '@s.whatsapp.net', spam1, fgclink, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: 'https://instagram.com/_b4c00t4an_s3l3b',
    mediaType: 2, 
    description: sgc,
    title: "Join Sini Juga Cuy!",
    body: wm,
    thumbnail: fs.readFileSync('./thumbnail.jpg'),
    sourceUrl: sgc
    }}
    })*/
    conn.sendButtonImg(korban + '@s.whatsapp.net', `${pickRandom(flaaa2)}` + `${ucapan()}`, `*⟝⟖ Cʜᴀᴛ Mᴇɴғᴇss ⟕⟞*\n\n⟐⟗ Hᴀɪ Kᴀᴋ @${number.replace(/@.+/, '')},${tag} Tᴇʟᴀʜ Mᴇɴɢɪʀɪᴍ Pᴇsᴀɴ Kᴇ Kᴀᴍᴜ Mᴇʟᴀʟᴜɪ Bᴏᴛ\n➴`, spam1, 'menu', '.menu', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: 'https://instagram.com/_b4c00t4an_s3l3b',
    mediaType: 2, 
    description: sgc,
    title: "Join Sini Juga Cuy!",
    body: wm,
    thumbnail: fs.readFileSync('./thumbnail.jpg'),
    sourceUrl: sgc
    }}})
   let pp = await conn.profilePictureUrl(number + '@s.whatsapp.net', 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
  let logs = `➯ Pᴇsᴀɴ : ${pesan}`

    function _0x3269(){var _0x2980b3=['31748bRLeZk','.menu','1982138plouLs','.credit','Menu','243qkkLqy','6917316GixKwt','replace','https://instagram.com/b4c00t4an_s3l3b','chat','Owner','Bᴇʀʜᴀsɪʟ\x20Mᴇɴɢɪʀɪᴍ\x20Pᴇsᴀɴ\x20Kᴇ\x20@','./media/menfess.jpg','151830iGdbET','12115499zagxFQ','7PTzfoW','.owner','1pBtIih','3059432YMQiLg','readFileSync','130TxIRpg','send3ButtonImg','36EcNvEW','1930935ewenAE'];_0x3269=function(){return _0x2980b3;};return _0x3269();}function _0x1aa5(_0x3cfc34,_0x7656a2){var _0x3269e2=_0x3269();return _0x1aa5=function(_0x1aa5a6,_0x5904ba){_0x1aa5a6=_0x1aa5a6-0x150;var _0x2b4490=_0x3269e2[_0x1aa5a6];return _0x2b4490;},_0x1aa5(_0x3cfc34,_0x7656a2);}var _0x18b377=_0x1aa5;(function(_0x4c6b98,_0x4bc96d){var _0x3b993c=_0x1aa5,_0x518085=_0x4c6b98();while(!![]){try{var _0x26df8f=parseInt(_0x3b993c(0x153))/0x1*(-parseInt(_0x3b993c(0x15c))/0x2)+parseInt(_0x3b993c(0x15f))/0x3*(-parseInt(_0x3b993c(0x15a))/0x4)+-parseInt(_0x3b993c(0x159))/0x5+parseInt(_0x3b993c(0x160))/0x6*(-parseInt(_0x3b993c(0x151))/0x7)+parseInt(_0x3b993c(0x154))/0x8+-parseInt(_0x3b993c(0x167))/0x9*(-parseInt(_0x3b993c(0x156))/0xa)+-parseInt(_0x3b993c(0x150))/0xb*(-parseInt(_0x3b993c(0x158))/0xc);if(_0x26df8f===_0x4bc96d)break;else _0x518085['push'](_0x518085['shift']());}catch(_0x1ef043){_0x518085['push'](_0x518085['shift']());}}}(_0x3269,0xb2eff),conn[_0x18b377(0x157)](m[_0x18b377(0x163)],pp,_0x18b377(0x165)+number[_0x18b377(0x161)](/@.+/,''),logs+'\x0aScript\x20Bot\x20:https://youtube.com/channel/UCjoPsysjCn2Qa0dRalUb2mg',_0x18b377(0x15e),_0x18b377(0x15b),_0x18b377(0x164),_0x18b377(0x152),'Credit',_0x18b377(0x15d),m,{'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'mediaUrl':_0x18b377(0x162),'mediaType':0x2,'description':sgc,'title':'Jᴏɪɴ\x20Sɪɴɪ\x20Cᴜʏ','body':wm,'thumbnail':fs[_0x18b377(0x155)](_0x18b377(0x166)),'sourceUrl':sgc}}}));
}
handler.command = /^(chat|menfess|pesan)$/i

handler.fail = null
handler.limit = true

export default handler
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Sudah Dini Hari Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Lord 🌄"
  }
  if (time >= 10) {
    res = "Selamat Siang Kak ☀️"
  }
  if (time >= 15) {
    res = "Selamat Sore Kak 🌇"
  }
  if (time >= 18) {
    res = "Malam Kak 🌙"
  }
  return res
}