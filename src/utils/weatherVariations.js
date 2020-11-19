const weatherGroups = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds']

const Thunderstorm = {
  'thunderstorm with light rain': {
    pt: 'trovoada com chuva fraca'
  },
  'thunderstorm with rain': {
    pt: 'trovoada com chuva'
  },
  'thunderstorm with heavy rain': {
    pt: 'trovoada com chuva forte'
  },
  'light thunderstorm': {
    pt: 'trovoada leve'
  },
  thunderstorm: {
    pt: 'trovoada'
  },
  'heavy thunderstorm': {
    pt: 'trovoada forte'
  },
  'ragged thunderstorm': {
    pt: 'trovoada irregular'
  },
  'thunderstorm with light drizzle': {
    pt: 'trovoada com garoa leve'
  },
  'thunderstorm with drizzle': {
    pt: 'trovoada com garoa'
  },
  'thunderstorm with heavy drizzle': {
    pt: 'trovoada com garoa forte'
  }
}

const Drizzle = {
  'light intensity drizzle': {
    pt: 'garoa de intensidade leve'
  },
  drizzle: {
    pt: 'garoa'
  },
  'heavy intensity drizzle': {
    pt: 'garoa de forte intensidade'
  },
  'light intensity drizzle rain': {
    pt: 'chuva com garoa de intensidade leve'
  },
  'drizzle rain': {
    pt: 'chuva com garoa'
  },
  'heavy intensity drizzle rain': {
    pt: 'chuva com garoa de intensidade forte'
  },
  'shower rain and drizzle': {
    pt: 'aguaceiro e garoa'
  },
  'heavy shower rain and drizzle': {
    pt: 'aguaceiro forte e garoa'
  },
  'shower drizzle': {
    pt: 'chuvisco'
  }
}

const Rain = {
  'light rain': {
    pt: 'chuva fraca'
  },
  'moderate rain': {
    pt: 'chuva moderada'
  },
  'heavy intensity rain': {
    pt: 'chuva de intensidade forte'
  },
  'very heavy rain': {
    pt: 'chuva muito forte'
  },
  rain: {
    pt: 'chuva'
  },
  'extreme rain': {
    pt: 'chuva extrema'
  },
  'freezing rain': {
    pt: 'chuva congelante'
  },
  'light intensity shower rain': {
    pt: 'chuva de intensidade leve'
  },
  'shower rain': {
    pt: 'chuvoso'
  },
  'heavy intensity shower rain': {
    pt: 'chuva de intensidade forte'
  },
  'ragged shower rain': {
    pt: 'chuva irregular'
  }
}

const Snow = {
  'light snow': {
    pt: 'light neve'
  },
  Snow: {
    pt: 'neve'
  },
  'Heavy snow': {
    pt: 'Heavy neve'
  },
  Sleet: {
    pt: 'granizo'
  },
  'Light shower sleet': {
    pt: 'chuva leve de granizo'
  },
  'Shower sleet': {
    pt: 'chuva de granizo'
  },
  'Light rain and snow': {
    pt: 'chuva fraca e neve'
  },
  'Rain and snow': {
    pt: 'chuva e neve'
  },
  'Light shower snow': {
    pt: 'chuva fraca de neve'
  },
  'Shower snow': {
    pt: 'chuva de neve'
  },
  'Heavy shower snow': {
    pt: 'chuva forte de neve'
  }
}

const Atmosphere = {
  'few clouds': {
    pt: 'algumas nuvens',
    ptEmj: '\u{1F324} algumas nuvens \u{1F324}'
  },
  'scattered clouds': {
    pt: 'nuvens dispersas',
    ptEmj: '\u{26C5} nuvens dispersas \u{26C5}'
  },
  'broken clouds': {
    pt: 'nublado',
    ptEmj: '\u{1F325} nublado \u{1F325}'
  },
  'overcast clouds': {
    pt: 'nuvens carregadas',
    ptEmj: '\u{2601} nuvens carregadas \u{2601}'
  }
}

// example with clear sky -> all = 10
// < 11% -> \u{2600}
const Clear = {
  'clear sky': {
    pt: 'céu limpo',
    ptEmj: '\u{2600} céu limpo \u{2600}'
  }
}

// example with few clouds -> all = 11
// "clouds": {
//   "all": 11
// }
//  > 11-25% -> \u{1F324} || > 25-50% -> \u{26C5} || > 51-84% -> \u{1F325} || > 85-100% -> \u{2601}
const Cloud = {
  'few clouds': {
    pt: 'algumas nuvens',
    ptEmj: '\u{1F324} algumas nuvens \u{1F324}'
  },
  'scattered clouds': {
    pt: 'nuvens dispersas',
    ptEmj: '\u{26C5} nuvens dispersas \u{26C5}'
  },
  'broken clouds': {
    pt: 'nublado',
    ptEmj: '\u{1F325} nublado \u{1F325}'
  },
  'overcast clouds': {
    pt: 'nuvens carregadas',
    ptEmj: '\u{2601} nuvens carregadas \u{2601}'
  }
}

const groupsTranslate = (group, text, lang) => {
  switch (group) {
    case 'Thunderstorm':
      return Thunderstorm[text][lang]
    case 'Drizzle':
      return Drizzle[text][lang]
    case 'Rain':
      return Rain[text][lang]
    case 'Snow':
      return Snow[text][lang]
    case 'Atmosphere':
      return Atmosphere[text][lang]
    case 'Clear':
      return Clear[text][lang]
    case 'Cloud':
      return Cloud[text][lang]
    default:
      return 'Entrada inválida'
  }
}

module.exports = {
  groupsTranslate,
  weatherGroups
}
