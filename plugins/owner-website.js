import fetch from 'node-fetch'
import { parseString } from 'xml2js'

let handler = async (m, { conn, text }) => {
  // Extract the option from the command
  let option = text.toLowerCase(); // Convert to lowercase for case-insensitive comparison

  try {
    // Fetch the sitemap XML
    const response = await fetch('https://app.ryzendesu.com/sitemap.xml');
    const xmlData = await response.text();

    // Parse the XML data
    parseString(xmlData, (err, result) => {
      if (err) {
        throw err;
      }

      // Initialize a variable to store the reply message
      let replyMessage = '';

      // Use a switch statement to handle different options
      switch (option) {
        case 'spotify':
          const spotifyLink = result.urlset.url.find(
            (url) => url.loc[0].includes('spotify')
          );
          if (spotifyLink) {
            replyMessage = `Link for Spotify page: ${spotifyLink.loc[0]}`;
            // Add your specific code for handling the Spotify link here
          } else {
            replyMessage = 'Spotify link not found in the sitemap.';
          }
          break;

        case 'revanced':
          const revancedLink = result.urlset.url.find(
            (url) => url.loc[0].includes('revanced')
          );
          if (revancedLink) {
            replyMessage = `Link for Revanced page: ${revancedLink.loc[0]}`;
            // Add your specific code for handling the Revanced link here
          } else {
            replyMessage = 'Revanced link not found in the sitemap.';
          }
          break;

        default:
          // Code to execute when no valid option is provided
          replyMessage = `
*「 Owner Website 」*

Main Site: ryzendesu.com
Mod APK: app.ryzendesu.com
KMS Activator: kms.ryzendesu.com

Option: revanced / spotify
          `;
          break;
      }

      // Reply with the final message
      m.reply(replyMessage);
    });
  } catch (error) {
    console.error('Error:', error);
    m.reply('Error fetching or parsing the sitemap.');
  }
};

handler.help = ['website <option>']
handler.tags = ['main']
handler.command = /^(website)$/i
handler.limit = false

export default handler

