/*
import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

conn.reply(m.chat, 'Succes !', m)

const tmp = [tmpdir(), join(__dirname, '../tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    unlinkSync(file)
})
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp)$/i

handler.rowner = true

export default handler
*/
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
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp)$/i

handler.rowner = true

export default handler