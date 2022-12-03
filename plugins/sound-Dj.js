import { sticker } from '../lib/sticker.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'), thumbnail: fs.readFileSync('./thumbnail.jpg'),sendEphemeral: true}}}

//m.reply(`Wait ${command} sedang proses🐦`)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let stiker = await sticker(null, global.API(`https://telegra.ph/file/d34b2ab2cb233c749776c.png`), global.packname, global.author)
 conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null, { fileLength: 100, contextInfo: {
          externalAdReply :{
          showAdAttribution: true,
    mediaUrl: sgc,
    mediaType: 2,
    description: 'Ryzn', 
    title: `${command} Sedang Di Proses`,
    body: botdate,
    thumbnail: await(await fetch(pp)).buffer(),
    sourceUrl: sgc
     }}
  })
  
let audio = `https://raw.githubusercontent.com/Aisyah-Aldi/Sound/main/${command}.mp3`

await conn.sendFile(m.chat, audio, 'error.mp3', null, fkontak, true, {
type: 'audioMessage', 
ptt: false, seconds: 0,contextInfo: {
         externalAdReply: { showAdAttribution: true,
 mediaUrl: 'www.instagram.com/ryzen_vermillion',
    mediaType: 2, 
    description: 'www.instagram.com/ryzen_vermillion',
    title: "Now Playing...",
    body: wm,
    thumbnail: await (await fetch('https://telegra.ph/file/c72133b197a68d3ea514d.jpg')).buffer(),
    sourceUrl: 'www.instagram.com/hyuura-official'
 	  /*   sourceUrl: sig,
           title: '◄⟬ ●━━━ ⧏ ⧎ ⧐ ━━━● ⟭►',  
            body: 'Now Playing...', 
           thumbnail: await (await fetch('https://telegra.ph/file/c72133b197a68d3ea514d.jpg')).buffer()*/
}
     }
    })
}
/*fgclink, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: sig,
    mediaType: 2, 
    description: sgc,
    title: "Join Sini Juga Cuy!",
    body: wm,
    thumbnail: thm,
    sourceUrl: sgc
     }}
  })*/
handler.command = /^(sound1|sound2|sound3|sound4|sound5|sound6|sound7|sound8|sound9|sound10|sound11|sound12|sound13|sound14|sound15|sound16|sound17|sound18|sound19|sound20|sound21|sound22|sound23|sound24|sound25|sound26|sound27|sound28|sound29|sound30|sound31|sound32|sound33|sound34|sound35|sound36|sound37|sound38|sound39|sound40|sound41|sound42|sound43|sound44|sound45|sound46|sound47|sound48|sound49|sound50|sound51|sound52|sound53|sound54|sound55|sound56|sound57|sound58|sound59|sound60sound61|sound62|sound63|sound64|sound65|sound66|sound67|sound68|sound69|sound70|sound71|sound72|sound73|sound74|sound75|sound76|sound77|sound78|sound79|sound80|sound81|sound82|sound83|sound84|sound85|sound86|sound87|sound88|sound89|sound90|sound91|sound92|sound93|sound94|sound95|sound96|sound97|sound98|sound99|sound100|sound101|sound102|sound103|sound104|sound105|sound106|sound107|sound108|sound109|sound110|sound111|sound112|sound113|sound114|sound115|sound116|sound117|sound118|sound119)$/i
handler.owner = false
export default handler
let stikerhuuu = [
 "https://telegra.ph/file/fa2bbea0f7de2575cf027.png",//patrick huu
 "https://telegra.ph/file/4a2db7bc9f3f9ecfc007d.png",//anime yntkts
 "https://telegra.ph/file/5f6079714851d9927697e.png",//windah bocil
 "https://telegra.ph/file/d5100b4ce95a0012e88c1.png",//patrick bawa minum
 "https://telegra.ph/file/2ade25087c89f86587853.png",//pak polisi pap tt
 "https://telegra.ph/file/eb2b5e5fff569896c1639.png",//kucing1
 "https://telegra.ph/file/bd8a0e7ea01218531798b.png",//kacamata
 "https://telegra.ph/file/300610838ffa0e6576eb9.png",//patrick pembohong
 "https://telegra.ph/file/954afe562e58c144620ae.png",//spongebob FBI
 "https://telegra.ph/file/72026dcc46e4cb4b6f9ae.png",//mazowski monster inc
 "https://telegra.ph/file/aa9f1bea869e362e6f56e.png",//wkwk
 "https://telegra.ph/file/09bbff0da316ba21b4f8e.png",//kucing2
 "https://telegra.ph/file/2e0637d57e3cc1abcb4a0.png",//patrick anak setan
 "https://telegra.ph/file/d771ae015b5486859d03f.png",//mazowski 2
 "https://telegra.ph/file/9c7606f571c05b4d0c941.png",//hengker
 "https://telegra.ph/file/84fd937257bcd614d6c9e.png",//anjing
 "https://telegra.ph/file/b8ba6989c00c50df049d0.png",//bapak bapak lovee
 "https://telegra.ph/file/2f618fffab6ff7bea32ab.png",//abang saleh
 "https://telegra.ph/file/dfbf483c209a31f01b4e5.png"//hengker2
]
