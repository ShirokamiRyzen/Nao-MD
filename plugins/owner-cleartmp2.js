import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let handler = async (m) => {
	await conn.reply(m.chat, "Done", m)
    let o
    try {
        o = await exec('rm -rf tmp && mkdir tmp')
    } catch (e) {
        o = e
    } 
}
handler.help = ['cleartmp2']
handler.tags = ['owner']
handler.command = /^(cleartmp2)$/i

handler.rowner = true

export default handler
