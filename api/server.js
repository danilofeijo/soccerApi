const express = require('express');
const port = 8081;

const server = express();

server.get('/', (request, response) => {
  response.send('<h1>Home</h1>');
})

server.get('/teams', (request, response) => {
  response.send('<h1>Teams</h1>');
})

server.get('/championships', (request, response) => {
  response.send('<h1>Championships</h1>');
})

server.get('/players', (request, response) => {
  response.send('<h1>Players</h1>');
})

server.get('/countries', (request, response) => {
  response.send('<h1>Countries</h1>');
})

server.get('/notfound', (request, response) => {
  response.send('<h1>Page Not Found</h1>');
})


server.listen(port, () => {
  console.log(`The server is running on: http://locahost:${port}`);
  console.log('Press Ctrl-C to shutdown this server');
})
