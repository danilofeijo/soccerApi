const express = require('express');
const bodyParser = require('body-parser');

const ENDPOINTS = require('../data/endpointsAvailable.json');
const TEAMS = require('../data/teams.json');

const app = express();
app.use(bodyParser.json());

const port = 8081;
const serverUrl = `http://localhost:${port}`;

// Home endpoints
app.get('/', (req, res) => {
  res.send(ENDPOINTS);
});

// Teams endpoints
app.get('/teams', (req, res) => {
  const reqTeamId = req.query.id;
  const teamSearchResult = TEAMS.teams[reqTeamId]

  if (!req.query.id) {
    res.send(TEAMS);
  } else {
    res.send(teamSearchResult);
  }

  // adicionar validação para quando não encontrar um resultado

});

app.post('/teams', (req, res) => {
  const newTeam = req.body;

  TEAMS.push({
    id: TEAMS.length + 1,
    ...newTeam
  });

  res.send({
    addedTeam: newTeam,
    teamsList: TEAMS
  });
});

// Not Found endpoints
app.get('/notfound', (req, res) => {
  res.send("Endpoint not found");
});

app.use((req, res, next) => {
  res.send({
    msg: 'Endpoint not found. Try an available endpoint'
  });
});

// Status for user on terminal
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Press "Ctrl-C" to shutdown the server');
  console.log('Run "node server.js" again to start the server');
});
