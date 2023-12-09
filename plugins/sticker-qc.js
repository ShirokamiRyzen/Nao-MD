import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import axios from 'axios'

const handler = async (m, { conn, text, args }) => {
   const pp = 'https://telegra.ph/file/ab2d8562be18ad26b1668.jpg';

   if (!args[0] && !m.quoted) {
       return m.reply(`Please provide a text (Type or mention a message) !`);
   }

   let userPfp;
   if (m.quoted && !text) {
       try {
           userPfp = await conn.profilePictureUrl(m.sender, "image");
       } catch (e) {
           userPfp = pp;
       }
   } else {
       try {
           userPfp = await conn.profilePictureUrl(m.sender, "image");
       } catch (e) {
           userPfp = pp;
       }
   }

   const trimtext = text.length > 50 ? text.substring(0, 50 - 3) + "..." : text;
   let trimqtext;

   if (m.quoted && m.quoted.text) {
       trimqtext = m.quoted.text.length > 50 ? m.quoted.text.substring(0, 50 - 3) + "..." : m.quoted.text;
   }

   const q = m.quoted ? m.quoted : m;
   const mime = (q.msg || q).mimetype || q.mediaType || '';
   let media, img;

   if (/image/.test(mime)) {
       img = await q.download?.();
       if (img) media = await uploadFile(img);
   }

   const tkw = !trimtext && m.quoted && m.quoted.text ? trimqtext : trimtext;
   const qwe = trimtext && m.quoted && m.quoted.text ? {
       qname: m.quoted.name,
       qtext: trimqtext
   } : {};

   try {
       const json = await axios.get(API('xzn', 'api/qc', {
           text: tkw,
           username: !trimtext && m.quoted ? m.quoted.name : m.name,
           avatar: await uploadFile(await getbuffer(userPfp)),
           ...(media ? { "media": media } : {}),
           ...qwe
       }, 'apikey'), { responseType: "arraybuffer" });

       const stiker = await sticker(json.data, global.packname, global.author);

       if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
   } catch (e) {
       console.log({ e });
       return e.toString();
   }
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler
