let handler = async (m) => {
  let replyMessage = `
*「 Owner Website 」*

Nonton Anime: ryzendesu.vip
Rest API: api.ryzendesu.vip

`.trim();

  m.reply(replyMessage);
};

handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i

handler.limit = false

export default handler
