import fetch from 'node-fetch'
import { ryzenCDN } from '../lib/uploadFile.js'

let handler = async (m) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'No media found';

    let media = await q.download();

    let link = await ryzenCDN(media);
    if (!link) throw 'Failed to upload media';
    let fileUrl = typeof link === 'object' ? link.url : link;

    let caption = `📮 *L I N K :*
${fileUrl}
📊 *S I Z E :* ${media.length} Byte
📛 *E x p i r e d :* 24 Hours

*S H O R T :* ${await shortUrl(fileUrl)}`;

    await conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: sgh,
          mediaType: 2,
          title: wm,
          body: botdate,
          thumbnail: await (await fetch(fileUrl)).buffer(),
          sourceUrl: fileUrl,
        },
      },
    });
  } catch (error) {
    console.error('Error in handler:', error);
    conn.reply(m.chat, `Error: ${error.message || error}`, m);
  }
};

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i

handler.register = true

export default handler

async function shortUrl(url) {
  try {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('Failed to shorten URL');
    return await res.text();
  } catch (error) {
    console.error('Error in shortUrl:', error);
    return url;
  }
}