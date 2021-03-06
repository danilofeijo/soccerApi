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
    it('It should return all teams', (done) => {
      chai.request(server)
        .get('/team')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('It should return a team by given ID', (done) => {
      const teamData = new Team({
        name: 'Derby County',
        country: 'England',
        foundationDate: '1884-02-05',
        venueStadium: 'Pride Park Stadium',
        venueCapacity: 33597
      });

      teamData.save((err, team) => {
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
            done();
          });
      });
    });
  });

  /**
   * Tests for /POST route
   */
  describe('/POST team tests', () => {
    it('It should create a new Team', (done) => {
      const newTeamData = {
        name: 'Manchester United',
        country: 'England',
        foundationDate: '1878-03-05',
        venueStadium: 'Old Trafford',
        venueCapacity: 74994
      };

      chai.request(server)
        .post('/team')
        .send(newTeamData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('New team successfully added!');
          res.body.team.should.have.property('name');
          res.body.team.should.have.property('country');
          res.body.team.should.have.property('foundationDate');
          res.body.team.should.have.property('venueStadium');
          res.body.team.should.have.property('venueCapacity');
          done();
        });
    });

    it('It should not create a team without name', (done) => {
      const newTeamData = {
        name: '',
        country: 'England',
        foundationDate: '1886-12-01',
        venueStadium: 'Emirates Stadium',
        venueCapacity: 60260
      };

      chai.request(server)
        .post('/team')
        .send(newTeamData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.errors.should.have.property('name');
          res.body.should.have.property('message').eql('team validation failed: name: Path `name` is required.');
          done();
        });
    });

    it('It should not create a team without country', (done) => {
      const newTeamData = {
        name: 'Arsenal',
        country: '',
        foundationDate: '1886-12-01',
        venueStadium: 'Emirates Stadium',
        venueCapacity: 60260
      };

      chai.request(server)
        .post('/team')
        .send(newTeamData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('country');
          res.body.should.have.property('message').eql('team validation failed: country: Path `country` is required.');
          done();
        });
    });
  });

  /**
 * Tests for /PUT route
 */
  describe('/PUT team tests', () => {
    it('It should edit a team by ID', (done) => {
      const originalTeamData = new Team({
        name: 'Juventus Mooca',
        country: 'Brazil',
        foundationDate: '1800-01-01',
        venueStadium: 'Rua Javari',
        venueCapacity: 500
      });

      originalTeamData.save((err, team) => {
        const editedTeamData = {
          name: 'Liverpool',
          country: 'England',
          foundationDate: '1892-03-15',
          venueStadium: 'Anfield',
          venueCapacity: 54074
        };

        chai.request(server)
          .put('/team/' + team.id)
          .send(editedTeamData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Team successfully updated!');
            res.body.team.should.have.property('name').eql('Liverpool');
            res.body.team.should.have.property('venueCapacity').eql(54074);
            done();
          });
      });
    });
  });

  /**
 * Tests for /DELETE route
 */
  describe('/DELETE team tests', () => {
    it('It should delete a team by ID', (done) => {
      const originalTeamData = new Team({
        name: 'Wigan Athletic',
        country: 'England',
        foundationDate: '1892-03-15',
        venueStadium: 'DW Stadium',
        venueCapacity: 25133
      });

      originalTeamData.save((err, team) => {
        chai.request(server)
          .delete('/team/' + team.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Team successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });

    it('It should not delete any team when use a wrong ID', (done) => {
      const originalTeamData = new Team({
        name: 'Wigan Athletic',
        country: 'England',
        foundationDate: '1892-03-15',
        venueStadium: 'DW Stadium',
        venueCapacity: 25133
      });

      chai.request(server)
        .post('/team')
        .send(originalTeamData)
        .end((err, res) => {
          res.should.have.status(200);
        });

      const wrongTeamId = '0000xxxx1111yyyy2222zzzz';

      chai.request(server)
        .delete('/team/' + wrongTeamId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Test - No teams were found with given Id. Try again.');
          done();
        });
    });
  });
});
