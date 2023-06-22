const rewards = {
    limit: 20,
  }
  const cooldown = 86400000
  let handler = async (m,{ conn} ) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily limit!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
    let text = ''
    for (let reward of Object.keys(rewards)) {
      if (!(reward in user)) continue
      user[reward] += rewards[reward]
      text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
    }
    conn.reply(m.chat, text.trim(), m)
    user.lastclaim = new Date * 1
  }
  handler.help = ['claimlimit']
  handler.tags = ['main']
  handler.command = /^(claimlimit)$/i
  
  handler.cooldown = cooldown
  
  export default handler