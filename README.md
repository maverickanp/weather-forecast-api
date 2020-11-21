# mind-challenge - Weather-forecast-api

Project: An API to receive a JSON with user text input and fetch external
weather api to get information about the weather conditions.

Features:
  * Can answer about rain
  * Can answer about the sun
  * can answer about the wind speed
  * can answer about the weather overall

  Technologies: express, dotenv, axios, body-parser, dialogflow, nodemon, standard

# weather api
openWeatherClient -> Fetch the weather api passing location as parameter

* usage : 
```https://api.openweathermap.org/data/2.5/forecast?q=rio%20de%20Janeiro&appid={YOUR-API-ID-HERE}&units=metric&lang=pt_br```


# json to create a new request GET

http://localhost:5000/weatherforecast/

* input

```
{
  "user": "abc123",
  "query": "Vai chover hoje no Rio?"
}
```
* response

```
{
  "user": "abc123",
  "response": "Há 77% de chance de chuva leve hoje com a temperatura média de 22.18°C graus na região de Rio de Janeiro"
}
```


* Check if you have .env file on your project

```
PORT=5000
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