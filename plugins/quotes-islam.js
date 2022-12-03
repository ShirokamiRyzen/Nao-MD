import fetch from 'node-fetch'
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default
let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
let anu =`
${pickRandom(global.islam)}
`
     const message = {
            document: { url: thumb },
            jpegThumbnail: await (await fetch(thumb)).buffer(), fileName: '─────〔 QUOTE 〕─────', mimetype: dpdf, fileLength: fsizedoc, pageCount: fpagedoc,
            caption: anu,
            footer: wm,
            templateButtons: [
                {
                    urlButton: {
                        displayText: '🌎 OFFICIAL GROUP',
                        url: sgc
                    }
                },
                {
                    urlButton: {
                        displayText: '📷 FOLLOW ME',
                        url: sig
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'NEXT',
                        id: '.q-islam'
                    }
                },
            ]
        }
        conn.sendMessage(m.chat, message)
}
handler.help = ['q-islam']
handler.tags = ['quotes']
handler.command = /^(q-islam)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.islam = [
'Segala sesuatu telah Allah takdirkan. - QS. Al Qamar : 49',
'Dan sesungguhnya DIA lah yang menjadikan orang tertawa dan menangis. - QS. An Najm: 43',
'Janganlah kamu berduka cita, sesungguhnya Allah selalu bersama kita.- QS At-Taubah: 40',
'Maka sesungguhnya bersama kesulitan itu ada kemudahan.QS Al Insyirah: 5',
'Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum hingga mereka merubah keadaan yang ada pada diri mereka sendiri. - Q.S. Ar Rad: 11',
'Sesungguhnya Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya. - QS At- Tin: 4',
'Dan Kami jadikan kamu berpasang-pasangan. - QS. An-Naba: 8',
'Maka jangan sekali-kali membiarkan kehidupan dunia ini memperdayakan kamu. - QS. Fatir: 5',
'Dan bersabarlah kamu, sesungguhnya janji Allah adalah benar. - QS. Ar-Rum: 60',
'Dan barang siapa yang bertakwa kepada Allah, niscaya Allah menjadikan baginya kemudahan dalam urusannya. - Q.S At-Talaq: 4',
'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. - QS. Al-Baqarah: 286',
'Tidakkah dia menyadari bahwa sesungguhnya Allah melihat segala perbuatannya?. - QS. Al-Alaq: 14',
'Bersabarlah wahai hati kelak akan ada seseorang yang datang dan siap menemani sisa hidupmu dalam ketaatan',
'Diri kita sendiri yang bisa menentukan apakah cinta kita berbuah dosa ataukah berbuah pahala',
'Dirimu yang sebenarnya adalah apa yang kamu lakukan di saat di ada orang yang melihatmu',
'Janji Allah tak pernah mengecewakan, dan bila kamu masih meras kecewa mungkin ada yang salah dengan imanmu',
'Rasa syukur tidak akan datang kepada orang yang tidak beriman dan tidak pernah kenyang',
'Maafkan aku andai apa yang aku tulis dan aku share tentang ilmu agama tidak sesuai dengan coberku dan kehidupanku yang asli',
'Kebanyakan manusia lebih senang menyalahkan orang lain daripada menyalahkan diri sendiri',
'Biarlah orang melihat penampilah kita biasa, tetapi luar biasa di mata Allah',
'Bersyukurlah bila dalam penantianmu, kau tetap gigih dalam kesendirian, sebab artinya kau telah memuliakan jalan Allah',
'Malu akan sebuah masalah itu boleh tapi jangan berlebihan sebab jika kita Yakin Pertolongan Allah itu sangatlah nyata',
'Yakinlah bahwa ada do’a yang terus dipanjatkan kepada Allah yang tidak putus-putus dari orang tua kita agar kita senantiasa menjadi anak yang sholeh dan sholehah',
'Setiap hari aku berusaha semaksimal mungkin mencari rizki yang halal demi bisa menghalalkanmu',
'Jatuh cinta bisa jadi sangat menyakitkan jika kita tidak mampu untuk mengendalikannya',
]