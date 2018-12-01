const express = require('express');
const bodyParser = require('body-parser');
const TEAMS = require('../data/teams.json');

const app = express();
app.use(bodyParser.json());

const port = 8081;
const serverUrl = `
http://localhost:${port}
`;
const availableEndpoints = `
<h3>List of available endpoints:</h3>
<li><a href='${serverUrl}/teams'>Teams</a></li>
`;

// Home endpoints
app.get('/', (req, res) => {
  const homeHTML = `
  <h1>Home</h1>
  ${availableEndpoints}`;

  res.send(homeHTML);
});

// Teams endpoints
app.get('/teams', (req, res) => {
  res.send(TEAMS);
});

app.post('/teams', (req, res) => {
  const newTeam = req.body;

  TEAMS.push({ id: TEAMS.length + 1, ...newTeam });

  res.send({
    addedTeam: newTeam,
    teamList: TEAMS
  });
});

// Not Found endpoints
app.get('/notfound', (req, res) => {
  const notFoundHTML = `
  <h1>Endpoint Not Found</h1>
  ${availableEndpoints}
  `;

  res.send(notFoundHTML);
});

app.use((req, res, next) => {
  res.send({msg:'Endpoint not found. Try an available endpoint'});
});

// Status for user on terminal 
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Press "Ctrl-C" to shutdown the server');
  console.log('Run "node server.js" again tostart the server');
});
