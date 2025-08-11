import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
  m.reply(wait)

  try {
    const { data } = await axios.get(`${APIs.ryzumi}/api/tool/growagarden`)
    const garden = data.data

    let teks = `🌼 *Grow a Garden Inventory* 🌼\n\n`

    const formatItem = (item) => {
      let time = moment(item.lastUpdated).tz('Asia/Jakarta').format('DD MMM YYYY, HH:mm:ss') + ' WIB'
      return `• ${item.name} (${item.quantity})\n  ↳ Available: ${item.available ? '✅' : '❌'} | Updated: ${time}\n`
    }

    // Seeds
    teks += `🌱 *Seeds*\n`
    garden.seeds.forEach(s => {
      teks += formatItem(s)
    })

    // Gear
    teks += `\n🧰 *Gear*\n`
    garden.gear.forEach(g => {
      teks += formatItem(g)
    })

    // Eggs
    teks += `\n🥚 *Eggs*\n`
    garden.eggs.forEach(e => {
      teks += formatItem(e)
    })

    // Cosmetics
    teks += `\n🎀 *Cosmetics*\n`
    garden.cosmetics.forEach(c => {
      teks += formatItem(c)
    })

    // Honey Items
    teks += `\n🍯 *Event/Honey Items*\n`
    garden.honey.forEach(h => {
      teks += formatItem(h)
    })

    // Weather
    let weather = garden.weather
    teks += `\n⛅ *Cuaca Sekarang:* ${weather.type.toUpperCase()}\n`
    weather.effects.forEach(eff => {
      teks += `- ${eff}\n`
    })
    let weatherUpdated = moment(weather.lastUpdated).tz('Asia/Jakarta').format('DD MMM YYYY, HH:mm:ss') + ' WIB'
    teks += `🕒 Update Cuaca: ${weatherUpdated}\n`

    await conn.reply(m.chat, teks.trim(), m)
  } catch (err) {
    m.reply('Error\n\n' + err.message)
  }
}

handler.help = ['growagarden']
handler.tags = ['internet']
handler.command = /^(growagarden|ggarden|gag)$/i

handler.register = true
handler.limit = true

export default handler
