const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Profile', function() {
  describe('/GET Profile', function() {
    it('it should get a profile record', function(done) {
      chai.request(server)
        .get('/api/profile/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });
  });
});
