const express = require('express');
const router = express.Router();

const TEAMS = require('../data/teams.json');

router.get('/', (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.send(TEAMS);
  } else {
    res.send(TEAMS.teams[id]);
  }

});

router.post('/', (req, res) => {
  res.send('POST Teams route');
});

module.exports = router;
