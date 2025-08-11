import fetch from 'node-fetch'
import sharp from 'sharp'
import pkg from '@adiwajshing/baileys'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg

const handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `*Example:* ${usedPrefix}${command} Nao Tomori atau https://www.pixiv.net/en/artworks/92445569`
  m.reply(wait);

  try {
    const q = encodeURIComponent(args.join(' '));
    const response = await fetch(`${APIs.ryzumi}/api/search/pixiv?query=${q}`);
    const data = await response.json();

    if (!data || !data.Media || !Array.isArray(data.Media) || data.Media.length < 1) {
      return m.reply("Error, Foto Tidak Ditemukan");
    }

    const images = data.Media;
    let pageLink;
    if (args[0].includes('pixiv.net')) {
      pageLink = args[0];
    } else {
      pageLink = `https://www.pixiv.net/search.php?s_mode=s_tag&word=${encodeURIComponent(args.join(' '))}`;
    }
    
    const caption = data.caption || '';
    const artist = data.artist || '';
    const tags = data.tags ? data.tags.join(', ') : '';

    const nem = await conn.getName(m.sender);
    const push = [];

    async function createImage(url) {
      const res = await fetch(url);
      let buffer = await res.buffer();
      const threshold = 12 * 1024 * 1024;
      if (buffer.length > threshold) {
        buffer = await sharp(buffer)
          .jpeg({ quality: 80 })
          .toBuffer();
      }
      const { imageMessage } = await generateWAMessageContent({
        image: buffer
      }, {
        upload: conn.waUploadToServer
      });
      return imageMessage;
    }

    for (const imageUrl of images) {
      const imageMsg = await createImage(imageUrl);
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: caption
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `Artist: ${artist}\nTags: ${tags}`
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: imageMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "View on Pixiv",
                cta_type: "1",
                url: pageLink
              })
            }
          ]
        })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `Total results: ${images.length}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: `Hai ${nem},\nDibawah ini adalah hasil pencarian Pixiv kamu`
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: push
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, {
      messageId: msg.key.id
    });
  } catch (e) {
    throw `Error: ${e.message}`;
  }
};

handler.help = ['pixiv'];
handler.tags = ['internet'];
handler.command = /^pixiv$/i;

handler.limit = 2
handler.register = true

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
