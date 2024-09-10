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
        let result = res.data.data
        let text =
        `*RESULT*
Username: ${result.username}
Negara akun asal: ${result.create_role_country}
Negara login terbaru: ${result.this_login_country}
Terakhir login: ${result.timestamp}
Login Pertama: ${result.user_reg_time}`

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
