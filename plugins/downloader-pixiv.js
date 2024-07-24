import { URL_REGEX } from '@adiwajshing/baileys'
import { fileTypeFromBuffer } from 'file-type'
import { Pixiv } from '@ibaraki-douji/pixivts'

const cookies = 'login_ever=yes; novelview=______; first_visit_datetime_pc=2024-07-24%2016%3A29%3A44; p_ab_id=7; p_ab_id_2=0; p_ab_d_id=613185956; yuid_b=MwkoJpM; first_visit_datetime=2024-07-24%2016%3A29%3A54; webp_available=1; device_token=8d7fb457c52d177073023b01f09aaa00; privacy_policy_notification=0; a_type=0; cc1=2024-07-24%2016%3A31%3A15; PHPSESSID=108209481_aV2YwGKPoB2hIsrJDFrKOqURyjj6od6l; privacy_policy_agreement=7; c_type=25; b_type=0; __cf_bm=X5sYTRA0VIuEtibdHWX27t94Cak2IttzqbTlfbbqwIw-1721806422-1.0.1.1-HHmrwsGIGFc3IrcS49HIGgOfd3PlpAdP9hKADYFshe_ST8t2HguA_5PgzNg6Tq01az_oV_SOtseYJ52L.94WDd0gRk.aQa8tWlSS6Eqr8WI';
const userAgent = 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36';
const pixiv = new Pixiv();
pixiv.staticLogin(cookies, userAgent);

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Input Query / Pixiv Url'
    let res = await pixivDl(text)
    await m.reply('_In progress, please wait..._')
    for (let i = 0; i < res.media.length; i++) {
        let caption = i == 0 ? `${res.caption}\n\n*By:* ${res.artist}\n*Tags:* ${res.tags.join(', ')}` : ''
        let mime = (await fileTypeFromBuffer(res.media[i])).mime 
        await conn.sendMessage(m.chat, { [mime.split('/')[0]]: res.media[i], caption, mimetype: mime }, { quoted: m })
    }
}

handler.help = ['pixivdl <url>']
handler.tags = ['downloader']
handler.command = /^(pixivdl)$/i

handler.limit = 2
handler.register = true

export default handler

async function pixivDl(query) {
    if (query.match(URL_REGEX)) {
        if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) throw 'Invalid Pixiv Url'
        query = query.replace(/\D/g, '')
        let res = await pixiv.getIllustByID(query).catch(() => null)
        if (!res) throw `ID "${query}" not found :/`
        let media = []
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        }
    } else {
        let res = await pixiv.getIllustsByTag(query)
        if (!res.length) throw `Tag's "${query}" not found :/`
        res = res[~~(Math.random() * res.length)].id
        res = await pixiv.getIllustByID(res)
        let media = []
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        }
    }
}
