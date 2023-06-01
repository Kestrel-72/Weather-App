let inputButton = document.getElementById('inputButton');
let inputField = document.getElementById('inputField');

inputButton.addEventListener('click', () => {
   if (inputField.value != '') {
      showData(inputField.value);
   }
})

async function getData(location) {
   let url = 'http://api.weatherapi.com/v1/current.json?key=cb4c3b036354487e82a82318231405&q=';
   const response = await fetch(url + location, { mode: 'cors' });
   return response.json();
}

function processData(response) {
   return {
      location: response.location.name,
      temp: response.current.temp_c,
      condition: response.current.condition.text,
      cloud: response.current.cloud,
      wind: response.current.wind_kph,
      humidity: response.current.humidity,
   }
}

async function showData(location) {
   try {
      let data = await getData(location);
      let processedData = processData(data);
      console.log(processedData);
   } catch (err) {
      console.log(err);
   }
}