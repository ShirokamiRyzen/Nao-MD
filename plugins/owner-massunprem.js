let handler = async (m, { conn, text, usedPrefix, command }) => {
    let users = Object.keys(db.data.users);
    let count = 0;

    for (let user of users) {
        let userData = db.data.users[user];

        if (!userData) continue;
        if (userData.banned) continue; 
        if (!userData.premium) continue;
        if (userData.role !== 'Premium user') continue;

        userData.role = 'Free user';
        userData.premium = false;
        userData.premiumTime = 0;

        count++;
    }

    m.reply(`✔️ Success\nTotal users revoked from premium: ${count}`);
};

handler.command = /^massunprem?$/i

handler.rowner = true

export default handler
