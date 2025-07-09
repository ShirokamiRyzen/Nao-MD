import axios from 'axios'

let handler = async (m, { conn, participants, groupMetadata }) => {
    const ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch(e => './src/avatar_contact.png')
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-` [0] + '@s.whatsapp.net';
    let text = `*「 Group Information 」*\n
  *ID:* 
  ${groupMetadata.id}
  *Name:* 
  ${groupMetadata.subject}
  *Description:* 
  ${groupMetadata.desc?.toString() || 'unknown'}
  *Total Members:*
  ${participants.length} Members
  *Group Owner:* 
  @${owner.split('@')[0]}
  *Group Admins:*
  ${listAdmin}
  *Group Settings:*
  ${isBanned ? '✅' : '❌'} Banned
  ${welcome ? '✅' : '❌'} Welcome
  ${detect ? '✅' : '❌'} Detect
  ${del ? '❌' : '✅'} Anti Delete
  ${antiLink ? '✅' : '❌'} Anti Link
  *Message Settings:*
  Welcome: ${sWelcome}
  Bye: ${sBye}
  Promote: ${sPromote}
  Demote: ${sDemote}
  `.trim();

    conn.sendFile(m.chat, ppUrl, 'pp.jpg', text, m)
}

handler.help = ['infogc']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler