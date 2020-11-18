// 'Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds'
const stringEmojis = (group) => {
  switch (group) {
    case 'Thunderstorm':
      return '\u{26C8}'
    case 'Drizzle':
      return '\u{1F327}'
    case 'Rain':
      return '\u{1F327}'
    case 'Snow':
      return '\u{1F328}'
    case 'Atmosphere':
      return '\u{1F31E}'
    case 'Clear':
      return '\u{2600}'
    case 'Clouds':
      return '\u{2601}'
    default:
      return '\u{1F31E}'
  }
}

module.exports = { stringEmojis }
