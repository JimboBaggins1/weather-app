// take user input location and return current weather forecast for today
async function getWeather(location) {
    // fetch the weather data
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f1cf6b88f513417b90d112852241405&q=London`, { mode: 'cors' });

    // wait until data has been fetched, then store JSON in jsonResponse
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    // get the props that we need
    const currentTempCelsius = jsonResponse.current.temp_c;     // current temp in celsius
    const locationName = jsonResponse.location.name;         // location name
    console.log(`The current temperature in ${locationName} is ${currentTempCelsius}\u00B0C`);
    

}

getWeather();