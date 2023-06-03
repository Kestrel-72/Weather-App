let inputButton = document.getElementById('inputButton');
let inputField = document.getElementById('inputField');

let tempP = document.querySelector('.temp-p');
let conditionP = document.querySelector('.condition-p');
let cloudP = document.querySelector('.cloud-p');
let windP = document.querySelector('.wind-p');
let humidityP = document.querySelector('.humidity-p');

inputButton.addEventListener('click', () => {
   if (inputField.value != '') {
      showWeatherData(inputField.value);
   } else {
      showWeatherData('oslo');
   }
})

async function getWeatherData(location) {
   let url = 'http://api.weatherapi.com/v1/current.json?key=cb4c3b036354487e82a82318231405&q=';
   const response = await fetch(url + location, { mode: 'cors' });
   return response.json();
}

function processWeatherData(response) {
   return {
      location: response.location.name,
      temp: response.current.temp_c,
      condition: response.current.condition.text,
      cloud: response.current.cloud,
      wind: response.current.wind_kph,
      humidity: response.current.humidity,
   }
}

function populateWeatherInfo(data) {
   tempP.textContent = `Temperature ${data.temp} C°`;
   conditionP.textContent = data.condition;
   cloudP.textContent = `Cloudiness ${data.cloud}`;
   windP.textContent = `Wind ${data.wind} km/h`;
   humidityP.textContent = `Humidity ${data.humidity}`;
}

async function showWeatherData(location) {
   try {
      let data = await getWeatherData(location);
      let processedData = processWeatherData(data);
      console.log(processedData);
      populateWeatherInfo(processedData);
   } catch (err) {
      console.log(err);
   }
}