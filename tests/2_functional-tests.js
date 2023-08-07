const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('valid input', function (done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '4gal' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, JSON.stringify({
          "initNum": 4,
          "initUnit": "gal",
          "returnNum": 15.14164,
          "returnUnit": "L",
          "string": "4 gallons converts to 15.14164 liters"
        }));
        done();
      });
  });

  test('invalid input', function (done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test('invalid number', function (done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test('invalid number and unit', function (done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test('no number input', function (done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, JSON.stringify({
          "initNum": 1,
          "initUnit": "kg",
          "returnNum": 2.20462,
          "returnUnit": "lbs",
          "string": "1 kilograms converts to 2.20462 pounds"
        }));
        done();
      });
  });
});
