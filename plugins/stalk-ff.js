import axios from 'axios'

let handler = async (m, { conn, args }) => {
    const userId = args[0]

    if (!userId) throw 'Masukkan User ID'

    let { key } = await conn.sendMessage(m.chat, {
        text: "Sedang mengecek data akun...",
    })

    try {
        let res = await axios.get(`${APIs.ryzumi}/api/stalk/freefire?userId=${userId}`)
        let result = res.data

        if (!result.name) throw 'API tidak mengembalikan data yang valid'

        let equippedItemsText = ''
        if (result.equippedItems && Array.isArray(result.equippedItems)) {
            equippedItemsText = result.equippedItems
                .map((item, index) => `${index + 1}. ${item.name}`)
                .join('\n')
        }

        let ini_text = `
*MAIN INFORMATIONS*
> Name: ${result.name}
> Bio: ${result.bio}
> Like: ${result.like}
> Level: ${result.level}
> Exp: ${result.exp}
> Region: ${result.region}
> Honor Score: ${result.honorScore}
> BR Rank: ${result.brRank} (${result.brRankPoint})
> CS Rank Point: ${result.csRankPoint}
> Account Created: ${result.accountCreated}
> Last Login: ${result.lastLogin}
> Prefer Mode: ${result.preferMode}
> Language: ${result.language}
> Booyah Pass Level: ${result.booyahPassLevel}

*PET INFORMATION*
> Name: ${result.petInformation.name}
> Level: ${result.petInformation.level}
> Exp: ${result.petInformation.exp}
> Star Marked: ${result.petInformation.starMarked}
> Selected: ${result.petInformation.selected}

*EQUIPPED ITEMS*
${equippedItemsText}
        `

        await conn.sendMessage(m.chat, {
            text: ini_text,
            edit: key
        })
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `error from API: ${e}`,
            edit: key
        })
    }
}

handler.help = ['ffstalk']
handler.tags = ['stalk']
handler.command = /^(stalkff|ffstalk)$/i

handler.register = true
handler.limit = true

export default handler
