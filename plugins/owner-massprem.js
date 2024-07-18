let handler = async (m, { conn, text, usedPrefix, command }) => {
    let days = parseInt(text.split(' ')[0]);
    if (isNaN(days)) {
        return m.reply(`Please provide the number of days as a number.\n\nExample:\n${usedPrefix + command} 7`);
    }

    let jumlahHari = 86400000 * days;
    let now = new Date().getTime();
    let twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;

    let users = Object.keys(db.data.users);
    let count = 0;

    for (let user of users) {
        let userData = db.data.users[user];

        if (!userData) continue;
        if (!userData.registered) continue;
        if (userData.regTime > (now - twoWeeksInMs)) continue;
        if (userData.banned) continue;

        if (userData.role === 'Free user') userData.role = 'Premium user';
        if (now < userData.premiumTime) userData.premiumTime += jumlahHari;
        else userData.premiumTime = now + jumlahHari;
        userData.premium = true;
        
        count++;
    }

    m.reply(`✔️ Success\nTotal users upgraded to premium: ${count}\n📆 Days: ${days} days`);
};

handler.help = ['massprem <days>']
handler.tags = ['owner']
handler.command = /^massprem?$/i

handler.rowner = true

export default handler
