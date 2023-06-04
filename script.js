let inputButton = document.getElementById('inputButton');
let inputField = document.getElementById('inputField');

let locationP = document.querySelector('.location');
let tempP = document.querySelector('.temp-p');
let conditionP = document.querySelector('.condition-p');
let cloudP = document.querySelector('.cloud-p');
let windP = document.querySelector('.wind-p');
let humidityP = document.querySelector('.humidity-p');
let uvP = document.querySelector('.uv-p');

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
   // console.log(response.json());
   return response.json();
}

function processWeatherData(response) {
   return {
      location: response.location.name,
      country: response.location.country,
      temp: response.current.temp_c,
      condition: response.current.condition.text,
      cloud: response.current.cloud,
      wind_kph: response.current.wind_kph,
      wind_dir: response.current.wind_dir,
      humidity: response.current.humidity,
      uv: response.current.uv,
   }
}

function populateWeatherInfo(data) {
   locationP.textContent = `${data.location}, ${data.country}`,
   tempP.textContent = `Temperature ${data.temp} C°`;
   conditionP.textContent = data.condition;
   cloudP.textContent = `Cloudiness ${data.cloud}%`;
   windP.textContent = `Wind ${data.wind_kph} km/h`;
   humidityP.textContent = `Humidity ${data.humidity}%`;
   uvP.textContent = `${data.uv}`;
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