import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import deepai from 'deepai';

deepai.setApiKey(`${global.deepai}`);

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Gambarnya mana? (～￣▽￣)～';
  await m.reply(global.wait);
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
  let img = mime.split('/')[1]
  img = Date.now() + '.' + img
  fs.writeFileSync(`./${img}`, await q.download());
  let form = new FormData()
  form.append('image', fs.createReadStream(`./${img}`));
  let resp = await fetch('https://api.deepai.org/api/torch-srgan', {
    method: 'POST',
    headers: {
      'api-key': `${global.deepai}`,
    },
    body: form,
  })
  let data = await resp.json()
  await conn.sendFile(m.chat, data.output_url, 'hd.jpg', 'Ini kak hasilnyaヾ(≧▽≦*)ᴏ', m)
  fs.unlinkSync(`./${img}`)
}

handler.help = ['hd <caption|reply media>']
handler.tags = ['tools', 'ai']
handler.command = /^(hd|upscale)$/i

export default handler