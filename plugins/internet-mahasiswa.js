import axios from 'axios'

var handler = async (m, { conn, text }) => {
  if (!text) throw `*_Masukkan Nama Mahasiswa/Siswa Yang Ingin Kamu Cari !_*`;

  conn.reply(m.chat, 'Sedang mencari orangnya... Silahkan tunggu.', m);

  const apiKey = '3ed297db-db1c-4266-8bf4-a89f21c01317';
  const url = `https://pddikti.kemdikbud.go.id/api/pencarian/mhs/${text.replaceAll(' ', '%20')}`;

  try {
    let res = await axios.get(url, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    const data = res.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw 'Tidak ditemukan data untuk nama tersebut.';
    }

    let message = `Hasil pencarian untuk nama "${text}":\n\n`;

    data.forEach((mahasiswa, index) => {
      const nama = mahasiswa.nama || 'Tidak Diketahui';
      const nim = mahasiswa.nim || 'Tidak Diketahui';
      const namaPt = mahasiswa.nama_pt || 'Tidak Diketahui';
      const namaProdi = mahasiswa.nama_prodi || 'Tidak Diketahui';

      message += `${index + 1}. Nama: ${nama}\n   NIM: ${nim}\n   Perguruan Tinggi: ${namaPt}\n   Program Studi: ${namaProdi}\n\n`;
    });

    conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Terjadi kesalahan: ${error.message || error}`, m);
  }
};

handler.help = ['mahasiswa <nama>'];
handler.tags = ['internet'];
handler.command = /^(mahasiswa)$/i;

handler.register = true

export default handler
