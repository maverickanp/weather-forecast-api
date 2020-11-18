
const stringCheckUnits = (units) => {
  switch (units) {
    case 'metric':
      return '°C'
    case 'imperial':
      return '°F'
    default:
      return 'invalid input'
  }
}

module.exports = { stringCheckUnits }
