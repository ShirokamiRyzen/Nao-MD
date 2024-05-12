export async function all(m) {
    if (!m.message)
        return
    this.spam = this.spam ? this.spam : {}
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 15) {
            if (this.spam[m.sender].count > 15) {
                global.db.data.users[m.sender].banned = true
                global.db.data.users[m.sender].banReason = '*Auto detect:* Spam'
                m.reply("Nomer kamu telah di-ban karena spam.") 
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    }
    else
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
}