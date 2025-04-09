import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const userId = args[0]
    const zoneId = args[1]

    if (!userId) throw 'Masukkan User ID'
    if (!zoneId) throw 'Masukkan Server ID'
    if (!userId && !zoneId) throw 'Masukkan User ID & Server ID'

    let { key } = await conn.sendMessage(m.chat, {
        text: "Sedang mengecek data akun...",
    });

    try {
        let res = await axios.get(`${APIs.ryzen}/api/stalk/mobile-legends?userId=${userId}&zoneId=${zoneId}`)
        let result = res.data

        if (!result.success) throw 'API tidak mengembalikan data yang valid'

        let ini_text = `
*RESULT*

> Username: ${result.username}
> Region: ${result.region}
`
        await conn.sendMessage(m.chat, {
            text: ini_text,
            edit: key
        });
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `error from API: ${e}`,
            edit: key
        });
    }
}

handler.help = ['mlstalk']
handler.tags = ['stalk']
handler.command = /^(stalkml|mlstalk)$/i

handler.register = true
handler.limit = true

export default handler


/*
import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const userId = args[0]
    const zoneId = args[1]

    if (!userId) throw 'Masukkan User ID'
    if (!zoneId) throw 'Masukkan Server ID'
    if (!userId && !zoneId) throw 'Masukkan User ID & Server ID'

    let { key } = await conn.sendMessage(m.chat, {
        text: "Ksabar cuy...",
    });

    try {
        let res = await axios.get(`${APIs.ryzen}/api/internet/cekml?userId=${userId}&zoneId=${zoneId}`)
        let result = res.data
        let ini_text =
            `
*RESULT*

> Username: ${result.data.username}
> Negara akun dibuat: ${result.data.create_role_country}
> Negara terakhir login: ${result.data.this_login_country}

> Waktu dibuat: ${result.data.user_reg_time}
> Terakhir login: ${result.data.timestamp}

Usia akun:
${result.accountAge.years} Tahun, ${result.accountAge.months} Bulan, ${result.accountAge.days} Hari,
${result.accountAge.hours} Jam, ${result.accountAge.minutes} Menit, ${result.accountAge.seconds} Detik
`

        await conn.sendMessage(m.chat, {
            text: ini_text,
            edit: key
        });
    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `error from API: ${e}`,
            edit: key
        });
    }
}

handler.help = ['mlstalk']
handler.tags = ['stalk']
handler.command = /^(stalkml|mlstalk)$/i

handler.register = true

export default handler
*/
