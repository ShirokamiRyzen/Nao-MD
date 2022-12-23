import { tiktokdl, tiktokdlv2, tiktokdlv3 } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    .catch(async _ => await tiktokdlv2(args[0]))
        .catch(async _ => await tiktokdlv3(args[0]))
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
    conn.sendFile(m.chat, url, 'tiktok.mp4', 
`
⟐⟞⟚⟝⟮ *Usᴇʀɴᴀᴍᴇ:* ⟯⟞⟚⟝⟐
┇⟣⟪ ${nickname} ⟫⟢
▥ ━┉┄┄┈┈ ▢

┇⟐⟞⟚⟝⟮ *Dᴇsᴄʀɪᴘᴛɪᴏɴ:* ⟯⟞⟚⟝⟐
▥ ━┉┄┄┈┈ ▢
${description}
◈ ━┉┈┄┈┈ ►

script : https://github.com/ShirokamiRyzen/Nao-MD
`.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i

export default handler