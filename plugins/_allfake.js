import fs from 'fs'
import moment from 'moment-timezone'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const thumbPath = path.resolve(__dirname, '../media/thumbnail.jpg')

let handler = m => m
handler.all = async function(m) {
    const pp = await this.profilePictureUrl(m.sender, 'image').catch(e => './src/avatar_contact.png')

    global.doc = pickRandom([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/pdf"
    ])

    global.fetch = (await import('node-fetch')).default
    global.bochil = await import('@bochilteam/scraper')
    global.fs = fs

    global.ucapan = ucapan()
    global.ephemeral = '86400'

    global.adReply = {
        contextInfo: {
            forwardingScore: 256,
            isForwarded: false,
            externalAdReply: {
                title: global.ucapan,
                body: wm,
                mediaUrl: sgw,
                description: namebot,
                previewType: "PHOTO",
                thumbnail: fs.readFileSync(thumbPath),
                sourceUrl: sgw,
            }
        }
    }

    global.sig = {
        contextInfo: {
            externalAdReply: {
                title: global.ucapan,
                body: wm,
                thumbnailUrl: pp,
                sourceUrl: sig
            }
        }
    }

    global.sfb = {
        contextInfo: {
            externalAdReply: {
                title: global.ucapan,
                body: wm,
                thumbnailUrl: pp,
                sourceUrl: sfb
            }
        }
    }

    global.ftroli = {
        key: {
            remoteJid: 'status@broadcast',
            participant: '0@s.whatsapp.net'
        },
        message: {
            orderMessage: {
                itemCount: 999999999999999,
                status: 1,
                surface: 1,
                message: wm,
                orderTitle: wm,
                sellerJid: '0@s.whatsapp.net'
            }
        }
    }

    global.fkontak = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: `status@broadcast`
            } : {})
        },
        message: {
            contactMessage: {
                displayName: wm,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
                jpegThumbnail: fs.readFileSync(thumbPath),
                thumbnail: fs.readFileSync(thumbPath),
                sendEphemeral: true
            }
        }
    }

    global.fvn = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "6282127487538-1625305606@g.us"
            } : {})
        },
        message: {
            audioMessage: {
                mimetype: "audio/ogg; codecs=opus",
                seconds: "999999999999",
                ptt: "true"
            }
        }
    }

    global.ftextt = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "6282127487538-1625305606@g.us"
            } : {})
        },
        message: {
            extendedTextMessage: {
                text: wm,
                title: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }

    global.fliveLoc = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "status@broadcast"
            } : {})
        },
        message: {
            liveLocationMessage: {
                caption: "by : WH MODS DEV",
                h: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }

    global.fliveLoc2 = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "status@broadcast"
            } : {})
        },
        message: {
            liveLocationMessage: {
                title: "WH MODS DEV",
                h: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }

    global.ftoko = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "6282127487538@s.whatsapp.net"
            } : {})
        },
        message: {
            productMessage: {
                product: {
                    productImage: {
                        mimetype: "image/jpeg",
                        jpegThumbnail: fs.readFileSync(thumbPath)
                    },
                    title: wm,
                    description: "Simple Bot Esm",
                    currencyCode: "USD",
                    priceAmount1000: "20000000",
                    retailerId: "Ghost",
                    productImageCount: 1
                },
                businessOwnerJid: `0@s.whatsapp.net`
            }
        }
    }

    global.fdocs = {
        key: {
            participant: '0@s.whatsapp.net'
        },
        message: {
            documentMessage: {
                title: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }

    global.fgclink = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "0@s.whatsapp.net"
        },
        message: {
            groupInviteMessage: {
                groupJid: "6282127487538-1625305606@g.us",
                inviteCode: "null",
                groupName: "Kawan WH MODS DEV",
                caption: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }

    global.fgif = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? {
                remoteJid: "6282127487538-1625305606@g.us"
            } : {})
        },
        message: {
            videoMessage: {
                title: wm,
                h: `Hmm`,
                seconds: '999999999',
                gifPlayback: 'true',
                caption: wm,
                jpegThumbnail: fs.readFileSync(thumbPath)
            }
        }
    }
}

export default handler

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam 🌙"
    if (time >= 4) res = "Selamat pagi 🌄"
    if (time > 10) res = "Selamat siang ☀️"
    if (time >= 15) res = "Selamat sore 🌅"
    if (time >= 18) res = "Selamat malam 🌙"
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}