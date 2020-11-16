const express = require('express');
const bodyParser = require('body-parser');
const weatherApi = require('./openWeatherClient');

const app = express();
app.use(bodyParser.json());

app.post('/weatherforecast', async (request, response) => {
  const location = request.body.queryResult['location'];
  const time = request.body.queryResult['date-time'] || new Date();
  const message = await weatherApi(location, time);
  response.json({ fulfillmentText: message });
})

app.listen(process.env.PORT || 5000)

module.exports = app
