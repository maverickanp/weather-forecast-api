const path = require('path')
const utils = require('./utils/units')
const weatherGroupsTranslate = require('./utils/weatherVariations')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const UNITS = utils.stringCheckUnits(process.env.UNITS)

const express = require('express')
const bodyParser = require('body-parser')
const { weatherForecast, weatherIcon } = require('./openWeatherClient')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (_, res) {
  res.render('index')
})

app.post('/weatherforecastDF', async (request, response) => {
  const location = request.body.queryResult.parameters.location.city
  const time = request.body.queryResult.parameters['date-time'] || new Date()
  // weatherRain | weatherSun |
  const action = request.body.queryResult.action

  try {
    const message = await weatherForecast(location, time)
    const iconUrl = await weatherIcon(message.weather.icon)

    response.json({ fulfillmentText: `A temperatura está ${message.temp}${UNITS} graus em ${location} ${iconUrl} \n ${action}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.post('/weatherforecast', async (request, response) => {
  const location = request.body.queryResult.parameters.location.city
  const time = request.body.queryResult.parameters['date-time'] || new Date()
  // weatherRain | weatherSun |
  const action = request.body.queryResult.action

  try {
    const message = await weatherForecast(location, time)
    const iconUrl = await weatherIcon(message.weather.icon)

    response.json({ fulfillmentText: `A temperatura está ${message.temp}${UNITS} graus em ${location} ${iconUrl} \n ${action}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

// {
//   "user": "abc123",
//   "query": "Vai chover hoje no Rio?"
// }

app.get('/translate', (request, response) => {
  const text = 'light intensity shower rain'
  const lang = 'pt'
  const weatherGroup = 'Rain'

  try {
    // group, text, lang
    response.json({ text: `${weatherGroupsTranslate.groupsTranslate(weatherGroup, text, lang)} \u{1F327}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.listen(process.env.PORT || 5000)

module.exports = app
