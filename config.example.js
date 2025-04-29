/*
Author : Shirokami Ryzen 
WA : +6285174269046
Base : Elaina-MultiDevice
Release : 22 Nov 2022
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
let wktugeneral = `${wibh}:${wibm}:${wibs}`

let d = new Date(new Date + 3600000)
let locale = 'id'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

/*============= MAIN INFO =============*/
global.pairing = '6285864034767'
global.owner = [['6285174269046', 'ShirokamiRyzen', true]]
global.mods = []
global.prems = []
global.nomorbot = '6285864034767'
global.nomorown = '6285174269046'

/*============= WATERMARK =============*/
global.readMore = readMore
global.author = 'Shirokami Ryzen'
global.namebot = 'Nao-MD ESM'
global.wm = '© Nao-MD By Shirokami Ryzen'
global.watermark = wm
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ 𝗧𝗶𝗺𝗲: ${wktuwib}`
global.bottime = `T I M E : ${wktuwib}`
global.stickpack = `Sticker Dibuat dengan ${namebot}\ngithub.com/ShirokamiRyzen\n\nNao-MD ESM\n+${nomorbot}`
global.stickauth = `© Nao-MD By Shirokami Ryzen`
global.week = `${week} ${date}`
global.wibb = `${wktuwib}`

//*============= SOSMED =============*/
global.sig = 'https://www.instagram.com/fatih_frdaus'
global.sgh = 'https://github.com/ShirokamiRyzen'
global.sgc = 'https://whatsapp.com/channel/0029Vb2qO9Q5vKAGd2t7ap1F'
global.sgw = 'https://ryzumi.vip'
global.sdc = '-'
global.sfb = 'https://www.facebook.com/Nao.Tomori.UwU'
global.snh = 'https://www.instagram.com/fatih_frdaus'

/*============= DONASI =============*/
global.qris = 'https://api.ryzumi.vip/images/qris.png'
global.psaweria = 'https://saweria.co/shirokamiryzen'


/*============= TAMPILAN =============*/
global.dmenut = 'ଓ═┅═━–〈' //top
global.dmenub = '┊↬' //body
global.dmenub2 = '┊' //body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' //footer
global.dashmenu = '┅═┅═❏ *DASHBOARD* ❏═┅═┅'
global.cmenut = '❏––––––『' //top
global.cmenuh = '』––––––' //header
global.cmenub = '┊✦ ' //body
global.cmenuf = '┗━═┅═━––––––๑\n' //footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.pmenus = '✦'
global.htki = '––––––『' // Hiasan Titile (KIRI)
global.htka = '』––––––' // Hiasan Title  (KANAN)
global.lopr = 'Ⓟ' //LOGO PREMIUM ON MENU.JS
global.lolm = 'Ⓛ' //LOGO LIMIT/FREE ON MENU.JS
global.htjava = '⫹⫺'    //hiasan Doang :v
global.hsquere = ['⛶', '❏', '⫹⫺']

/*============= RESPON =============*/
global.wait = 'Please Wait...'
global.eror = 'Error!'

global.APIs = {
    ryzen: 'https://api.ryzumi.vip',

}

global.APIKeys = {
    // 'https://website': 'apikey'
}

/*============= OTHER =============*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'

global.thumb = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg' //Main Thumbnail
global.imagebot = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg'
global.giflogo = 'https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg'
global.thumbs = ['https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg']
global.thumbnailUrl = [
    'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg'
]
global.fotonya1 = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg' //ganti jadi foto bot mu
global.fotonya2 = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg' //ini juga ganti 
global.flaaa2 = [
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.fla = [
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.hwaifu = ['https://telegra.ph/file/a7ac2b46f82ef7ea083f9.jpg']
global.thumblvlup = [
    'https://i.pinimg.com/originals/a0/34/8a/a0348ae908d8ac4ced76df289eb41e1a.jpg',
    'https://i.pinimg.com/originals/be/3b/47/be3b477371cc249e49fd0bb3284de7d7.jpg',
    'https://i.pinimg.com/originals/63/c3/37/63c337596b3391df0e72a9729ceca7b6.jpg',
    'https://i.pinimg.com/originals/db/ed/5a/dbed5afac55d266602d0ca0c67622bb9.jpg'
]

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})