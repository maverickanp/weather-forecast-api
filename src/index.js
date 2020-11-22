const path = require('path')
const utils = require('./utils/units')
const datetime = require('./utils/datetime')
const weatherGroupsTranslate = require('./utils/weatherVariations')
const detectIntent = require('./utils/intents')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const UNITS = utils.stringCheckUnits(process.env.UNITS) || 'metric'

const express = require('express')
const bodyParser = require('body-parser')
const { weatherForecast } = require('./openWeatherClient')

const standardMsg = 'Estou aqui para te ajuda com a previsão do tempo, sou capaz de saber as condições do clima de qualquer cidade, num periodo de até 5 dias, \nentão experimente falar...\n\n- Como está o tempo no Rio de Janeiro?\n- Amanhã vai chover no Rio?\n- Vai fazer sol?'
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
  const time = new Date(strTime) // 1605830400 * 1000 -> convert the current datetime in millis

  // weatherRain | weatherSun | weather | weatherWind
  const action = request.body.queryResult.action

  try {
    const message = await weatherForecast(location)
    // console.log('action:', action, JSON.stringify(message))
    // const iconUrl = await weatherIcon(message.weather.icon)
    // message.list[0]
    const listWeatherDate = []
    for (const moment of message) {
      if (time.getDate() === new Date(moment.dt * 1000).getDate()) {
        listWeatherDate.push(moment)
      }
    }
    if (listWeatherDate.length === 0) {
      listWeatherDate.push(message[0])
    }
    switch (action) {
      case 'weatherRain':
        response.json({
          fulfillmentText: `Há ${listWeatherDate[0].main.humidity}% de humidade no ar, e o tempo predominante é ${listWeatherDate[0].weather[0].description} 
        ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} com a temperatura média de 
        ${listWeatherDate[0].main.temp}${UNITS} graus na região de ${location}`
        })
        break
      case 'weatherSun':
        response.json({
          fulfillmentText: `Há ${listWeatherDate[0].main.humidity}% de chance de chuva, e o tempo predominante é ${listWeatherDate[0].weather[0].description} 
          ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} com a temperatura de 
          ${listWeatherDate[0].main.temp}${UNITS} graus na região de ${location}`
        })
        break
      case 'weatherWind':
        response.json({
          fulfillmentText: `A velocidade do vento ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} é de ${listWeatherDate[0].wind.speed}km/h na região de ${location}`
        })
        break
      default:
        response.json({
          fulfillmentText: `A previsão de ${time.getDate() === today ? 'hoje' : datetime.getWeekDayFrom(time)} é de ${listWeatherDate[0].main.temp}${UNITS} graus na região de ${location} \n
          mínima de ${listWeatherDate[0].main.temp_min}\n
          máxima de ${listWeatherDate[0].main.temp_min}\n
          e a sensação térmica de ${listWeatherDate[0].main.feels_like}${UNITS}`
        })
        break
    }
  } catch (error) {
    response.status(500).json({
      location,
      time,
      error: error
    })
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

  try {
    const intentResponse = await detectIntent.executeQueries('weather-forecast-orff', user, queries, 'pt-br')
    const fulfillmentText = intentResponse.fulfillmentText || standardMsg

    response.json({
      user,
      response: fulfillmentText
    })
  } catch (error) {
    response.status(500).json({
      error: error
    })
  }
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
