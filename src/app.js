const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;

app.use(bodyParser.json());

// Status for user on terminal 
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
  console.log('Ctrl-C ==> Shutdown server');
  console.log('$ node server.js ==> Start the server again');
})
