import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let server = 'play.ryzendesu.com';

    try {
        // Fetch Bedrock server information
        let bedrock = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${server}`);
        let jsonbedrock = await bedrock.json();

        // Fetch Java server information
        let java = await fetch(`https://api.mcstatus.io/v2/status/java/${server}`);
        let jsonjava = await java.json();

        let responseMessage = '';

        if (jsonjava.online) {
            // Java server is online
            let javaHost = `Host: ${jsonjava.host}`;
            let javaPlayersInfo = `Players: ${jsonjava.players.online}/${jsonjava.players.max}`;
            let javaMotd = `MOTD: ${jsonjava.motd.clean}`;
            let javaVersion = `Java Version: ${jsonjava.version.name_raw}`;

            responseMessage += `*Java Server Info:*\n${javaHost}\n${javaPlayersInfo}\n${javaMotd}\n${javaVersion}\n\n`;
        }

        if (jsonbedrock.online) {
            // Bedrock server is online
            let bedrockHost = `Host: ${jsonbedrock.host}`;
            let bedrockPlayersInfo = `Players: ${jsonbedrock.players.online}/${jsonbedrock.players.max}`;
            let bedrockMotd = `MOTD: ${jsonbedrock.motd.clean}`;
            let bedrockVersion = `Bedrock Version: ${jsonbedrock.version.name}`;
            let gamemode = `${jsonbedrock.gamemode}`;

            responseMessage += `*Bedrock Server Info:*\n${bedrockHost}\n${bedrockPlayersInfo}\n${bedrockMotd}\n${bedrockVersion}\n\n*Gamemode:* ${gamemode}`;
        }
        // Check if both Bedrock and Java servers are offline
        if (!jsonbedrock.online && !jsonjava.online) {
            m.reply('Both Bedrock and Java servers are currently offline');
        } else if (responseMessage.trim() !== '') {
            // At least one server is online, send the combined response
            m.reply(responseMessage);
        }
    } catch (error) {
        console.error(error);
        m.reply('Error fetching server status');
    }
};

handler.help = ['minecraft']
handler.tags = ['main']
handler.command = /^(minecraft|mc)$/i
handler.register = true

export default handler
