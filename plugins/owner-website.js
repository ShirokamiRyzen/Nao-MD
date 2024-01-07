import axios from 'axios'
import { parseStringPromise } from 'xml2js'

// Create a simple cache object
const cache = {};

let handler = async (m, { conn, text }) => {
  // Extract the option from the command
  let option = text.toLowerCase();

  try {
    // Check if the sitemap is already in the cache
    if (!cache.sitemap) {
      // Fetch the sitemap
      const response = await axios.get('https://apk.ryzendesu.vip/sitemap.xml');
      if (response.status !== 200) {
        throw new Error(`Failed to fetch sitemap. Status: ${response.status}`);
      }

      // Store the sitemap in the cache
      cache.sitemap = response.data;
    }

    // Parse the XML data asynchronously
    const result = await parseStringPromise(cache.sitemap);

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
        } else {
          replyMessage = 'Spotify link not found in the sitemap.';
        }
        break;

      case 'revanced':
        const revancedLinks = result.urlset.url.filter(
          (url) => url.loc[0].includes('revanced')
        );
        if (revancedLinks.length > 0) {
          replyMessage = 'Links for Revanced pages:\n';
          revancedLinks.forEach((revancedLink) => {
            replyMessage += `${revancedLink.loc[0]}\n`;
          });
        } else {
          replyMessage = 'Revanced links not found in the sitemap.';
        }
        break;

      default:
        // Code to execute when no valid option is provided
        replyMessage = `
*「 Owner Website 」*

Nonton Anime: ryzendesu.vip
Mod APK: apk.ryzendesu.vip
KMS Activator: kms.ryzendesu.vip

Nonton Anime versi APK:
https://s.id/RyzendesuAPK

Option: revanced / spotify
        `;
        break;
    }

    // Reply with the final message
    m.reply(replyMessage);
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
