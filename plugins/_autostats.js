export async function all(m) {
	let setting = db.data.settings[this.user.jid]

	if (new Date() * 1 - setting.status > 1000) {
		let _uptime = process.uptime() * 1000
		let uptime = clockString(_uptime);
		let wm = 'Panel'
		let bio = `🗓️Aktif selama ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.self ? 'Private' : global.opts['gconly'] ? 'Hanya Grup' : 'Publik'} |  AmeliaBotz ${wm}`

		await this.setBio(bio).catch(_ => _)
		setting.status = new Date() * 1
	}
}

function clockString(ms) {
	let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
	let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
	let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
	return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}


// buatan FokusDotId (Fokus ID)