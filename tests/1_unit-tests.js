const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('whole number input', function () {
        assert.equal(convertHandler.getNum('123gal'), 123)
        assert.equal(convertHandler.getNum('14lbs'), 14)
        assert.equal(convertHandler.getNum('4mi'), 4)
    });

    test('decimal number input', function () {
        assert.equal(convertHandler.getNum('123.8gal'), 123.8)
        assert.equal(convertHandler.getNum('14.0lbs'), 14.0)
        assert.equal(convertHandler.getNum('4.2mi'), 4.2)
    });

    test('fractional number input', function () {
        assert.equal(convertHandler.getNum('123/8gal'), 123 / 8)
        assert.equal(convertHandler.getNum('14/1lbs'), 14 / 1)
        assert.equal(convertHandler.getNum('4/2mi'), 4 / 2)
    });

    test('double-fractional number input', function () {
        assert.throws(() => convertHandler.getNum('123/87/12gal'))
        assert.throws(() => convertHandler.getNum('14/0/5lbs'))
        assert.throws(() => convertHandler.getNum('4/2/1mi'))
    });

    test('default to 1', function () {
        assert.equal(convertHandler.getNum('gal'), 1)
        assert.equal(convertHandler.getNum('lbs'), 1)
        assert.equal(convertHandler.getNum('mi'), 1)
    });

    test('read unit', function () {
        assert.equal(convertHandler.getUnit('123gal'), 'gal')
        assert.equal(convertHandler.getUnit('lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('4mi'), 'mi')
        assert.equal(convertHandler.getUnit('3L'), 'L')
        assert.equal(convertHandler.getUnit('14.2kg'), 'kg')
        assert.equal(convertHandler.getUnit('151/635km'), 'km')
    });

    test('read unknown unit', function () {
        assert.throws(() => convertHandler.getUnit('abc'))
        assert.throws(() => convertHandler.getUnit('14pounds'))
        assert.throws(() => convertHandler.getUnit('4mil'))
    });

    test('convert unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    });

    test('spell out unit', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
    });

    test('convert', function () {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001)
        assert.approximately(convertHandler.convert(2.5, 'lbs'), 1.13398, 0.00001)
        assert.approximately(convertHandler.convert(3.7, 'mi'), 5.95456, 0.00001)
        assert.approximately(convertHandler.convert(20, 'L'), 5.28344, 0.00001)
        assert.approximately(convertHandler.convert(123.123, 'kg'), 271.43997, 0.00001)
        assert.approximately(convertHandler.convert(1000, 'km'), 621.37274, 0.00001)
    });
});