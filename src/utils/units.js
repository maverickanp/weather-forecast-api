
const stringCheckUnits = (units) => {
  switch (units) {
    case 'metric':
      return 'Celsius'
    case 'imperial':
      return 'Fahrenheit'
    default:
      return 'invalid input'
  }
}

module.exports = { stringCheckUnits }
