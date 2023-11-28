import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, usedPrefix, command }) => {
   let text
   if (args.length >= 1) {
      text = args.slice(0).join(" ");
   } else if (m.quoted && m.quoted.text) {
      text = m.quoted.text
   } else throw "Mana teksnya?"
   if (!text) return m.reply('Mana teksnya?')
   const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
   const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
   const orang = text.replace(mentionRegex, '');
   const pp = await conn.profilePictureUrl(who).catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
   const number = await conn.getName(who)
   const obj = { "type": "quote", "format": "png", "backgroundColor": "#000000", "width": 1024, "height": 1024, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": `${who?.name || number}`, "photo": { url: `${pp}` } }, "text": orang, "replyMessage": {} }] };
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } });
   const buffer = Buffer.from(json.data.result.image, 'base64');
   let stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
   if (stiker) return conn.sendFile(m.chat, stiker, 'qc.webp', '', m);
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler