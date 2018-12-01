const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;

app.use(bodyParser.json());

// Home endpoints
app.get('/', (req, res) => {
  const homeHTML = `
  <h1>Home</h1>
  `

  res.send(homeHTML);
});

// Status for user on terminal 
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Press "Ctrl-C" to shutdown the server');
  console.log('Run "node server.js" again tostart the server');
});
