import { join } from 'path'
import { readdirSync, statSync, unlinkSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

    const sessionsDir = join(__dirname, '../sessions')
    const filenames = []

    readdirSync(sessionsDir).forEach(file => {
        if (file !== 'creds.json') {
            filenames.push(join(sessionsDir, file))
        }
    })

    const deletedFiles = []

    filenames.forEach(file => {
        const stats = statSync(file)
        if (stats.isDirectory()) {
            // console.log(`Skipping directory: ${file}`)
        } else {
            unlinkSync(file)
            deletedFiles.push(file)
        }
    })

    conn.reply(m.chat, 'Success!', m)

    if (deletedFiles.length > 0) {
        // console.log('Deleted files:', deletedFiles)
        // conn.reply(m.chat, `Deleted files:\n${deletedFiles.join('\n')}`, m)
        conn.reply(m.chat, `Files deleted`, m)
    } else {
        conn.reply(m.chat, 'Tidak ada file yang tersisa di sessions', m)
    }
}

handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clearsession|clear)$/i
handler.rowner = true

export default handler
