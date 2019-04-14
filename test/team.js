// Set the env variable to test during the tests
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Team = require('../src/models/team');

// Dependencies to create the tests
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// ? Our parent block
describe('Teams endpoint testing', () => {

  beforeEach((done) => {
    // Team.remove({}, (err) => {
    Team.deleteMany({}, (err) => {
      done();
    });
  });

  /**
   * Tests for /GET route
   */
  describe('/GET team tests', () => {
    it('It should GET all teams', () => {
      chai.request(server)
        .get('/team')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        });
    });

    it('It should GET a team by given ID', () => {
      const team = new Team({
        name: 'Derby County',
        country: 'England',
        foundationDate: '1884-02-05',
        venueStadium: 'Pride Park Stadium',
        venueCapacity: 33597
      });

      team.save((err, team) => {
        chai.request(server)
          .get('/team/' + team.id)
          .send(team)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('country');
            res.body.should.have.property('foundationDate');
            res.body.should.have.property('venueStadium');
            res.body.should.have.property('venueCapacity');
            res.body.should.have.property('_id').eql(team.id);
          });
      });
    });

  });

  /**
   * Tests for /POST route
   */
  describe('/POST team tests', () => {
    it('It should POST a new Team', () => {
      const newTeam = {
        name: 'Manchester United',
        country: 'England',
        foundationDate: '1878-03-05',
        venueStadium: 'Old Trafford',
        venueCapacity: 74994
      }

      chai.request(server)
        .post('/team')
        .send(newTeam)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('New team successfully added!');
          res.body.team.should.have.property('name');
          res.body.team.should.have.property('country');
          res.body.team.should.have.property('foundationDate');
          res.body.team.should.have.property('venueStadium');
          res.body.team.should.have.property('venueCapacity');
        });
    });
  });

  /**
 * Tests for /PUT route
 */
  describe('/PUT team tests', () => {
    it('It should PUT a team by id', () => {
      const team = new Team({
        name: 'Wigan Athletic',
        country: 'England',
        foundationDate: '1892-03-15',
        venueStadium: 'Anfield',
        venueCapacity: 500
      });

      team.save((err, team) => {
        chai.request(server)
          .put('/team/' + team.id)
          .send({
            name: 'Liverpool',
            country: 'England',
            foundationDate: '1892-03-15',
            venueStadium: 'Anfield',
            venueCapacity: 54074
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Team successfully updated!');
            res.body.team.should.have.property('name').eql('Liverpool');
            res.body.team.should.have.property('venueCapacity').eql(54074);
          });
      });
    });
  });

  describe('/DELETE team tests', () => {
    const team = new Team({
      name: 'Wigan Athletic',
      country: 'England',
      foundationDate: '1892-03-15',
      venueStadium: 'Anfield',
      venueCapacity: 500
    });

    team.save((err, team) => {
      chai.request(server)
        .delete('/team/' + team.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Team successfully deleted!');
          res.body.result.should.have.property('ok').eql(1);
          res.body.result.should.have.property('n').eql(1);
        });
    });
  });
});