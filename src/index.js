import './style.css';

const container = document.getElementById('container');

// get user entered location


// get submit button
const submitBtn = document.getElementById('submit');

// take user input location and return current weather forecast for today
async function getWeather(location) {

    const weatherImg = new Image();

    try {
        // fetch the weather data
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f1cf6b88f513417b90d112852241405&q=${location}`, { mode: 'cors' });

        // wait until data has been fetched, then store JSON in jsonResponse
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        // return object containing only the data we want
        const processedData = processData(jsonResponse);
        console.log(processedData);

        // display the weather data nicely
        displayController(processedData);
    } catch(error) {
        console.log(error.message);
    }
    
    

}


// factory function to return the required info from the API json response
function processData(dataToProcess) {
    // get the props that we need
    const currentTempCelsius = dataToProcess.current.temp_c;     // current temp in celsius
    const locationName = dataToProcess.location.name;            // location name
    const weatherText = dataToProcess.current.condition.text;
    const icon = dataToProcess.current.condition.icon            // current weather icon

    return { currentTempCelsius, locationName, weatherText, icon };
}


function displayController(dataToDisplay) {
    const tempCelsius = dataToDisplay.currentTempCelsius;
    const locationName = dataToDisplay.locationName;
    const weatherText = dataToDisplay.weatherText;
    const weatherIcon = dataToDisplay.icon;

    console.log(`${weatherText} in ${locationName}, with current temperature of ${tempCelsius}\u00B0C.`)
}

// check validity of input before sending to getWeather(). Currently only checks that a value has been entered.
function checkValid(input) {
    if (input === null || input === undefined || input.trim() === "") {
        const errorDiv = document.querySelector('.error');
        errorDiv.classList.add('error');
        errorDiv.textContent = 'Uh oh, looks like you haven\'t entered a location';
        return false;
    } else {
        return true;
    }
}


submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputElem = document.getElementById('weatherLocation');
    const userInput = inputElem.value;
    console.log(userInput);
    if (checkValid(userInput)) getWeather(userInput);
})