const path = require('path')
const utils = require('./utils/units')
const datetime = require('./utils/datetime')
const weatherGroupsTranslate = require('./utils/weatherVariations')
const detectIntent = require('./utils/intents')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const UNITS = utils.stringCheckUnits(process.env.UNITS)

const express = require('express')
const bodyParser = require('body-parser')
const { weatherForecast } = require('./openWeatherClient')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (_, res) {
  res.render('index')
})

app.post('/weatherforecastdf', async (request, response) => {
  const today = new Date().getDate()
  const location = request.body.queryResult.parameters.location.city
  const strTime = request.body.queryResult.parameters['date-time']
  // strTime = strTime || request.body.queryResult.parameters['date-time'].structValue.fields.startDateTime.stringValue
  const time = new Date(strTime) // 1605830400 * 1000 -> convert the current datetime in millis

  // weatherRain | weatherSun | weather | weatherWind
  const action = request.body.queryResult.action

  try {
    const message = await weatherForecast(location)
    // const iconUrl = await weatherIcon(message.weather.icon)
    // message.list[0]
    switch (action) {
      case 'weatherRain':
        response.json({
          fulfillmentText: `Há ${message.main.humidity}% de chance de ${message.weather.description} 
        ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} com a temperatura média de 
        ${message.main.temp}${UNITS} graus na região de ${location} \n`
        })
        break
      case 'weatherSun':
        response.json({
          fulfillmentText: `Há ${message.main.humidity}% de chance de ${message.weather.description} 
          ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} com a temperatura de 
          ${message.main.temp}${UNITS} graus na região de ${location} \n`
        })
        break
      case 'weatherWind':
        response.json({
          fulfillmentText: `A velocidade do vento ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} é de ${message.wind.speed}km/h na região de ${location} \n`
        })
        break
      default:
        response.json({
          fulfillmentText: `A previsão de ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} é de ${message.main.temp}${UNITS} graus na região de ${location} \n
          mínima de ${message.main.temp_min}\n
          máxima de ${message.main.temp_min}\n
          e a sensação térmica de ${message.main.feels_like}${UNITS}`
        })
        break
    }
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.post('/weatherforecast', async (request, response) => {
  // input
  // {
  //   "user": "abc123",
  //   "query": "Vai chover hoje no Rio?"
  // }

  const user = request.body.user
  const query = request.body.query
  const queries = []
  queries.push(query)

  const intentResponse = await detectIntent.executeQueries('weather-forecast-orff', user, queries, 'pt-br')

  response.json({
    user: user,
    response: intentResponse
  })
})

// response
// {
//   "user": "abc123",
//   "response": "Há 40% de chance de chuva na cidade do Rio de Janeiro."
// {

app.get('/translate', (request, response) => {
  const text = 'light intensity shower rain'
  const lang = 'pt' // 'ptEmj' -> with emojis
  const weatherGroup = 'Rain'

  try {
    // group, text, lang = 'pt' || 'ptEmj'
    response.json({ text: `${weatherGroupsTranslate.groupsTranslate(weatherGroup, text, lang)} \u{1F327}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.listen(process.env.PORT || 5000)

module.exports = app
