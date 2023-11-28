import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import fetch from 'node-fetch'
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/video/g.test(mime)) {
      // Jalankan kode untuk video di sini
      if ((q.msg || q).seconds > 10) return m.reply('Maksimal 10 detik')
      let img = await q.download?.()
      if (!img) throw `Balas video dengan *${usedPrefix + command}*`
      let stiker = false
      try {
        stiker = await sticker(img, false, global.stickpack, global.stickauth)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          let out = await uploadFile(img)
          stiker = await sticker(false, out, global.stickpack, global.stickauth)
        }
      }
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null)
    } else if (/image/g.test(mime)) {
      // Jalankan kode untuk gambar di sini
      let [packname, ...author] = args.join` `.split`|`
      author = (author || []).join`|`
      let img = await q.download?.()
      let stiker = false
      try {
        stiker = await addExif(img, packname || '', author || '')
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          stiker = await createSticker(img, false, packname, author)
        }
      }
      m.reply(stiker)
    } else {
      m.reply('Jenis media tidak dikenal')
    }
  } catch (e) {
    console.error(e)
    m.reply('Terjadi kesalahan')
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

async function createSticker(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: 'full',
    pack: stickpack,
    author: stickauth,
    quality
  }
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

async function mp4ToWebp(file, stickerMetadata) {
  if (stickerMetadata) {
    if (!stickerMetadata.pack) stickerMetadata.pack = stickpack
    if (!stickerMetadata.author) stickerMetadata.author = stickauth
    if (!stickerMetadata.crop) stickerMetadata.crop = false
  } else if (!stickerMetadata) {
    stickerMetadata = { pack: stickpack, author: stickauth, crop: false }
  }
  let getBase64 = file.toString('base64')
  const Format = {
    file: `data:video/mp4;base64,${getBase64}`,
    processOptions: {
      crop: stickerMetadata?.crop,
      startTime: '00:00:00.0',
      endTime: '00:00:7.0',
      loop: 0
    },
    stickerMetadata: {
      ...stickerMetadata
    },
    sessionInfo: {
      WA_VERSION: '2.2106.5',
      PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
      WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11',
      BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190',
      OS: 'Windows Server 2016',
      START_TS: 1614310326309,
      NUM: '6247',
      LAUNCH_TIME_MS: 7934,
      PHONE_VERSION: '2.20.205.16'
    },
    config: {
      sessionId: 'session',
      headless: true,
      qrTimeout: 20,
      authTimeout: 0,
      cacheEnabled: false,
      useChrome: true,
      killProcessOnBrowserClose: true,
      throwErrorOnTosBlock: false,
      chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
      ],
      executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
      skipBrokenMethodsCheck: true,
      stickerServerEndpoint: true
    }
  }
  let res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(Format)
  })
  return Buffer.from((await res.text()).split(';base64,')[1], 'base64')
}
