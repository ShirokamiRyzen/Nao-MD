// Script Ori By BochilGaming
// Ditulis Ulang Oleh ImYanXiao
// Disesuaikan Oleh ShirokamiRyzen

import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import jimp from 'jimp'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { uploadPomf } from '../lib/uploadImage.js'
const { getDevice } = (await import('@adiwajshing/baileys')).default

const defaultMenu = {
  before: `
● *Nama:*  %name 
● *Nomor:* %tag
● *Premium:* %prems
● *Limit:* %limit
● *Role:* %role

*${ucapan()} %name!*
● *Tanggal:* %week %weton
● *Date:* %date
● *Tanggal Islam:* %dateIslamic
● *Waktu:* %time

● *Nama Bot:* %me
● *Mode:* %mode
● *Prefix:* [ *%_p* ]
● *Platform:* %platform
● *Type:* Node.JS
● *Uptime:* %muptime
● *Database:* %rtotalreg dari %totalreg

⬣───「 *INFO CMD* 」───⬣
│ *Ⓟ* = Premium
│ *Ⓛ* = Limit
▣────────────⬣
  %readmore
  `.trimStart(),
    header: '╭─────『 %category 』',
    body: '  ⫸ %cmd %isPremium %islimit',
    footer: '╰–––––––––––––––༓',
    after: ``,
  }
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {

  if (m.isGroup && !global.db.data.chats[m.chat].menu) {
    throw `Admin telah mematikan menu`;
  }

  let tags = {
    'main': 'Main',
    // 'anonymous': 'Anonymous Chat',
    // 'stress': 'Stress',
    'ai': 'Ai feature',
    'memfess': 'Memfess',
    'stalk': 'Stalk',
    'downloader': 'Downloader',
    'internet': 'Internet',
    'anime': 'Anime',
    'sticker': 'Sticker',
    'tools': 'Tools',
    'group': 'Group',
    'quotes': 'Quotes',
    'maker': 'Maker Text Logo',
    'nulis': 'Nulis',
    'info': 'Info',
    'owner': 'Owner',
  }

  try {
    // DEFAULT MENU
    let dash = global.dashmenu
    let m1 = global.dmenut
    let m2 = global.dmenub
    let m3 = global.dmenuf
    let m4 = global.dmenub2

    // COMMAND MENU
    let cc = global.cmenut
    let c1 = global.cmenuh
    let c2 = global.cmenub
    let c3 = global.cmenuf
    let c4 = global.cmenua

    // LOGO L P
    let lprem = global.lopr
    let llim = global.lolm
    let tag = `@${m.sender.split('@')[0]}`
    let device = await getDevice(m.id)

    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let usrs = db.data.users[m.sender]


    /**************************** TIME *********************/
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

    let mode = global.opts['self'] || global.opts['owneronly'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium' : 'Free'}`
    let platform = os.platform()

    //---------------------

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash, m1, m2, m3, m4, cc, c1, c2, c3, c4, lprem, llim,
      ucpn, platform, wib, mode, _p, money, age, tag, name, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '16500000000@s.whatsapp.net' } : {})
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          verified: true
        }
      }
    };

    conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: text,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: wm,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnailUrl: await genProfile(conn, m),
            sourceUrl: sgc,
          }
        }, mentions: [m.sender]
      }
    }, { quoted: fkon });
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|help|\?)$/i

handler.register = true
handler.exp = 3

export default handler

//----------- FUNCTION -------

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Kak 🌄"
  }
  if (time >= 10) {
    res = "Siang Kak ☀️"
  }
  if (time >= 15) {
    res = "Sore Kak 🌇"
  }
  if (time >= 18) {
    res = "Malam Kak 🌙"
  }
  return res
}

async function genProfile(conn, m) {
  let font = await jimp.loadFont('./names.fnt'),
    mask = await jimp.read(fs.readFileSync('./src/mask.png')),
    border = await jimp.read(fs.readFileSync('./src/premium_border.png')),
    welcome = await jimp.read(thumbnailUrl.getRandom()),
    avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => fs.readFileSync('./src/avatar_contact.png'))),
    status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected',
    premiumUnixTime = global.db.data.users[m.sender].premiumTime,
    prems = `${premiumUnixTime > 0 ? 'Premium User' : 'Free User'}`;

  const gmtPlus7Time = premiumUnixTime + 7 * 60 * 60 * 1000;

  await avatar.resize(460, 460);
  await mask.resize(460, 460);
  await avatar.mask(mask);

  await welcome.resize(welcome.getWidth(), welcome.getHeight());

  await welcome.print(font, 550, 150, 'Name:');
  await welcome.print(font, 800, 150, m.pushName.slice(0, 25));
  await welcome.print(font, 550, 215, 'About:');
  await welcome.print(font, 800, 215, status);
  await welcome.print(font, 550, 280, 'Number:');
  await welcome.print(font, 800, 280, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international'));
  await welcome.print(font, 550, 400, 'Status:');
  await welcome.print(font, 800, 400, prems);

  if (premiumUnixTime > 0) {
    const gmtPlus7DateString = new Date(gmtPlus7Time).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    await border.resize(460, 460);
    await welcome.print(font, 550, 460, 'Until:');
    await welcome.print(font, 800, 460, gmtPlus7DateString);
    await welcome.composite(border, 50, 170);
  }

  await welcome.composite(avatar, 50, 170);
  const buffer = await welcome.getBufferAsync('image/png');

  const imageUrl = await uploadPomf(buffer);
  return imageUrl;
}