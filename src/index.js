let celsius = 25;
let fahrenheit = 10000;

let temperatureTag = document.querySelector("#temperature");



function celsiusToFahrenheit(event) {
  event.preventDefault();
  fahrenheit = (celsius * 9) / 5 + 32;
  temperatureTag.innerHTML = Math.round(fahrenheit);

fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
}


function fahrenheitToCelsius(event) {
  event.preventDefault();
  if (fahrenheit != 10000) {
    celsius = ((fahrenheit - 32) * 5) / 9;
    temperatureTag.innerHTML = Math.round(celsius);
  }

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahrenheitToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);


function formatDate(timestamp){
 timestamp=timestamp * 1000;
let date = new Date(timestamp);
let hours = date.getHours();
if(hours<10)
{
hours=`0${hours}`;
}

let minutes = date.getMinutes();
if(minutes<10)
{
minutes=`0${minutes}`;
}


let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

let today = days[date.getDay()];

return `${today} ${hours}:${minutes}`

}




function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temp = Math.round(response.data.main.temp);
  celsius = temp;

  temperatureTag.innerHTML = temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt);

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");


let contentSection = document.querySelector("#contentSection");
contentSection.classList.remove("hide");

}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  axios.get(url).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);







