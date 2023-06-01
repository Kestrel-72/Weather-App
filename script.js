async function getData(location) {
   let url = 'http://api.weatherapi.com/v1/current.json?key=cb4c3b036354487e82a82318231405&q=';
   try {
      const response = await fetch(url + location, { mode: 'cors' });
      return await response.json();
   } catch (err) {
      console.log(err);
   }
}

function processData(response) {
   let weatherObject = {
      temp: response.current.temp_c,
      condition: response.current.condition.text,
      cloud: response.current.cloud,
      wind: response.current.wind_kph,
      humidity: response.current.humidity,
   }
   return weatherObject;
}
let data = getData('Tyumen');
data.then(function(data) {
   let newData = processData(data);
   console.log(newData);
})