const express = require('express');
const bodyParser = require('body-parser');

const port = 8081;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const TEAMS = [
  {
    id: 1,
    name: 'Liverpool F.C.',
    stadium: 'Anfield',
    foundation: '1892',
    city: "Liverpool",
    country: "England"
  },
  {
    id: 2,
    name: 'Manchester United F.C.',
    stadium: 'Old Trafford',
    foundation: '1878',
    city: "Manchester",
    country: "England"
  },
  {
    id: 3,
    name: 'Tottenham Hotspur F.C.',
    stadium: 'Wembley Stadium',
    foundation: '1882',
    city: "London",
    country: "England"
  }
]

const logged = true;

// User auth verification
server.use((req, res, next) => {
  console.log('User URL:', req.url);

  if (logged) {
    next();
  } else {
    res.send('You are not logged. Please sign in')
  }
})

// Home endpoints
server.get('/', (request, response) => {
  response.send('<h1>Home</h1>');
})

// Teams endpoints
server.get('/teams', (req, res) => {
  res.send(TEAMS);
})

server.post('/teams', (req, res) => {
  const newTeam = req.body;
  res.send(newTeam);
})

server.get('/tournaments', (request, response) => {
  response.send('<h1>Tournaments</h1>');
})

// Players endpoints
server.get('/players', (request, response) => {
  response.send('<h1>Players</h1>');
})

// Countries endpoints
server.get('/countries', (request, response) => {
  response.send('<h1>Countries</h1>');
})

// Not Found endpoints
server.get('/notfound', (request, response) => {
  response.send('<h1>Page Not Found</h1>');
})

server.use((req, res, next) => {
  res.send({msg:'Path not found. Try another option :)'});
});

// Status for user on terminal 
server.listen(port, () => {
  console.log(`The server is running on: http://localhost:${port}`);
  console.log('Press Ctrl-C to shutdown this server');
})
