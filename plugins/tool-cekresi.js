import axios from 'axios'

let handler = async (m, { conn, args }) => {
    const noResi = args[0]
    const ekspedisi = args[1] || ''

    if (!noResi) throw 'Masukkan nomor resi pengiriman.\nContoh: `.cekresi SPXID054330680586 shopee-express`'

    await conn.sendMessage(m.chat, {
        text: wait,
    });

    const ekspedisiList = {
        'shopee-express': 'SPX',
        'ninja': 'NINJA',
        'lion-parcel': 'LIONPARCEL',
        'pos-indonesia': 'POS',
        'tiki': 'TIKI',
        'acommerce': 'ACOMMERCE',
        'gtl-goto-logistics': 'GTL',
        'paxel': 'PAXEL',
        'sap-express': 'SAP',
        'indah-logistik-cargo': 'INDAH',
        'lazada-express-lex': 'LEX',
        'lazada-logistics': 'LEL',
        'janio-asia': 'JANIO',
        'jet-express': 'JETEXPRESS',
        'pcp-express': 'PCP',
        'pt-ncs': 'NCS',
        'nss-express': 'NSS',
        'grab-express': 'GRAB',
        'rcl-red-carpet-logistics': 'RCL',
        'qrim-express': 'QRIM',
        'ark-xpress': 'ARK',
        'standard-express-lwe': 'LWE',
        'luar-negeri-bea-cukai': 'BEACUKAI',
    };

    try {
        const url = `${APIs.ryzen}/api/tool/cek-resi?resi=${noResi}${ekspedisi ? `&ekspedisi=${ekspedisi}` : ''}`;
        const res = await axios.get(url);
        const result = res.data;

        if (!result.success || !result.data) {
            if (!ekspedisi) {
                const available = Object.keys(ekspedisiList).join(', ');
                throw `Gagal mendeteksi ekspedisi dari resi.\nCoba sertakan ekspedisi secara manual.\n\nContoh: \`.cekresi SPXIDxxxxxx shopee-express\`\n\nList ekspedisi:\n${available}`;
            } else {
                throw 'Resi tidak ditemukan atau salah.';
            }
        }

        const data = result.data;
        const historyText = data.history?.slice(0, 5).map((item) => `• ${item.tanggal}\n  ${item.keterangan}`).join('\n\n') || 'Tidak ada histori.';

        const infoText = `
📦 *HASIL CEK RESI*

No Resi        : ${data.resi}
Ekspedisi      : ${data.ekspedisi}
Status         : ${data.status}
Tgl Kirim      : ${data.tanggalKirim}
Posisi Akhir   : ${data.lastPosition}
CS Ekspedisi   : ${data.customerService}

🕓 *Riwayat Terbaru:*
${historyText}
`.trim();

        await conn.sendMessage(m.chat, {
            text: infoText,
        });

    } catch (e) {
        const available = Object.keys(ekspedisiList).join(', ');
        await conn.sendMessage(m.chat, {
            text: `Gagal melacak resi:\n\nCoba sertakan ekspedisi secara manual.\n\nContoh: \`.cekresi SPXIDxxxxxx shopee-express\`\n\nList ekspedisi:\n${available}`,
        });
    }
}

handler.help = ['cekresi [no_resi] [ekspedisi]']
handler.tags = ['tool']
handler.command = /^(cekresi|resi)$/i

handler.register = true
handler.limit = true

export default handler
