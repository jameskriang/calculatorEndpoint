process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);


describe('Calculation Route Query', function() {
  describe('GET /calculation', function() {
    describe('?equation= Query Testing',function (){
      var tests = [
        {args: "1/2" ,  expected: "0.5"},
        {args: "1+2" ,  expected: "3"},
        {args: "1+2-3" ,  expected: "0"},
        {args: "a+2-3" ,  expected: '"Incorrect input"'},
        {args: "1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1" ,  expected: "22"},
        {args: "1*1000-100+10/10" ,  expected: "91"},
        {args: "1+a" ,  expected: '"Incorrect input"'},
        {args: "1+2b+1" ,  expected: '"Incorrect input"'},
        {args: "1+2-1-3x" ,  expected: '"Incorrect input"'},
        {args: "1+12z2-1-3" ,  expected: '"Incorrect input"'},
        {args: "1*u22-1-3" ,  expected: '"Incorrect input"'}
      ];

      tests.forEach( test => {
        it("it should get "+test.expected+" from the given equation of /calculation?equation="+test.args, function() {
          chai.request(app)
            .get("/calculation?equation="+test.args)
            .end((err,res) => {
              expect(res).to.have.status(200);
              expect(res.text).to.be.eql(test.expected);
            })
        })
      });

    });
  });
});
