if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const weatherForecast = require('./openWeatherClient')

const app = express()
app.use(bodyParser.json())

app.post('/weatherforecast', async (request, response) => {
  const location = request.body.queryResult.parameters.location.city
  const time = request.body.queryResult.parameters['date-time'] || new Date()

  try {
    const message = await weatherForecast(location, time)
    response.json({ fulfillmentText: `the temperature is about ${message.temp} degree Farenheit in ${location}` })
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

app.listen(process.env.PORT || 5000)

module.exports = app
