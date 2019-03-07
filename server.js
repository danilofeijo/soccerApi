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
	appname: 'SoccerAPI',
	keepAlive: true,
	connectTimeoutMS: 30000,
	useNewUrlParser: true
	/**
	 * @Date: 2019-03-05
	 * @Desc:
	 * 		server and replSet option (into option variable) are deprecated. More details on:
	 * 		https://mongoosejs.com/docs/connections.html#v5-changes
	 */
	// server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	// replicaSet: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
}

// db connection
mongoose.connect(config.DBHost, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined'));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => {
	res.json({message: 'Welcome to SoccerApi!'});
});

app.route('/team')
	.get(team.getTeams)
	.post(team.postTeam);
app.route('/team/:id')
	.get(team.getTeam)
	.delete(team.deleteTeam)
	.put(team.updateTeam);

app.get('/notfound', (req, res) => {
	res.json({message: 'URL not found'});
});

// Status for user on terminal
app.listen(port, () => {
	console.log(`The magic happens on: ${serverUrl}`);
});

module.exports = app;
