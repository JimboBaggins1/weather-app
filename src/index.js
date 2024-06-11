import './style.css';
import Icon from './images/search.svg';
import lArrow from './images/left-arrow.svg';
import rArrow from './images/right-arrow.svg';


const container = document.getElementById('container');
const weatherContainer = document.createElement('div');
weatherContainer.classList.add('weather-grid');
// get user entered location
let slidePos = 0;
const NUM_SLIDES_DISPLAY = 4;
// get submit button & input field
const submitBtn = document.getElementById('submit');
submitBtn.src = Icon;
submitBtn.width = '18';

const input = document.getElementById('weatherLocation');

// take user input location and return current weather forecast for today
async function getWeather(location) {
    const NUMDAYS = 3;

    try {
        // fetch the weather data
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f1cf6b88f513417b90d112852241405&q=${location}&days=${NUMDAYS}`, { mode: 'cors' });

        // wait until data has been fetched, then store JSON in jsonResponse
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.error) throw new Error(jsonResponse.error.message);

        // return object containing only the data we want
        let dayDataArr = [];
        for (let i = 0; i < NUMDAYS; i++) {
            dayDataArr.push(processData(jsonResponse, i));
        }
        console.log(dayDataArr);

        // display the weather data nicely
        //displayController(processedData);
        dayDataArr.forEach((day, index) => {
            let display;
            if (index === 0) {
                display = displayController.bind(dayDataArr[index], index);
            } else {
                display = displayController.bind(dayDataArr[index], index);
            }
            display();
        })
    } catch(error) {
        alert(error);
    }
    
    

}


// factory function to return the required info from the API json response
function processData(dataToProcess, index) {
    // get the props that we need - basic single day
    // const currentTempCelsius = dataToProcess.current.temp_c;     // current temp in celsius
    // const locationName = dataToProcess.location.name;            // location name
    // const weatherText = dataToProcess.current.condition.text;
    // const icon = dataToProcess.current.condition.icon            // current weather icon

    // return { currentTempCelsius, locationName, weatherText, icon };

    // get forecast object
    const forecastObj = dataToProcess.forecast.forecastday[index];

    // current temp
    const currentTemp = dataToProcess.current.temp_c;
    console.log(`Current temp: ${currentTemp}`);


    // 24 hour forecast
    let tempArr = forecastObj.hour.map(item => item.temp_c);
    let iconArr = forecastObj.hour.map(item => item.condition.icon);
    let hourArr = forecastObj.hour.map(item => item.time);
    // console.log iconArr)

    function getTemp(item) {
        return item.temp_c;
    }
    function getIcon(item) {
        return item.condition.icon;
    }

    // 3 day forecast
    const tempHigh = forecastObj.day.maxtemp_c;
    const tempLow = forecastObj.day.mintemp_c;
    const tempAvg = forecastObj.day.avgtemp_c;
    const text = forecastObj.day.condition.text;
    const icon = forecastObj.day.condition.icon;
    const location = dataToProcess.location.name;
    const date = forecastObj.date;
    return { tempHigh, tempLow, tempAvg, text, icon, location, date, tempArr, iconArr, hourArr };
}


function displayController(index) {
    let headerMsg = "";
    const header = document.createElement('div');
    const hourlyContainer = document.createElement('div');

    // displays header text if forecast is today
    if (index === 0) {
        const rightArrow = document.createElement('img');
        const leftArrow = document.createElement('img');
        rightArrow.src = rArrow;
        leftArrow.src = lArrow;
        rightArrow.setAttribute('id', 'right-arrow');
        leftArrow.setAttribute('id', 'left-arrow');

        headerMsg = `${this.text} in ${this.location}, with highs of ${this.tempHigh}\u00B0C.`;
        header.textContent = headerMsg;
        header.setAttribute('id', 'header-msg');
        weatherContainer.appendChild(header);
        // 24h forecast
        this.tempArr.forEach((elem, index) => {

            const hourDiv = document.createElement('div');
            hourDiv.setAttribute('id', index);
            hourDiv.classList.add('hours');
            const timeSection = document.createElement('div');
            const currentTime = new Date().getHours();
            const forecastHour = new Date(this.hourArr[index]).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" });
            console.log(typeof forecastHour.split(':')[0]);
            console.log(typeof currentTime);
            if (currentTime === parseInt(forecastHour.split(':')[0])) {
                timeSection.textContent = 'Now';
                hourDiv.classList.add('current');
            } else {
                timeSection.textContent = forecastHour;
            }
            const tempSection = document.createElement('div');
            tempSection.textContent = `${elem}\u00B0C`;
            const iconSection = document.createElement('img');
            console.log(this.iconArr[index]);
            iconSection.src = this.iconArr[index];
            hourDiv.appendChild(timeSection);
            hourDiv.appendChild(iconSection);
            hourDiv.appendChild(tempSection);
            hourlyContainer.setAttribute('id', 'detailed-forecast');
            hourlyContainer.appendChild(hourDiv);
            hourlyContainer.appendChild(leftArrow);
            hourlyContainer.appendChild(rightArrow);
        })
    }

    // Stats for each day
    const stats = document.createElement('ul');
    const day = document.createElement('li');
    const avg = document.createElement('li')
    const high = document.createElement('li');
    const low = document.createElement('li');

    day.textContent = getDayName(this.date, 'en-GB');
    avg.textContent = `Average: ${this.tempAvg}\u00B0C`;
    high.textContent = `High: ${this.tempHigh}\u00B0C`;
    low.textContent = `Low: ${this.tempLow}\u00B0C`;

    stats.appendChild(day);
    stats.appendChild(avg);
    stats.appendChild(high);
    stats.appendChild(low);
    // TODO: Remove
    console.log(stats);

    // weather icon
    const imgToDisplay = new Image();
    imgToDisplay.src = this.icon;
    imgToDisplay.width = '150';
    
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('grid-item');
    weatherItem.setAttribute('id', `item-${index}`)

    weatherItem.appendChild(imgToDisplay);
    weatherItem.appendChild(stats);

    weatherContainer.appendChild(hourlyContainer);
    weatherContainer.appendChild(weatherItem);
    container.appendChild(weatherContainer);

    if (index === 0) {
        const currentSlide = document.querySelector('.current');
        const currentPos = currentSlide.getAttribute('id');
        slidePos = parseInt(currentPos);
        progressSlides();
    }
}

// check validity of input before sending to getWeather(). Currently only checks that a value has been entered.
function checkValid(input) {
    const errorDiv = document.querySelector('.error');
    if (input === null || input === undefined || input.trim() === "") {
        errorDiv.classList.add('active');
        errorDiv.textContent = 'Uh oh, looks like you haven\'t entered a location';
        return false;
    } else {
        errorDiv.classList.remove('active');
        errorDiv.textContent = '';
        return true;
    }
}

// helper to convert date to day
function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function progressSlides(right = false) {
    const slides = document.querySelectorAll('.hours');

    // Increment or decrement slidePos depending on whether right or left arrow clicked 
    if (right && slidePos < slides.length - NUM_SLIDES_DISPLAY) {
      slidePos++;
    } else if (!right && slidePos > 0) {
      slidePos--;
    }

    // DBG
    console.log(slidePos);

    // controls which slides are visible
    slides.forEach((slide, index) => {
        if (index >= slidePos && index < (slidePos + NUM_SLIDES_DISPLAY)) {
            slide.classList.add('visible');
        } else if (slide.classList.contains('visible')) {
            slide.classList.remove('visible');
        }
    })

    // prevent slidePos going out of bounds - i.e. 0 <= slide pos <= 23
    document.getElementById('right-arrow').classList.toggle('disabled', slidePos >= slides.length - NUM_SLIDES_DISPLAY);
    document.getElementById('left-arrow').classList.toggle('disabled', slidePos <= 0); 
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputElem = document.getElementById('weatherLocation');
    const userInput = inputElem.value;
    console.log(userInput);
    // prevent duplicate display when user presses enter multiple times
    weatherContainer.textContent = "";
    if (checkValid(userInput)) getWeather(userInput);
})

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault
        const inputElem = document.getElementById('weatherLocation');
        const userInput = inputElem.value;
        console.log(userInput);
        // prevent duplicate display when user presses enter multiple times
        weatherContainer.textContent = "";
        if (checkValid(userInput)) getWeather(userInput);
    }
})

// const slides = document.getElementById('slide');
// rightArrow.addEventListener('click', progressSlides)

document.addEventListener('click', event => {
    let target = event.target;
    console.log(target.id);
    if (target.id === 'right-arrow') {
        progressSlides(true);
    } else if (target.id === 'left-arrow') {
        progressSlides();
    }
})