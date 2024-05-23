const container = document.getElementById('container');

// take user input location and return current weather forecast for today
async function getWeather(location) {

    const weatherImg = new Image();

    try {
        // fetch the weather data
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f1cf6b88f513417b90d112852241405&q=${location}`, { mode: 'cors' });

        // wait until data has been fetched, then store JSON in jsonResponse
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        // get the props that we need
        const currentTempCelsius = jsonResponse.current.temp_c;     // current temp in celsius
        const locationName = jsonResponse.location.name;            // location name
        const weatherText = jsonResponse.current.condition.text;
        const icon = jsonResponse.current.condition.icon            // current weather icon
        weatherImg.src = icon;
        container.appendChild(weatherImg);                      // use this when styling UI
        console.log(`${weatherText} in ${locationName} and the current temperature is ${currentTempCelsius}\u00B0C`);
    } catch(error) {
        console.log(error.message);
    }
    
    

}

getWeather('London');