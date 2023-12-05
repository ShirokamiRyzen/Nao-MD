let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user;
    if (m.isGroup) {
        user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        user = text.split(' ')[0];
        user = user.replace('@', '') + '@s.whatsapp.net';
    }

    let userData = db.data.users[user];
    if (!userData) throw `User not found!`;

    // Extract the user's phone number from the text
    let phoneNumber = user.split('@')[0];

    if (!phoneNumber) throw `where the number of days?`;
    if (isNaN(phoneNumber)) return m.reply(`only number!\n\nexample:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`);

    let txt = text.split(' ')[1]; // Extract the second part of the text (duration)

    var jumlahHari = 86400000 * txt;
    var now = new Date() * 1;

    if (userData.role === 'Free user') userData.role = 'Premium user';
    if (now < userData.premiumTime) userData.premiumTime += jumlahHari;
    else userData.premiumTime = now + jumlahHari;
    userData.premium = true;

    m.reply(`✔️ Success
📛 *Name:* ${userData.name}
📆 *Days:* ${txt} days
📉 *Countdown:* ${userData.premiumTime - now}`);
};

handler.help = ['addprem <phone number> <days>']
handler.tags = ['owner']
handler.command = /^addprem?$/i

handler.rowner = true

export default handler
