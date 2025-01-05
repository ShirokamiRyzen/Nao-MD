import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
var handler = async (m, { conn, isRowner }) => {
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(resolve, 1000)
    }) * 1000
  }
  let muptime = clockString(_muptime)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })

  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  let maxim = `\`PING\`
\`\`\`${Math.round(neww - old)} ms\`\`\`
${readMore}
\`SERVER\`
\`\`\`Memory: ${format(totalmem() - freemem())} / ${format(totalmem())}\`\`\`
\`\`\`Os: ${os.platform()}\`\`\`

\`NODEJS MEMORY USAGE\`
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `\`CPU INFO\`
*${cpus[0].model.trim()} (${cpu.speed} MHZ)*\n\`\`\`${Object.keys(cpu.times).map(type => `${(type).padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%\`\`\``).join('\n\`\`\`')}

\`CPU Core(s) Usage (${cpus.length} Core CPU)\`
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`
  m.reply(maxim)
}

handler.help = ['ping', 'speed']
handler.tags = ['info']

handler.command = /^(ping|speed|info)$/i

export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
