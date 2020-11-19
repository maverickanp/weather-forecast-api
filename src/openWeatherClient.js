const axios = require('axios')

const WEATHER_PUB_API = process.env.WEATHER_PUB_API
const API_KEY = process.env.API_KEY
const LANG = process.env.LANG
const UNITS = process.env.UNITS

const weatherForecast = async (location) => {
  try {
    const response = await axios.get(WEATHER_PUB_API + `?q=${location}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`)
    return response.data.list[0]
  } catch (error) {
    return error
  }
}

const weatherIcon = async (icon = '01d') => {
  // get the icon from currenty description weather
  try {
    // https://openweathermap.org/img/wn/{icon}@2x.png
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  } catch (error) {
    return error
  }
}

module.exports = {
  weatherForecast,
  weatherIcon
}
