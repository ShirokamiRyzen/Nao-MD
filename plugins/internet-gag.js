import axios from 'axios'

let handler = async (m, { conn }) => {
  m.reply(wait)

  try {
    const { data } = await axios.get(`${APIs.ryzen}/api/tool/growagarden`)
    const garden = data.data

    let teks = `🌼 *Grow a Garden Inventory* 🌼\n\n`

    // Seeds
    teks += `🌱 *Seeds*\n`
    garden.seeds.forEach(s => {
      teks += `• ${s.name} (${s.quantity})\n`
    })

    // Gear
    teks += `\n🧰 *Gear*\n`
    garden.gear.forEach(g => {
      teks += `• ${g.name} (${g.quantity})\n`
    })

    // Eggs
    teks += `\n🥚 *Eggs*\n`
    garden.eggs.forEach(e => {
      teks += `• ${e.name} (${e.quantity})\n`
    })

    // Cosmetics
    teks += `\n🎀 *Cosmetics*\n`
    garden.cosmetics.forEach(c => {
      teks += `• ${c.name} (${c.quantity})\n`
    })

    // Honey Items
    teks += `\n🍯 *Event/Honey Items*\n`
    garden.honey.forEach(h => {
      teks += `• ${h.name} (${h.quantity})\n`
    })

    // Weather
    let weather = garden.weather
    teks += `\n⛅ *Cuaca Sekarang:* ${weather.type.toUpperCase()}\n`
    weather.effects.forEach(eff => {
      teks += `- ${eff}\n`
    })

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
