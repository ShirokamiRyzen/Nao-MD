let handler = m => m

handler.before = async function (m) {
    // Check if the message is sent in a group
    if (m.isGroup) {
        // Mengabaikan pesan dalam grup
        return;
    }

    // Check if the user is banned
    if (global.db.data.users[m.sender].banned === true) {
        m.reply('Maaf, nomor Anda telah diblokir untuk menggunakan bot ini.');
        return;
    }
}


export default handler
