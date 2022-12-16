const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response) {
  console.log(request.body.cityName);

  const query = request.body.cityName;
  const apiKey = "a559e58ddb40575fdfdf2e3d9727ce10";
  const units = "metric";
  // constant url serves as a request to the external server
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(res) {

    res.on("data", function(data) {
      // the data for this case is the object we've taken from openweathermap API
      // concept of DOM is applied here
      const weatherData = JSON.parse(data);
      const location = weatherData.name;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      response.write("<p>The weather description is " + description + "</p>");
      response.write("<h1>The weather in " + location + " is " + temperature + " degree Celsius.</h1>");
      response.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' alt='icon'>");
      response.send();
    });
  });
})

app.listen(3000, function() {
  console.log("Server is running in port 3000");
});
