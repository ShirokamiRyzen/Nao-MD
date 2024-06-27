let handler = async (m) => {
  let replyMessage = `
*「 Owner Website 」*

Nonton Anime: ryzendesu.vip
Modded App: forum.ryzendesu.vip

*「 Android Modded Apps 」*
forum.ryzendesu.vip/forumdisplay.php?fid=6

*「 Windows Modded Apps 」*
https://forum.ryzendesu.vip/forumdisplay.php?fid=5
`.trim();

  m.reply(replyMessage);
};

handler.help = ['website']
handler.tags = ['main']
handler.command = /^(website)$/i

handler.limit = false

export default handler
