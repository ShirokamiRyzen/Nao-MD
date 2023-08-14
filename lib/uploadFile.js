import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'
/**
 * Upload epheremal file to file.io
 * `Expired in 1 day`
 * `100MB Max Filesize`
 * @param {Buffer} buffer File Buffer
 */
const fileIO = async buffer => {
  const { ext, mime } = await fileTypeFromBuffer(buffer) || {}
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  })
  let json = await res.json()
  if (!json.success) throw json
  return json.link
}

const anonfiles = async (buffer) => {
  const typeResult = await fileType.fromBuffer(buffer);
  const { ext, mime } = typeResult || {};

  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);

  try {
    const response = await fetch('https://api.anonfiles.com/upload', {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
      },
      body: form.getBuffer(), // Use body instead of data
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json(); // Parse the response JSON
    return responseData.data.file.url.full;
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {Buffer} inp 
 * @returns {Promise<string>}
 */
export default async function (inp) {
  let err = false
  for (let upload of [anonfiles, fileIO]) {
    try {
      return await upload(inp)
    } catch (e) {
      err = e
    }
  }
  if (err) throw err
}