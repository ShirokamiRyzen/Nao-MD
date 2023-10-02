import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import deepai from 'deepai'

deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Reply gambarnya kak (～￣▽￣)～';
  await m.reply(global.wait);
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
  let img = mime.split('/')[1];
  img = Date.now() + '.' + img;
  fs.writeFileSync(`./${img}`, await q.download());
  let form = new FormData();
  form.append('image', fs.createReadStream(`./${img}`));
  let resp = await fetch('https://api.deepai.org/api/torch-srgan', {
    method: 'POST',
    headers: {
      'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K',
    },
    body: form,
  });
  let data = await resp.json();
  await conn.sendFile(m.chat, data.output_url, 'hd.jpg', 'Ini kak hasilnyaヾ(≧▽≦*)ᴏ', m);
  fs.unlinkSync(`./${img}`);
};

handler.help = ['hd2']
handler.tags = ['ai']
handler.command = /^(hd2)$/i

handler.limit = true
handler.register = true
handler.inactive = false

export default handler