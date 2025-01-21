import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

const ryzenCDN = async (inp) => {
  try {
    const form = new FormData();
    const files = Array.isArray(inp) ? inp : [inp];

    for (const file of files) {
      const buffer = Buffer.isBuffer(file) ? file : file.buffer;
      if (!Buffer.isBuffer(buffer)) throw new Error('Invalid buffer format');

      const type = await fileTypeFromBuffer(buffer);
      if (!type) throw new Error('Unsupported file type');

      const originalName = (file.originalname || 'file').split('.').shift();
      
      form.append('file', buffer, {
        filename: `${originalName}.${type.ext}`,
        contentType: type.mime
      });
    }

    const res = await fetch('https://api.ryzendesu.vip/api/uploader/ryzencdn', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        ...form.getHeaders(),
      },
      body: form,
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Upload failed');

    return Array.isArray(inp) ? json.map(f => f.url) : json;
    
  } catch (error) {
    throw new Error(`RyzenCDN Error: ${error.message}`);
  }
};

export { ryzenCDN };