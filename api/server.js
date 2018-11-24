const express = require('express');
const port = 8081;

const server = express();

const TEAMS = [
  {
    name: 'Liverpool F.C.',
    stadium: 'Anfield',
    foundation: '1892',
    rival: 'Everton F.C.'
  },
  {
    name: 'Manchester United F.C.',
    stadium: 'Old Trafford',
    foundation: '1878',
    rival: 'Manchester City F.C.'
  },
  {
    name: 'Tottenham Hotspur F.C.',
    stadium: 'Wembley Stadium',
    foundation: '1882',
    rival: 'Arsenal F.C.'
  }
]

server.use((req, res, next) => {
  console.log('User URL:', req.url);
  next();
})

server.get('/', (request, response) => {
  response.send('<h1>Home</h1>');
})

server.get('/teams', (req, res) => {
  res.send(TEAMS);
})

server.get('/championships', (request, response) => {
  response.send('<h1>Championships</h1> <img src="http://a.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F2.png">');
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

server.use((req, res, next) => {
  res.send({msg:'Path not found. Try another option :)'});
});


server.listen(port, () => {
  console.log(`The server is running on: http://localhost:${port}`);
  console.log('Press Ctrl-C to shutdown this server');
})
