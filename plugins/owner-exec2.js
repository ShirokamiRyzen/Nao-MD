import util from 'util'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

// Create a require function for dynamic import
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = require('path').dirname(__filename);

const syntaxError = require('syntax-error');

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] === 'number') return super(Math.min(args[0], 10000));
    else return super(...args);
  }
}

const handler = async (m, _2) => {
  const {
    conn,
    usedPrefix,
    command,
    text,
    noPrefix,
    args,
    groupMetadata,
  } = _2;
  let _return;
  let _syntax = '';
  const _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix;
  const old = m.exp * 1;

  try {
    let i = 15;
    const f = {
      exports: {},
    };

    // Using dynamic import for function
    const execModule = await import(__filename);
    const exec = execModule.default;

    _return = await exec.call(conn, (...args) => {
      if (--i < 1) return;
      console.log(...args);
      return conn.reply(m.chat, util.format(...args), m);
    }, m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2]);
  } catch (e) {
    const err = await syntaxError(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
    });

    if (err) _syntax = '```' + err + '```\n\n';
    _return = e;
  } finally {
    conn.reply(m.chat, _syntax + util.format(_return), m);
    m.exp = old;
  }
};

handler.help = ['> ', '=> ']
handler.tags = ['advanced']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i
handler.owner = true

export default handler
