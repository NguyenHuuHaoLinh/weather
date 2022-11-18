let searchBox = $(".search-box");
let cityName = $(".city-name");
let weatherState = $(".weather-state");
let temperature = $(".temperature");
let windSpeed = $(".windSpeed");
let humidity = $(".humidity");
let sunrise = $(".sunrise");
let sunset = $(".sunset");
let iconn = $(".iconn");
let time = $(".time");
let container = $(".container");
let body = $("body");
async function changWeather() {
  let citySearch = searchBox.val().trim();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=9dbc419cc8825d851766b4ce71299b4a`;
  let data = await fetch(apiURL).then((res) => res.json());
  if (data.cod == 200) {
    // console.log(data);
    cityName.html(data.name);
    temperature.html(Math.round(data.main.temp - 273.15));
    windSpeed.html(data.wind.speed + "km/h");
    humidity.html(data.main.humidity + "%");
    weatherState.html(data.weather[0].main);
    sunrise.html(moment.unix(data.sys.sunrise).format("H:mm"));
    sunset.html(moment.unix(data.sys.sunset).format("H:mm"));
    iconn.attr(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    time.html(new Date().toLocaleString("vi"));
    body.attr("class", "hot");
    let temp = Math.round(data.main.temp - 273.15);

    if (temp >= 29) {
      body.attr("class", "hot");
    }
    if (25 <= temp < 29) {
      body.attr("class", "warm");
    }
    if (20 <= temp < 25) {
      body.attr("class", "cool");
    }
    if (temp < 20) {
      body.attr("class", "cold");
    }
  } else {
    alert("Unable to find your city");
  }
}

searchBox.keypress(function (e) {
  if (e.code === "Enter") {
    changWeather();
  }
});
