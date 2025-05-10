import { promisify } from 'util'
import { exec as execCallback } from 'child_process'
import os from 'os'

const exec = promisify(execCallback);

const handler = async (m, { conn }) => {
    m.reply(wait);

    try {
        const isWindows = os.platform() === 'win32';
        const pythonCmd = isWindows ? 'python' : 'python3';
        const command = `${pythonCmd} speed.py --share --secure`;

        const { stdout } = await exec(command);
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
