const axios = require('axios')
require('dotenv').config()

const WEATHER_PUB_API = process.env.WEATHER_PUB_API
const API_KEY = process.env.API_KEY

const weatherForecast = async (location, date) => {
  // async getRates (baseCurrency: string): Promise<RateResponse> {
const lat = '33.441792'
const lon = '-94.037689'
  try {
    // const response = await axios.get(WEATHER_PUB_API + `latest?base=${baseCurrency}`)
    const response = await axios.get(WEATHER_PUB_API + `?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

module.exports = weatherForecast()
