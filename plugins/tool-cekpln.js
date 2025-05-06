import axios from 'axios'

let handler = async (m, { conn, args }) => {
    const id = args[0]

    if (!id) throw 'Masukkan ID Pelanggan PLN Pascabayar'

    let { key } = await conn.sendMessage(m.chat, {
        text: "Sedang mengecek data PLN...",
    });

    try {
        let res = await axios.get(`${APIs.ryzen}/api/tool/cek-pln?id=${id}`)
        let result = res.data

        if (!result.success || !result.result) throw 'API tidak mengembalikan data yang valid'

        const data = result.result
        let ini_text = `
HASIL CEK PLN PASCABAYAR

ID Pelanggan    : ${data.customer_id}
Nama            : ${data.customer_name}
Daya            : ${data.power_category}
Periode         : ${data.billing_period}
Meteran         : ${data.meter_reading}
Tagihan         : ${data.outstanding_balance}
Jumlah Tagihan  : ${data.total_bills} bulan
    `.trim()

        await conn.sendMessage(m.chat, {
            text: ini_text,
            edit: key
        });

    } catch (e) {
        await conn.sendMessage(m.chat, {
            text: `Gagal mengambil data: ${e}`,
            edit: key
        });
    }
}

handler.help = ['cekpln']
handler.tags = ['tool']
handler.command = /^(pln|cekpln)$/i

handler.register = true
handler.limit = false

export default handler
