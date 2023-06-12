let mode = 'celcius';
let currentLocation = '';
loadTopHeader();

let inputButton = document.getElementById('inputButton');
let inputField = document.getElementById('inputField');
let errorMessageDiv = document.querySelector('.error-message-div'); 

async function getWeatherData(location) {
   let url = 'https://api.weatherapi.com/v1/current.json?key=cb4c3b036354487e82a82318231405&q=';
   const response = await fetch(url + location, { mode: 'cors' });
   // console.log(response.json());
   return response.json();
}

function processWeatherData(response) {
   return {
      location: response.location.name,
      country: response.location.country,
      tempC: response.current.temp_c,
      tempF: response.current.temp_f,
      condition: response.current.condition.text,
      cloud: response.current.cloud,
      wind_kph: response.current.wind_kph,
      wind_mph: response.current.wind_mph,
      wind_dir: response.current.wind_dir,
      humidity: response.current.humidity,
      uv: response.current.uv,
   }
}

async function showWeatherData(location) {
   try {
      currentLocation = location;
      let data = await getWeatherData(location);
      let processedData = processWeatherData(data);
      console.log(processedData);
      removeErrorMessage();
      // displaySecondaryHeaders();
      loadMain(processedData);
   } catch (err) {
      removeErrorMessage();
      renderErrorMessage('Could not find location');
      console.log(err);
   }
}

function calculateWindDescriptionKph(wind) {
   let windDescription = '';
   if (wind < 1) {
      windDescription = 'Calm and still';
   } else if (wind < 5) {
      windDescription = 'Light wind';
   } else if (wind < 12) {
      windDescription = 'Light breeze';
   } else if (wind < 29) {
      windDescription = 'Gentle breeze';
   } else if (wind < 39) {
      windDescription = 'Fresh breeze';
   } else if (wind < 50) {
      windDescription = 'Strong breeze';
   } else if (wind < 62) {
      windDescription = 'Moderate gale';
   } else if (wind < 75) {
      windDescription = 'Fresh gale';
   } else if (wind < 89) {
      windDescription = 'Strong gale';
   } else if (wind < 103) {
      windDescription = 'Whole gale';
   } else if (wind < 119) {
      windDescription = 'Storm';
   } else {
      windDescription = 'Hurricane';
   }
   return windDescription;
}

function calculateWindDescriptionMph(wind) {
   let windDescription = '';
   if (wind < 1) {
      windDescription = 'Calm and still';
   } else if (wind < 3) {
      windDescription = 'Light wind';
   } else if (wind < 8) {
      windDescription = 'Light breeze';
   } else if (wind < 19) {
      windDescription = 'Gentle breeze';
   } else if (wind < 25) {
      windDescription = 'Fresh breeze';
   } else if (wind < 32) {
      windDescription = 'Strong breeze';
   } else if (wind < 39) {
      windDescription = 'Moderate gale';
   } else if (wind < 47) {
      windDescription = 'Fresh gale';
   } else if (wind < 55) {
      windDescription = 'Strong gale';
   } else if (wind < 64) {
      windDescription = 'Whole gale';
   } else if (wind < 74) {
      windDescription = 'Storm';
   } else {
      windDescription = 'Hurricane';
   }
   return windDescription;
}

function renderErrorMessage(message) {
   let errorMessageP = document.createElement('p');
   errorMessageP.classList.add('error-message-p');
   errorMessageP.textContent = message;
   errorMessageDiv.append(errorMessageP);
}

function removeErrorMessage() {
   if (document.querySelector('.error-message-p')) {
      document.querySelector('.error-message-p').remove();
   }
}

function loadTopHeader() {
   let header = document.createElement('header');
   header.id = 'top';

   let logoDiv = document.createElement('div');
   logoDiv.classList.add('logo-div');
   logoDiv.textContent = 'Logo';
   header.append(logoDiv);

   let form = document.createElement('form');
   form.classList.add('search-form');
   form.action = 'javascript:void(0);';
   form.method = '#';
   form.autocomplete = 'off';
   let input = document.createElement('input');
   input.type = 'text';
   input.id = 'inputField';
   input.placeholder = 'Enter location...';
   let button = document.createElement('button');
   button.type = 'button';
   button.id = 'inputButton';
   button.classList.add('input-field');
   button.textContent = 'Search';

   button.addEventListener('click', () => {
      if (input.value != '') {
         showWeatherData(input.value);
      } else {
         showWeatherData('oslo');
      }
   })
   
   document.addEventListener('keyup', (event) => {
      if (event.key == 'Enter') {
         button.click();
      }
   })

   form.append(input, button);
   header.append(form);

   let settings = document.createElement('div');
   settings.classList.add('settings-div');
   let celciusOnButton = document.createElement('button');
   celciusOnButton.classList.add('settings-button', 'celcius-button');
   celciusOnButton.textContent = '°C';
   let fahrenheitOnButton = document.createElement('button');
   fahrenheitOnButton.classList.add('settings-button', 'fahrenheit-button');
   fahrenheitOnButton.textContent = '°F';

   celciusOnButton.addEventListener('click', () => {
      mode = 'celcius';
      if (currentLocation) {
         showWeatherData(currentLocation);
      }
   })
   fahrenheitOnButton.addEventListener('click', () => {
      mode = 'fahrenheit';
      if (currentLocation) {
         showWeatherData(currentLocation);
      }
   })

   settings.append(celciusOnButton, fahrenheitOnButton);
   header.append(settings);

   let errorMessageDiv = document.createElement('div');
   errorMessageDiv.classList.add('error-message-div');
   header.append(errorMessageDiv);

   let body = document.querySelector('body');
   body.prepend(header);
}

function loadMain(data) {
   if (document.querySelector('main')) {
      document.querySelector('main').remove();
   }
   let main = document.createElement('main');

   let locationSection = document.createElement('section');
   locationSection.id = 'location-section';
   let locationP = document.createElement('p');
   locationP.classList.add('location');
   locationSection.append(locationP);
   main.append(locationSection);

   let primaryInfoSection = document.createElement('section');
   primaryInfoSection.id = 'primary-info';

   let tempDiv = document.createElement('div');
   tempDiv.classList.add('temp-div');
   let tempP = document.createElement('p');
   tempP.classList.add('temp-p');
   let degreeSpan = document.createElement('span');
   degreeSpan.classList.add('degree-sign');
   
   tempDiv.append(tempP);
   primaryInfoSection.append(tempDiv);

   let conditionDiv = document.createElement('div');
   conditionDiv.classList.add('condition-div');
   let conditionP = document.createElement('p');
   conditionP.classList.add('condition-p');
   conditionDiv.append(conditionP);
   primaryInfoSection.append(conditionDiv);

   let windDescriptionDiv = document.createElement('div');
   windDescriptionDiv.classList.add('wind-description-div');
   let windDescriptionP = document.createElement('p');
   windDescriptionP.classList.add('wind-description-p');
   windDescriptionDiv.append(windDescriptionP);
   primaryInfoSection.append(windDescriptionDiv);
   main.append(primaryInfoSection);

   let secondaryInfoSection = document.createElement('section');
   secondaryInfoSection.id = 'secondary-info';

   let windDiv = document.createElement('div');
   windDiv.classList.add('wind-div', 'secondary-div');
   let windHeader = document.createElement('header');
   windHeader.classList.add('secondary-header');
   windHeader.textContent = 'Wind';
   let windP = document.createElement('p');
   windP.classList.add('wind-p', 'secondary-p');
   windDiv.append(windHeader, windP);
   secondaryInfoSection.append(windDiv);

   let humidityDiv = document.createElement('div');
   humidityDiv.classList.add('humidity-div', 'secondary-div');
   let humidityHeader = document.createElement('header');
   humidityHeader.classList.add('secondary-header');
   humidityHeader.textContent = 'Humidity';
   let humidityP = document.createElement('p');
   humidityP.classList.add('humidity-p', 'secondary-p');
   humidityDiv.append(humidityHeader, humidityP);
   secondaryInfoSection.append(humidityDiv);

   let cloudDiv = document.createElement('div');
   cloudDiv.classList.add('cloud-div', 'secondary-div');
   let cloudHeader = document.createElement('header');
   cloudHeader.classList.add('secondary-header');
   cloudHeader.textContent = 'Cloud';
   let cloudP = document.createElement('p');
   cloudP.classList.add('cloud-p', 'secondary-p');
   cloudDiv.append(cloudHeader, cloudP);
   secondaryInfoSection.append(cloudDiv);

   let uvDiv = document.createElement('div');
   uvDiv.classList.add('uv-div', 'secondary-div');
   let uvHeader = document.createElement('header');
   uvHeader.classList.add('secondary-header');
   uvHeader.textContent = 'UV index';
   let uvP = document.createElement('p');
   uvP.classList.add('uv-p', 'secondary-p');
   uvDiv.append(uvHeader, uvP);
   secondaryInfoSection.append(uvDiv);

   locationP.textContent = `${data.location}, ${data.country}`;
   conditionP.textContent = data.condition;
   cloudP.textContent = `${data.cloud}%`;
   humidityP.textContent = `${data.humidity}%`;
   uvP.textContent = `${data.uv}`;

   if (mode == 'celcius') {
      tempP.textContent = `${data.tempC.toFixed(0)}`;
      degreeSpan.textContent = '°C';
      tempP.append(degreeSpan);
      windDescriptionP.textContent = calculateWindDescriptionKph(data.wind_kph);
      windP.textContent = `${data.wind_kph.toFixed(0)} km/h`;
      
   } else if (mode == 'fahrenheit') {
      tempP.textContent = `${data.tempF.toFixed(0)}`;
      degreeSpan.textContent = '°F';
      tempP.append(degreeSpan);
      windDescriptionP.textContent = calculateWindDescriptionMph(data.wind_kph);
      windP.textContent = `${data.wind_mph.toFixed(0)} mph`;
   }
   
   main.append(secondaryInfoSection);
   let body = document.querySelector('body');
   body.append(main);
   console.log('main');
}