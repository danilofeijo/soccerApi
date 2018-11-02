const http = require('http');
const port = 8081;
const ip = "0.0.0.0"; // 127.0.0.1 || 0.0.0.0

const server = http.createServer((req, res) => {
  const responses = []
  responses['/'] = '<h1>Home</h1>'
  responses['/teams'] = '<h1>Teams</h1>'
  responses['/championships'] = '<h1>Championships</h1>'
  responses['/players'] = '<h1>Players</h1>'
  responses['/countries'] = '<h1>Countries</h1>'
  responses['/notfound'] = '<h1>:| Page not found!</h1>'

  res.end(responses[req.url] || responses['/notfound'])

});

server.listen(port, ip, () => {
  console.log(`The server is running on: http://${ip}:${port}`);
  console.log('Pre Ctrl-C to shutdown this server');
});
