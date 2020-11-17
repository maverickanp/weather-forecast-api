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

const groupsTranslate = (group, text, lang) => {
  switch (group) {
    case 'Thunderstorm':
      return Thunderstorm[text][lang]
    case 'Drizzle':
      return Drizzle[text][lang]
    case 'Rain':
      return Rain[text][lang]
    default:
      return 'Entrada inválida'
  }
}

module.exports = {
  groupsTranslate,
  weatherGroups
}
