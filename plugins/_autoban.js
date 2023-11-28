let handler = m => m

handler.before = async function (m) {
    let regionData = {
        '212': 'Morocco (+212)',
        '265': 'Malawi (+265)',
        '91': 'India (+91)',
        '90': 'Turkey (+90)',
    };

    let senderNumber = m.sender

    for (let countryCode in regionData) {
        if (senderNumber.startsWith(countryCode)) {
            global.db.data.users[m.sender].banned = true
            let bannedCountries = Object.values(regionData).join('\n');
            m.reply(`Sorry, you can't use this bot at this time because your country code has been banned due to spam requests.\n\nBlocked List of Countries:\n${bannedCountries}`);
            return
        }
    }
}

export default handler
