const path = require('path')
const utils = require('./utils/units')
const weatherGroupsTranslate = require('./utils/weatherVariations')
const detectIntent = require('./utils/intents')

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
  // weatherRain | weatherSun | weather
  const action = request.body.queryResult.action
  console.log(action)

  try {
    const message = await weatherForecast(location, time)
    const iconUrl = await weatherIcon(message.weather.icon)

    response.json({ fulfillmentText: `A temperatura está ${message.temp}${UNITS} graus em ${location} ${iconUrl} \n ${action}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.post('/weatherforecast', async (request, response) => {
  // POST https://dialogflow.googleapis.com/v2/projects/project-id/agent/sessions/session-id:detectIntent
  // Project ID = 'weather-forecast-orff'
  // AGENT_LANGUAGE = "pt-br";
  // AGENT_ID = "b23060bb-8093-40ee-83bf-099eab6bb119";
  // AGENT_AVATAR_ID = "https://www.gstatic.com/dialogflow-console/common/assets/img/logo-short.png";
  // SERVICE_BASE_URL = "https://console.dialogflow.com/api-client/";
  // BOT_SERVICE_BASE_URL = "https://bots.dialogflow.com";
  // V2_ENABLED = true;

  // const location = request.body.queryResult.parameters.location.city
  // const time = request.body.queryResult.parameters['date-time'] || new Date()
  // weatherRain | weatherSun |
  // const action = request.body.queryResult.action

  const user = request.body.user
  const query = request.body.query

  detectIntent.executeQueries('weather-forecast-orff', user, query, 'pt-br')
  response.json({ process: 'DONE' })
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
