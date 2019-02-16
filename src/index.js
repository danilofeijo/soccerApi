const express = require('express');
const bodyParser = require('body-parser');

const ENDPOINTS = require('../data/endpointsAvailable.json');

const teams = require('./teams');

const app = express();
app.use(bodyParser.json());
const port = 8081;
const serverUrl = `http://localhost:${port}`;

// Home endpoints
app.get('/', (req, res) => {
  res.send(ENDPOINTS);
});

app.use('/teams', teams);

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
  console.log(`Server running on: ${serverUrl}`);
  console.log('"Ctrl-C" ---> Shutdown server.');
});
