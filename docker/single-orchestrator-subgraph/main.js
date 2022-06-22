const http = require('http');

const hostname = '0.0.0.0';
const port = 7402;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      data: {
        transcoders: [
          {
            id: process.env.TRANSCODER_ID,
            serviceURI: process.env.TRANSCODER_SERVICE_URI
          }
        ]
      }
    })
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
