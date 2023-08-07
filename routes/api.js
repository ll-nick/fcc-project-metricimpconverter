'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    try {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      returnNum = Number(returnNum.toFixed(5))
      let returnStr = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: returnStr
      })
    } catch (err) {
      // To satisfy the wrong number and unit test, this block is necessary
      if (err.message === 'invalid number') {
        try {
          let initUnit = convertHandler.getUnit(input);
        } catch {
          res.send('invalid number and unit');
          return;
        }
      }

      res.send(err.message)
    }
  })

};
