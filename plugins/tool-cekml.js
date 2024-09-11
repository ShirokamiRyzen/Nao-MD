import axios from 'axios'

let handler = async (m, { conn, args }) => {

    const userId = args[0]
    const zoneId = args[1]

    if (!userId) throw 'Masukkan User ID'
    if (!zoneId) throw 'Masukkan Server ID'
    if (!userId && !zoneId) throw 'Masukkan User ID & Server ID'

    m.reply(wait)

    try {
        let res = await axios.get(`https://api.ryzendesu.vip/api/internet/cekml?userId=${userId}&zoneId=${zoneId}`)
        let result = res.data
        let text =
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

        conn.reply(m.chat, text, m)
    } catch (e) {
        conn.reply(m.chat, `Error from API: ${e}`, m)
    }    
}

handler.help = ['cekml <id> <server>']
handler.tags = ['tools']
handler.command = /^(cekml|checkml|mlcheck)$/i

handler.register = true

export default handler
