import fetch from 'node-fetch'
import pkg from '@adiwajshing/baileys'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg

const handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `*Example:* ${usedPrefix}${command} Nao Tomori`;
  m.reply('Please wait...');

  try {
    const q = encodeURIComponent(args.join(' '));
    const response = await fetch(`${APIs.ryzen}/api/search/pinterest?query=${q}`);
    const data = await response.json();
    const res = data;
    if (!Array.isArray(res) || res.length < 1) return m.reply("Error, Foto Tidak Ditemukan");

    const results = res.sort(() => Math.random() - 0.5).slice(0, Math.min(5, res.length));
    const limit = results.length;
    const nem = await conn.getName(m.sender);

    const push = [];

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        image: { url }
      }, {
        upload: conn.waUploadToServer
      });
      return imageMessage;
    }

    for (const result of results) {
      const imageUrl = result.directLink;
      const pageLink = result.link;
      const imageMsg = await createImage(imageUrl);
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: pageLink
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: global.footer
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
                display_text: "View on Pinterest",
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
              text: `Total results: ${limit}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: `Hai\nDibawah ini adalah hasil pencarian dari:\n${nem}`
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

handler.help = ['pinterest'];
handler.tags = ['internet'];
handler.command = /^pin(terest)?$/i;

handler.limit = 2
handler.register = true

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
