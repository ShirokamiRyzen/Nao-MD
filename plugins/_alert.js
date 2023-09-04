let handler = m => m

handler.before = async function (m) {
    // Check if the user is banned
    if (global.db.data.users[m.sender].banned === true) {
        m.reply('Sorry, Your number has been banned for using bot');
        return;
    }
}

export default handler
