const axios = require('axios')
require('dotenv').config()

const WEATHER_PUB_API = process.env.WEATHER_PUB_API
const API_KEY = process.env.API_KEY

const weatherForecast = async (location, date) => {
//const lat = '33.441792'
//const lon = '-94.037689'
  try {
    //const response = await axios.get(WEATHER_PUB_API + `?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const response = await axios.get(WEATHER_PUB_API + `?q=${location}&appid=${API_KEY}`)
    
    console.log('DATE:',date)
    console.log('DATA:',response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

module.exports = weatherForecast()
