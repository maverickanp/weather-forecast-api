const path = require('path')
const utils = require('./utils/units')
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
  console.log('ACIONOU weatherforecastdf')
  const location = request.body.queryResult.parameters.location.city
  const time = request.body.queryResult.parameters['date-time'] || new Date()
  // weatherRain | weatherSun | weather | weatherWind
  const action = request.body.queryResult.action
  console.log(action)

  try {
    const message = await weatherForecast(location, time)
    // const iconUrl = await weatherIcon(message.weather.icon)

    response.json({ fulfillmentText: `A temperatura está ${message.temp}${UNITS} graus em ${location} \n ${action}` })
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

  // example qd todos os parameters foram preenchidos
  // retornar a mensagem completa

  // example qnd esta faltando parametros
  // interagir para obter e preencher os parameters faltantes

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
