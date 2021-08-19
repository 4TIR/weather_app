const api = {
  key: "a5f15f9dc3f0ae3ba361d364badb7fd4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
const temperature = document.getElementById("temp");
searchbox.addEventListener("keypress", setQuery);
let btn1 = document.querySelector(".fahrenheit");
let btn2 = document.querySelector(".celsius");

var i = 0;
var images = [];
images[0] = "url(./bg/bg2.jpg)";
images[1] = "url(./bg/bg3.jpg)";
images[2] = "url(./bg/bg4.jpg)";
images[3] = "url(./bg/bg5.png)";
images[4] = "url(./bg/bg1.jpg)";

navigator.geolocation.getCurrentPosition(function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getResultsByLoc(latitude, longitude);
});

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResultsByLoc(latitude, longitude) {
  fetch(
    `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  let latitude = document.querySelector(".latitude");
  latitude.innerText = `Latitude: ${weather.coord.lat}`;

  let longitude = document.querySelector(".longitude");
  longitude.innerText = `Longitude: ${weather.coord.lon}`;

  btn2.setAttribute("disabled", true);
  btn1.removeAttribute("disabled");
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function btnClickF() {
  const changeTemp = parseInt(temperature.innerHTML);
  temperature.innerHTML = `${Math.round(changeTemp * 1.8 + 32)}<span>°f</span>`;
  btn1.setAttribute("disabled", true);
  btn2.removeAttribute("disabled");
}

function btnClickC() {
  const changeTemp = parseInt(temperature.innerHTML);
  temperature.innerHTML = `${Math.round(
    (changeTemp - 32) / 1.8
  )}<span>°c</span>`;
  btn2.setAttribute("disabled", true);
  btn1.removeAttribute("disabled");
}

function changeImage() {
  document.body.style.backgroundImage = images[i];
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
}
