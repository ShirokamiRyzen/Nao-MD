// Script by ShirokamiRyzen
// Don't delete this credit!!!

import fetch from 'node-fetch'

let handler = m => m;

// Store previous responses for each group separately
let prevResponses = {};

handler.before = async () => {
    setInterval(async () => {
        let chatIds = Object.keys(global.db.data.chats);
        for (let chatId of chatIds) {
            let chat = global.db.data.chats[chatId];
            if (chat.gempa && !chat.isBanned) {
                const link = 'https://data.bmkg.go.id/DataMKG/TEWS/';

                try {
                    if (!chat.gempa) {
                        // Reset prevResponses when the feature is turned off
                        prevResponses[chatId] = undefined;
                        continue; // Skip processing if the feature is turned off
                    }
                    let res = await fetch(link + 'autogempa.json');
                    if (!res.ok) throw new Error("Failed to fetch data from BMKG API");

                    let anu = await res.json();
                    anu = anu.Infogempa.gempa;
                    let currentResponse = JSON.stringify(anu);

                    // Check if the current response is different from the previous one for this group
                    if (prevResponses[chatId] && currentResponse !== prevResponses[chatId]) {
                        let txt = `*${anu.Wilayah}*\n\n`;
                        txt += `Tanggal : ${anu.Tanggal}\n`;
                        txt += `Waktu : ${anu.Jam}\n`;
                        txt += `Potensi : *${anu.Potensi}*\n\n`;
                        txt += `Magnitude : ${anu.Magnitude}\n`;
                        txt += `Kedalaman : ${anu.Kedalaman}\n`;
                        txt += `Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`;
                        await conn.sendMessage(chatId, { image: { url: link + anu.Shakemap }, caption: txt });
                        prevResponses[chatId] = currentResponse; // Update the previous response for this group
                    }
                } catch (error) {
                    console.error("Error fetching and updating data:", error);
                }
            }
        }
    }, 1 * 60 * 1000); // Fetch data every 1 minute

    return true;
};

export default handler;
