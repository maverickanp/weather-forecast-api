const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/weatherforecast', (request, response) => {
  console.log(request.body)
  response.json({ fulfillmentText: 'paranaue' })
})

app.listen(process.env.PORT || 5000)

module.exports = app
