import http from 'http';

const server = http.createServer((req, res) => {
  res.write("Shirokami Ryzen");
  res.end();
}).listen(8080);

export default server