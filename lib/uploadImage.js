import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import fetch from 'node-fetch';

/**
 * Upload to tmpfiles.org
 * @param {Buffer} content File Buffer
 * @return {Promise<string>}
 */
const uploadPomf = async (content) => {
  try {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
    const timestamp = Date.now();
    const formData = new FormData();
    formData.append("file", content, `nao_tomori-${timestamp}-upload.${ext || "bin"}`);

    const response = await fetch(
      "https://tmpfiles.org/api/v1/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          ...formData.getHeaders(),
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );

    const result = await response.json();
    const match = /https?:\/\/tmpfiles\.org\/(.*)/.exec(result.data.url);

    if (!match) {
      throw new Error("Invalid URL format in response");
    }

    return `https://tmpfiles.org/dl/${match[1]}`;
  } catch (error) {
    console.error("Upload to tmpfiles.org failed:", error.message || error);
    throw error;
  }
};

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
async function uploadToTelegraph(buffer) {
  console.log("Uploading to telegra.ph...");

  try {
    const { ext } = await fileTypeFromBuffer(buffer);
    const form = new FormData();
    form.append('file', buffer, 'tmp.' + ext);

    const res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form
    });

    const img = await res.json();
    
    if (img.error) throw new Error(img.error);

    console.log("Uploaded to telegra.ph successfully!");
    return 'https://telegra.ph' + img[0].src;

  } catch (error) {
    console.error("Upload to telegra.ph failed:", error.message || error);
  }
}

/**
 * Upload to Imgur
 * @param {Buffer} imageBuffer Image Buffer
 * @param {string} clientId Imgur Client ID
 * @return {Promise<string>}
 */
async function uploadToImgur(imageBuffer, clientId) {
  console.log("Uploading to Imgur...");

  try {
    const form = new FormData();
    form.append('image', imageBuffer.toString('base64'));

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`
      },
      body: form
    });

    const json = await res.json();

    if (json.success) {
      console.log("Uploaded to Imgur successfully!");
      return json.data.link;
    } else {
      throw new Error(`Upload failed: ${json.data.error || 'Unknown error'}`);
    }

  } catch (error) {
    console.error("Upload to Imgur failed:", error.message || error);
  }
}

/**
 * Upload to File.io
 * @param {Buffer} fileBuffer File Buffer
 * @return {Promise<string>}
 */
async function uploadToFileIO(fileBuffer) {
  console.log("Uploading to File.io...");

  try {
    const form = new FormData();
    form.append('file', fileBuffer);

    const res = await fetch('https://file.io', {
      method: 'POST',
      body: form
    });

    const json = await res.json();

    if (json.success) {
      console.log("Uploaded to File.io successfully!");
      return json.link;
    } else {
      throw new Error(`Upload failed: ${json.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error("Upload to File.io failed:", error.message || error);
  }
}

export { uploadPomf, uploadToTelegraph, uploadToImgur, uploadToFileIO };