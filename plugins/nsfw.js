import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  // Check if it's a group chat
  if (m.isGroup && !global.db.data.chats[m.chat].nsfw) {
    throw `🚫 Group ini tidak dihidupkan nsfw \n\n ketik \n*${usedPrefix}enable* nsfw untuk menghidupkan fitur ini`;
  }

  // Check user age
  let user = global.db.data.users[m.sender].age;
  if (user < 17) throw m.reply(`*sepertinya umur kamu di bawah 18thn!*`);

  if (!args[0]) throw `select tag:\nblowjob\nneko\ntrap\nwaifu`;

  let res = await fetch(`https://api.waifu.pics/nsfw/${text}`);
  if (!res.ok) throw await res.text();

  let json = await res.json();
  if (!json.url) throw 'Error!';

  conn.sendFile(m.chat, json.url, '', global.wm, m);
};

handler.command = /^(nsfw)$/i
handler.premium = true
handler.limit = false

export default handler
