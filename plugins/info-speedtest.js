import { promisify } from 'util'
import { exec as execCallback } from 'child_process'
const exec = promisify(execCallback);

const handler = async (m, { conn }) => {

    m.reply(wait);

    try {
        const { stdout } = await exec('python3 speed.py --share --secure');

        await m.reply(stdout.trim());
    } catch (error) {
        m.reply('Error: ' + error.message);
    }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest)$/i;

handler.register = true
handler.rowner = true

export default handler
