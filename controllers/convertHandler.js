function findFirstLetterPosition(s) {
  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/[a-zA-Z]/)) {
      return i;
    }
  }
  return -1;  // If no letters are found
}

function validUnit(unit) {
  switch (unit) {
    case 'gal':
    case 'lbs':
    case 'mi':
    case 'L':
    case 'kg':
    case 'km':
      return true;
    default:
      return false;
  }
}


function ConvertHandler() {

  this.getNum = function (input) {
    let i = findFirstLetterPosition(input);

    if (i === 0) return 1;

    let numStr = input.substring(0, i);
    if (numStr.match(/^\d+\.\d+$/) || numStr.match(/^\d+$/)) return parseFloat(numStr)
    if (numStr.match(/^\d+(\.\d+)?\/\d+(\.\d+)?$/)) {
      let values = numStr.split('/');
      return parseFloat(values[0]) / parseFloat(values[1])
    }

    throw new Error('invalid number')
  };

  this.getUnit = function (input) {
    let i = findFirstLetterPosition(input);
    let numStr = input.substring(i);

    numStr = numStr.toLowerCase()
    if (numStr === 'l') numStr = 'L'
    if (validUnit(numStr)) return numStr

    throw new Error('invalid unit')
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L';
      case 'lbs':
        return 'kg';
      case 'mi':
        return 'km';
      case 'L':
        return 'gal';
      case 'kg':
        return 'lbs';
      case 'km':
        return 'mi';
      default:
        throw new Error('Cannot convert ' + initUnit);
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'lbs':
        return 'pounds';
      case 'mi':
        return 'miles';
      case 'L':
        return 'liters';
      case 'kg':
        return 'kilograms';
      case 'km':
        return 'kilometers';
      default:
        throw new Error('Can\'t spell out unknown unit ' + unit)
    }

  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        return initNum * galToL;
      case 'lbs':
        return initNum * lbsToKg;
      case 'mi':
        return initNum * miToKm;
      case 'L':
        return initNum / galToL;
      case 'kg':
        return initNum / lbsToKg;
      case 'km':
        return initNum / miToKm;
      default:
        console.error('Cannot convert ' + initUnit);
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };

}

module.exports = ConvertHandler;
