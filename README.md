# mind-challenge - Weather-forecast-api

Project: An API to receive a JSON with user text input and fetch external
weather api to get information about the weather conditions.

Features:

* Can answer about rain
* Can answer about the sun
* can answer about the wind speed
* can answer about the weather overall
* Support some emojis related to weather conditions 😻

Technologies: express, dotenv, axios, body-parser, dialogflow, nodemon, standard

## weather api

openWeatherClient -> Fetch the weather api passing location as parameter

* usage :

```https://api.openweathermap.org/data/2.5/forecast?q=rio%20de%20Janeiro&appid={YOUR-API-ID-HERE}&units=metric&lang=pt_br```

## json to create a new request GET

```http://localhost:5000/weatherforecast/```

* input

```{
  "user": "abc123",
  "query": "Vai chover hoje no Rio?"
}
```

* response

```{
  "user": "abc123",
  "response": "Há 77% de chance de chuva leve hoje com a temperatura média de 22.18°C graus na região de Rio de Janeiro"
}
```

## configure the fulfillment webhook to request from dialogflow POST

```http://{YOUR-PATH_HERE}/weatherforecastdf/```

* input

```{
  "responseId": "d365c3a3-4133-4777-9e00-232f04164cab-ce5e18e2",
  "queryResult": {
    "queryText": "hoje vai chover no rio ?",
    "action": "weatherRain",
    "parameters": {
      "date-time": "2020-11-20T12:00:00-03:00",
      "location": {
        "country": "",
        "city": "Rio de Janeiro",
        "admin-area": "",
        "business-name": "",
        "street-address": "",
        "zip-code": "",
        "shortcut": "",
        "island": "",
        "subadmin-area": ""
      }
    },
    "allRequiredParamsPresent": true,
    "fulfillmentText": "Eu acho que deu algum problema no serviço clima do tempo.",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Eu acho que deu algum problema no serviço clima do tempo."
          ]
        }
      }
    ],
    "intent": {
      "name": "projects/weather-forecast-orff/agent/intents/9399f646-78d3-4d54-baf0-b62586b16721",
      "displayName": "weather rain"
    },
    "intentDetectionConfidence": 1,
    "languageCode": "pt-br"
  },
  "originalDetectIntentRequest": {
    "source": "DIALOGFLOW_CONSOLE",
    "payload": {}
  },
  "session": "projects/weather-forecast-orff/agent/sessions/c00ddd10-ad58-e89a-08e1-418ae8c03694"
}
```

* response

```{
  "fulfillmentText": "Há 77% de humidade no ar, e o tempo predominante é nublado \n        hoje com a temperatura média de \n        21.38°C graus na região de Rio de Janeiro"
}
```

* Check if you have .env file on your project

```PORT=5000
EXCHANGE_PUB_ENDPOINT= https://api.openweathermap.org/data/2.5/forecast
API_KEY= YOUR-API-ID-HERE
NODE_ENV = development
LANGUAGE = pt_br
UNITS = metric
```

## Install packages and dependencies 🚀

```yarn install```

## Commands 🚀

```yarn dev : send command "nodemon src/index.js" -> Start the server with microservices in dev mode```

or

```yarn start : send command "node src/index.js" -> Start the server with microservices in production mode```

## Deploy Heroku

* You can check the application live, deployed on Heroku

```https://infinite-caverns-75688.herokuapp.com/```