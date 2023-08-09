import http from 'http';

const server = http.createServer((req, res) => {
  res.write("I'm alive");
  res.end();
}).listen(8080);

export default handler