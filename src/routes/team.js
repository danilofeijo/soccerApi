const mongoose = require('mongoose');
const Team = require('../models/team');

/**
 * GET /team route to retrieve all the teams.
 */
function getTeams(req, res) {
  //Query the DB and if no errors, send all the books
  const query = Team.find({});
  query.exec((err, teams) => {
    if (err) res.send(err);
    //If no errors, send them back to the client
    res.json(teams);
  });
};

/**
 * POST /team to save a new team.
 */
function postTeam(req, res) {
  // Creates a new team
  const newTeam = new Team(req.body);
  // Save the new team into the DB.
  newTeam.save((err, team) => {
    if (err) {
      res.send(err);
    } else { //If no errors, send it back to the client
      res.json({
        message: 'New team successfully added!',
        team
      });
    };
  });
};

/**
 * GET /team/:id route to retrieve an specific team.
 */
function getTeam(req, res) {
  Team.findById(req.params.id, (err, team) => {
    if (err) res.send(err);
    //If no errors, send it back to the client
    res.json(team);
  });
};

/**
 * DELETE /team/:id route to delete an specific team.
 */
function deleteTeam(req, res) {
  Team.deleteMany({_id: req.params.id}, (err, result) => {
    if (err) {
      res.json({
        message: 'Test - No teams were found with given Id. Try again.',
      });
    } else {
      switch (result.n) {
        case 1:
          res.json({
            message: 'Team successfully deleted!',
            result
          });
          break;
        case 0:
          res.json({
            message: 'Postmam - No teams were found with given Id. Try again.',
            result
          });
          break;
        default:
          res.json({
            message: 'Something gone wrong. Check the result.',
            result
          });
        break;
      };
    };
  });
};

/**
 * PUT /team/:id route to update an specific team.
 */
function updateTeam(req, res) {
  Team.findById({_id: req.params.id}, (err, team) => {
    if (err) {
      res.send(err);
    }
    Object.assign(team, req.body).save((err, team) => {
      if (err) res.send(err);
      res.json({
        message: 'Team successfully updated!',
        team
      });
    });
  });
};

// Export all the functions.
module.exports = {
  getTeams,
  postTeam,
  getTeam,
  deleteTeam,
  updateTeam
};
