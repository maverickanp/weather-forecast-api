const path = require('path')
const { stringCheckUnits } = require('./utils/units')

const UNITS = stringCheckUnits(process.env.UNITS)

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

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
    response.json({ speech: `A temperatura está ${message.temp} graus ${UNITS} em ${location}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.listen(process.env.PORT || 5000)

module.exports = app
