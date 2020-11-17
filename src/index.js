const path = require('path')
const utils = require('./utils/units')
const weatherGroupsTranslate = require('./utils/weatherVariations')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const UNITS = utils.stringCheckUnits(process.env.UNITS)

const express = require('express')
const bodyParser = require('body-parser')
const weatherForecast = require('./openWeatherClient')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (_, res) {
  res.render('index')
})

app.post('/weatherforecast', async (request, response) => {
  const location = request.body.queryResult.parameters.location.city
  const time = request.body.queryResult.parameters['date-time'] || new Date()

  try {
    const message = await weatherForecast(location, time)
    response.json({ fulfillmentText: `A temperatura está ${message.temp} graus ${UNITS} em ${location} \u{26C8}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.get('/translate', (request, response) => {
  try {
    // group, text, lang
    response.json({ thunderstorm: `${weatherGroupsTranslate.groupsTranslate('Thunderstorm', 'thunderstorm', 'pt')} \u{26C8}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.listen(process.env.PORT || 5000)

module.exports = app
