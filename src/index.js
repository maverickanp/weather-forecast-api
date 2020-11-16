const express = require('express')

const app = express()

app.post('/weatherforecast', (request, response) => {
  console.log(request.body)
  response.json({ fulfillmentText: 'paranaue' })
})

app.listen(process.env.PORT || 5000)

module.exports = app
