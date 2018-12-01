const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;
const serverUrl = `http://localhost:${port}`
app.use(bodyParser.json());

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
];

// Home endpoints
app.get('/', (req, res) => {
  const homeHTML = `
  <h1>Home</h1>
  <h3>Available endpoints:</h3>
  <li><a href='${serverUrl}/teams'>Teams</a></li>`

  res.send(homeHTML);
});

// Teams endpoints
app.get('/teams', (req, res) => {
  res.send(TEAMS);
})

app.post('/teams', (req, res) => {
  const newTeam = req.body;

  TEAMS.push({ id: TEAMS.length + 1, ...newTeam });

  res.send({
    addedTeam: newTeam,
    teamList: TEAMS
  });
})


// Status for user on terminal 
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Press "Ctrl-C" to shutdown the server');
  console.log('Run "node server.js" again tostart the server');
});
