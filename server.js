const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8081;
const serverUrl = `http://localhost:${port}`;
const team = require('./src/routes/team');
const config = require('config'); //we load the db location from the JSON files
//db options
const options = {
                    server: { socketOptions: { keepAive: 1, connectTimeoutMS: 30000 } },
                    replset: { socketOptions: {keepAive: 1, connectTimeoutMS: 30000}}
                }

// db connection
mongoose.connect(config.DBHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// don't show  the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined'));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.user(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => {
    res.json({message: 'Welcome to SoccerApi!'});
});

app.route('/team')
    .get(team.getTeams)
    .post(team.postTeam);
app.route('/team/:id')
    .get(team.getTeams)
    .delete(team.deleteTeam)
    .put(team.updateTeam);

app.get('/notfound', (req, res) => {
    res.json({message: 'URL not found'});
});

// Status for user on terminal
app.listen(port, () => {
    console.log(`Server running on: ${serverUrl}`);
});

module.exports = app;
