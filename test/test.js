process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);


describe('Calculation Route Query', function() {
  describe('GET /calculation', function() {
    describe('/calculation?equation=1/2', function() {
      it('it should return 0.5 from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1/2')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('0.5');
              })
      });
    });

    describe('/calculation?equation=1+2', function() {
      it('it should return 3 from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+2')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('3');
              })
      });
    });

    describe('/calculation?equation=1+2-3', function() {
      it('it should return 0 from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+2-3')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('0');
              })
      });
    });

    describe('/calculation?equation=a+2-3', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=a+2-3')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

    describe('/calculation?equation=1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1', function() {
      it('it should return 22 from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('22');
              })
      });
    });

    describe('/calculation?equation=1*1000-100+10/10', function() {
      it('it should return 91 from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1*1000-100+10/10')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('91');
              })
      });
    });

    describe('/calculation?equation=1+a', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+a')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

    describe('/calculation?equation=1+2a+1', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+2a+1')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

    describe('/calculation?equation=1+2-1-3a', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+2-1-3a')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

    describe('/calculation?equation=1+12a2-1-3', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1+12a2-1-3')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

    describe('/calculation?equation=1*a22-1-3', function() {
      it('it should return "Incorrect input" from the given equation', function() {
        chai.request(app)
              .get('/calculation?equation=1*a22-1-3')
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.eql('"Incorrect input"');
              })
      });
    });

  });
});
