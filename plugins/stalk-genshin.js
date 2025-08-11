import axios from 'axios'

function fmtNum(n) {
    if (n === null || n === undefined) return '-'
    const v = Number(n)
    return Number.isNaN(v) ? String(n) : v.toLocaleString('en-US')
}

let handler = async (m, { conn, text }) => {
    const uid = (text || '').replace(/\D+/g, '')
    if (!uid) throw `Enter a valid Genshin UID!\nExample: .genshinstalk 819226311`

    m.reply(wait)

    try {
        const { data } = await axios.get(`${APIs.ryzumi}/api/stalk/genshin?userId=${uid}`, {
            headers: { accept: 'application/json' }
        })

        if (!data || !data.meta) throw new Error('Data not found!')

        const meta = data.meta || {}
        const abyss = meta.spiralAbyss || {}
        const theater = meta.theater || {}
        const stygian = meta.stygian || {}
        const previews = Array.isArray(meta.charactersPreview) ? meta.charactersPreview : []

        let caption = `乂  G E N S H I N  —  S T A L K E R

╭─❒ Profile
│◦ UID        : ${meta.uid ?? uid}
│◦ Nickname   : ${meta.nickname || '-'}
│◦ Signature  : ${meta.signature || '-'}
│◦ Level      : ${fmtNum(meta.level)}
│◦ World Lv   : ${fmtNum(meta.worldLevel)}
│◦ Achievements: ${fmtNum(meta.achievements)}
│◦ Enka URL   : ${meta.enkaUrl || '-'}
╰──────

╭─❒ Visibility
│◦ Show Details    : ${meta.showCharacterDetails ? 'Yes' : 'No'}
│◦ Show Constell.  : ${meta.showConstellationPreview ? 'Yes' : 'No'}
╰──────

╭─❒ Spiral Abyss
│◦ Floor/Chamber : ${fmtNum(abyss.floor)}/${fmtNum(abyss.chamber)}
│◦ Stars         : ${fmtNum(abyss.stars)}
╰──────

╭─❒ Imaginarium Theater
│◦ Act   : ${fmtNum(theater.act)}
│◦ Stars : ${fmtNum(theater.stars)}
│◦ Mode  : ${theater.mode ?? '-'}
╰──────

╭─❒ Stygian
│◦ Difficulty : ${fmtNum(stygian.difficulty)}
│◦ Clear Time : ${fmtNum(stygian.clearTime)}s
╰──────`

        if (previews.length) {
            const maxList = Math.min(previews.length, 12)
            caption += `\n\n╭─❒ Characters Preview (${previews.length})`
            for (let i = 0; i < maxList; i++) {
                const c = previews[i] || {}
                caption += `\n│${String(i + 1).padStart(2, ' ')}. Lv${fmtNum(c.level)} C${fmtNum(c.constellation ?? 0)} - ${c.element || '-'} — ${c.costumeName || '-'}`
            }
            if (previews.length > maxList) {
                caption += `\n│… and ${previews.length - maxList} more`
            }
            caption += `\n╰──────`
        }

        const good = data.good || {}
        const chars = Array.isArray(good.characters) ? good.characters : []
        const arts = Array.isArray(good.artifacts) ? good.artifacts : []
        const weaps = Array.isArray(good.weapons) ? good.weapons : []

        caption += `

╭─❒ GOOD Summary
│◦ Characters : ${fmtNum(chars.length)}
│◦ Artifacts  : ${fmtNum(arts.length)}
│◦ Weapons    : ${fmtNum(weaps.length)}
╰──────

🔗 Enka: ${meta.enkaUrl || 'N/A'}
Done~ (*/ω\\*) ✨`

        await conn.sendMessage(m.chat, { text: caption }, { quoted: m })

        // Send JSON file for full details
        try {
            const jsonBuf = Buffer.from(JSON.stringify(data, null, 2))
            await conn.sendFile(
                m.chat,
                jsonBuf,
                `genshin_${meta.uid ?? uid}.json`,
                `Full details are in the attached JSON file.`,
                m
            )
        } catch { }

    } catch (err) {
        console.error(err)
        m.reply(`Error: ${err?.message || err}`)
    }
}

handler.help = ['genshinstalk']
handler.tags = ['stalk']
handler.command = /^(genshinstalk|gistalk)$/i

handler.register = true
handler.limit = true

export default handler
