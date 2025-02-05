export const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, "Contoh penggunaan: !eval 2 + 2", m);
    return;
  }

  let output = "";
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    output += args.join(" ") + "\n";
  };

  try {
    const result = eval(text);
    if (typeof result !== "undefined") {
      output += `Result: ${result}`;
    }
  } catch (e) {
    output += `Error: ${e.toString()}`;
  }
  console.log = originalConsoleLog;
  await m.reply(output.trim(), false, false, { smlcap: false });
};

handler.command = /^eval|js$/i

handler.owner = true

export default handler
