const axios = require('axios')

const WEATHER_PUB_API = process.env.WEATHER_PUB_API
const API_KEY = process.env.API_KEY

const weatherForecast = async (location, date) => {
  try {
    const response = await axios.get(WEATHER_PUB_API + `?q=${location}&appid=${API_KEY}`)

    return response.data.list[0].main
  } catch (error) {
    return error
  }
}

module.exports = weatherForecast
