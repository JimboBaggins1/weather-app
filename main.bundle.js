"use strict";
(self["webpackChunktemplate_repo"] = self["webpackChunktemplate_repo"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _images_search_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/search.svg */ "./src/images/search.svg");
/* harmony import */ var _images_left_arrow_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/left-arrow.svg */ "./src/images/left-arrow.svg");
/* harmony import */ var _images_right_arrow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/right-arrow.svg */ "./src/images/right-arrow.svg");




const container = document.getElementById('container');
const weatherContainer = document.createElement('div');
weatherContainer.classList.add('weather-grid');
// get user entered location
let slidePos = 0;
const NUM_SLIDES_DISPLAY = 4;
// get submit button & input field
const submitBtn = document.getElementById('submit');
submitBtn.src = _images_search_svg__WEBPACK_IMPORTED_MODULE_1__;
submitBtn.width = '18';
const input = document.getElementById('weatherLocation');

// take user input location and return current weather forecast for today
async function getWeather(location) {
  const NUMDAYS = 3;
  try {
    // fetch the weather data
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f1cf6b88f513417b90d112852241405&q=${location}&days=${NUMDAYS}`, {
      mode: 'cors'
    });

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
    });
  } catch (error) {
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
  return {
    tempHigh,
    tempLow,
    tempAvg,
    text,
    icon,
    location,
    date,
    tempArr,
    iconArr,
    hourArr
  };
}
function displayController(index) {
  let headerMsg = "";
  const header = document.createElement('div');
  const hourlyContainer = document.createElement('div');

  // displays header text if forecast is today
  if (index === 0) {
    const rightArrow = document.createElement('img');
    const leftArrow = document.createElement('img');
    rightArrow.src = _images_right_arrow_svg__WEBPACK_IMPORTED_MODULE_3__;
    leftArrow.src = _images_left_arrow_svg__WEBPACK_IMPORTED_MODULE_2__;
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
      const forecastHour = new Date(this.hourArr[index]).toLocaleTimeString('en-GB', {
        hour: "2-digit",
        minute: "2-digit"
      });
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
    });
  }

  // Stats for each day
  const stats = document.createElement('ul');
  const day = document.createElement('li');
  const avg = document.createElement('li');
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
  weatherItem.setAttribute('id', `item-${index}`);
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
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: 'long'
  });
}
function progressSlides() {
  let right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
    if (index >= slidePos && index < slidePos + NUM_SLIDES_DISPLAY) {
      slide.classList.add('visible');
    } else if (slide.classList.contains('visible')) {
      slide.classList.remove('visible');
    }
  });

  // prevent slidePos going out of bounds - i.e. 0 <= slide pos <= 23
  document.getElementById('right-arrow').classList.toggle('disabled', slidePos >= slides.length - NUM_SLIDES_DISPLAY);
  document.getElementById('left-arrow').classList.toggle('disabled', slidePos <= 0);
}
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  const inputElem = document.getElementById('weatherLocation');
  const userInput = inputElem.value;
  console.log(userInput);
  // prevent duplicate display when user presses enter multiple times
  weatherContainer.textContent = "";
  if (checkValid(userInput)) getWeather(userInput);
});
input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault;
    const inputElem = document.getElementById('weatherLocation');
    const userInput = inputElem.value;
    console.log(userInput);
    // prevent duplicate display when user presses enter multiple times
    weatherContainer.textContent = "";
    if (checkValid(userInput)) getWeather(userInput);
  }
});

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
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf */ "./src/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./images/background.jpg */ "./src/images/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
    font-family: dmSans;
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    font-weight: 400;
  }

* {
    box-sizing: border-box;
}

body {
    font-family:  dmSans, sans-serif;
    font-size: 1.4em;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
    color: rgba(16, 255, 233, 0.87);
}
li {
    list-style: none;
    /* text-align: left; */
}

ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
}

.searchbar {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 5%;
}

input {
    all: unset;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid black;
    background: transparent;
}

#submit {
    /* position: absolute;
    top: 0;
    right: 0; */
    cursor: pointer;
}

.error {
    color: white;
}

.active {
    background-color: red;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 50%);
}

.weather-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 20px;
    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr); */
}

#header-msg {
    /* grid-column: 1 / 4; */
    font-size: 1.5em;
    flex-basis: 100%;
    text-align: center;
    padding: 100px 10px;
}

#detailed-forecast {
    flex-basis: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    color: rgba(16, 255, 233, 0.87);
    column-gap: 20px;
}

#detailed-forecast div {
    text-align: center;
}

#right-arrow,
#left-arrow {
    width: 32px;
    cursor: pointer;
}

#right-arrow {
    order: 2;
}

#left-arrow {
    order: 1;
}

#right-arrow.disabled,
#left-arrow.disabled {
    cursor: not-allowed;
}
.grid-item {
    text-align: center;
    border: 1px solid #91bacd;
    /* background-color: #91bacd; */
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 6px 16px;
    color: rgba(16, 255, 233, 0.87);
}

.grid-item:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.hours {
    display: none;
    order: 2;
}

.visible {
    display: block;
}

.disabled {
    opacity: 0.3;
}

@media only screen and (max-width: 650px) {
    #header-msg {padding: 50px 10px;}
    .grid-item { width: 60%; display: flex; text-align: left;}
    .weather-grid { flex-direction: column; row-gap: 20px; align-items: center;}
}

@media only screen and (max-width: 455px) {
    .grid-item { width: 100%; }
}

/* prevent blue autofill background - solution taken from https://stackoverflow.com/questions/55131944/how-to-remove-blue-background-on-chrome-autocomplete */
/* input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
} */`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,4CAA8D;IAC9D,gBAAgB;EAClB;;AAEF;IACI,sBAAsB;AAC1B;;AAEA;IACI,gCAAgC;IAChC,gBAAgB;IAChB,yDAA8C;IAC9C,+BAA+B;AACnC;AACA;IACI,gBAAgB;IAChB,sBAAsB;AAC1B;;AAEA;IACI,SAAS;IACT,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,eAAe;IACf,qBAAqB;IACrB,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,eAAe;AACnB;;AAEA;IACI,UAAU;IACV,cAAc;IACd,aAAa;IACb,eAAe;IACf,8BAA8B;IAC9B,uBAAuB;AAC3B;;AAEA;IACI;;eAEW;IACX,eAAe;AACnB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,SAAS;IACT,+BAA+B;AACnC;;AAEA;IACI,aAAa;IACb,eAAe;IACf,uBAAuB;IACvB,gBAAgB;IAChB;;yCAEqC;AACzC;;AAEA;IACI,wBAAwB;IACxB,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,cAAc;IACd,+BAA+B;IAC/B,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;;IAEI,WAAW;IACX,eAAe;AACnB;;AAEA;IACI,QAAQ;AACZ;;AAEA;IACI,QAAQ;AACZ;;AAEA;;IAEI,mBAAmB;AACvB;AACA;IACI,kBAAkB;IAClB,yBAAyB;IACzB,+BAA+B;IAC/B,kBAAkB;IAClB,uCAAuC;IACvC,gBAAgB;IAChB,iBAAiB;IACjB,+BAA+B;AACnC;;AAEA;IACI,wCAAwC;AAC5C;;AAEA;IACI,aAAa;IACb,QAAQ;AACZ;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa,kBAAkB,CAAC;IAChC,aAAa,UAAU,EAAE,aAAa,EAAE,gBAAgB,CAAC;IACzD,gBAAgB,sBAAsB,EAAE,aAAa,EAAE,mBAAmB,CAAC;AAC/E;;AAEA;IACI,aAAa,WAAW,EAAE;AAC9B;;AAEA,6JAA6J;AAC7J;;;;;;;;;;GAUG","sourcesContent":["@font-face {\r\n    font-family: dmSans;\r\n    src: url('./fonts/DM_Sans/DMSans-VariableFont_opsz\\,wght.ttf');\r\n    font-weight: 400;\r\n  }\r\n\r\n* {\r\n    box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n    font-family:  dmSans, sans-serif;\r\n    font-size: 1.4em;\r\n    background-image: url(./images/background.jpg);\r\n    color: rgba(16, 255, 233, 0.87);\r\n}\r\nli {\r\n    list-style: none;\r\n    /* text-align: left; */\r\n}\r\n\r\nul {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    flex-wrap: wrap;\r\n    align-content: center;\r\n    align-items: flex-start;\r\n}\r\n\r\n.searchbar {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    padding-top: 5%;\r\n}\r\n\r\ninput {\r\n    all: unset;\r\n    border-left: 0;\r\n    border-top: 0;\r\n    border-right: 0;\r\n    border-bottom: 1px solid black;\r\n    background: transparent;\r\n}\r\n\r\n#submit {\r\n    /* position: absolute;\r\n    top: 0;\r\n    right: 0; */\r\n    cursor: pointer;\r\n}\r\n\r\n.error {\r\n    color: white;\r\n}\r\n\r\n.active {\r\n    background-color: red;\r\n    border-radius: 5px;\r\n    padding: 5px;\r\n    position: absolute;\r\n    left: 50%;\r\n    transform: translate(-50%, 50%);\r\n}\r\n\r\n.weather-grid {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n    column-gap: 20px;\r\n    /* display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    grid-template-rows: repeat(2, 1fr); */\r\n}\r\n\r\n#header-msg {\r\n    /* grid-column: 1 / 4; */\r\n    font-size: 1.5em;\r\n    flex-basis: 100%;\r\n    text-align: center;\r\n    padding: 100px 10px;\r\n}\r\n\r\n#detailed-forecast {\r\n    flex-basis: 100%;\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin: 20px 0;\r\n    color: rgba(16, 255, 233, 0.87);\r\n    column-gap: 20px;\r\n}\r\n\r\n#detailed-forecast div {\r\n    text-align: center;\r\n}\r\n\r\n#right-arrow,\r\n#left-arrow {\r\n    width: 32px;\r\n    cursor: pointer;\r\n}\r\n\r\n#right-arrow {\r\n    order: 2;\r\n}\r\n\r\n#left-arrow {\r\n    order: 1;\r\n}\r\n\r\n#right-arrow.disabled,\r\n#left-arrow.disabled {\r\n    cursor: not-allowed;\r\n}\r\n.grid-item {\r\n    text-align: center;\r\n    border: 1px solid #91bacd;\r\n    /* background-color: #91bacd; */\r\n    border-radius: 5px;\r\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\r\n    transition: 0.3s;\r\n    padding: 6px 16px;\r\n    color: rgba(16, 255, 233, 0.87);\r\n}\r\n\r\n.grid-item:hover {\r\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\r\n}\r\n\r\n.hours {\r\n    display: none;\r\n    order: 2;\r\n}\r\n\r\n.visible {\r\n    display: block;\r\n}\r\n\r\n.disabled {\r\n    opacity: 0.3;\r\n}\r\n\r\n@media only screen and (max-width: 650px) {\r\n    #header-msg {padding: 50px 10px;}\r\n    .grid-item { width: 60%; display: flex; text-align: left;}\r\n    .weather-grid { flex-direction: column; row-gap: 20px; align-items: center;}\r\n}\r\n\r\n@media only screen and (max-width: 455px) {\r\n    .grid-item { width: 100%; }\r\n}\r\n\r\n/* prevent blue autofill background - solution taken from https://stackoverflow.com/questions/55131944/how-to-remove-blue-background-on-chrome-autocomplete */\r\n/* input:-webkit-autofill,\r\ninput:-webkit-autofill:hover,\r\ninput:-webkit-autofill:focus,\r\ntextarea:-webkit-autofill,\r\ntextarea:-webkit-autofill:hover,\r\ntextarea:-webkit-autofill:focus,\r\nselect:-webkit-autofill,\r\nselect:-webkit-autofill:hover,\r\nselect:-webkit-autofill:focus {\r\n  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;\r\n} */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf":
/*!*************************************************************!*\
  !*** ./src/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b230ddb7eabb4b25e123.ttf";

/***/ }),

/***/ "./src/images/background.jpg":
/*!***********************************!*\
  !*** ./src/images/background.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2cdad63993b7e998e9ef.jpg";

/***/ }),

/***/ "./src/images/left-arrow.svg":
/*!***********************************!*\
  !*** ./src/images/left-arrow.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "81d1ddb7835b7fa5e0a3.svg";

/***/ }),

/***/ "./src/images/right-arrow.svg":
/*!************************************!*\
  !*** ./src/images/right-arrow.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7a1b0dd5ea10bbcb37c3.svg";

/***/ }),

/***/ "./src/images/search.svg":
/*!*******************************!*\
  !*** ./src/images/search.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3028d4c348c60d8f3d60.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IEljb24gZnJvbSAnLi9pbWFnZXMvc2VhcmNoLnN2Zyc7XHJcbmltcG9ydCBsQXJyb3cgZnJvbSAnLi9pbWFnZXMvbGVmdC1hcnJvdy5zdmcnO1xyXG5pbXBvcnQgckFycm93IGZyb20gJy4vaW1hZ2VzL3JpZ2h0LWFycm93LnN2Zyc7XHJcblxyXG5cclxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG5jb25zdCB3ZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbndlYXRoZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlci1ncmlkJyk7XHJcbi8vIGdldCB1c2VyIGVudGVyZWQgbG9jYXRpb25cclxubGV0IHNsaWRlUG9zID0gMDtcclxuY29uc3QgTlVNX1NMSURFU19ESVNQTEFZID0gNDtcclxuLy8gZ2V0IHN1Ym1pdCBidXR0b24gJiBpbnB1dCBmaWVsZFxyXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0Jyk7XHJcbnN1Ym1pdEJ0bi5zcmMgPSBJY29uO1xyXG5zdWJtaXRCdG4ud2lkdGggPSAnMTgnO1xyXG5cclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlckxvY2F0aW9uJyk7XHJcblxyXG4vLyB0YWtlIHVzZXIgaW5wdXQgbG9jYXRpb24gYW5kIHJldHVybiBjdXJyZW50IHdlYXRoZXIgZm9yZWNhc3QgZm9yIHRvZGF5XHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcclxuICAgIGNvbnN0IE5VTURBWVMgPSAzO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gZmV0Y2ggdGhlIHdlYXRoZXIgZGF0YVxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWYxY2Y2Yjg4ZjUxMzQxN2I5MGQxMTI4NTIyNDE0MDUmcT0ke2xvY2F0aW9ufSZkYXlzPSR7TlVNREFZU31gLCB7IG1vZGU6ICdjb3JzJyB9KTtcclxuXHJcbiAgICAgICAgLy8gd2FpdCB1bnRpbCBkYXRhIGhhcyBiZWVuIGZldGNoZWQsIHRoZW4gc3RvcmUgSlNPTiBpbiBqc29uUmVzcG9uc2VcclxuICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coanNvblJlc3BvbnNlKTtcclxuICAgICAgICBpZiAoanNvblJlc3BvbnNlLmVycm9yKSB0aHJvdyBuZXcgRXJyb3IoanNvblJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gb2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aGUgZGF0YSB3ZSB3YW50XHJcbiAgICAgICAgbGV0IGRheURhdGFBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTURBWVM7IGkrKykge1xyXG4gICAgICAgICAgICBkYXlEYXRhQXJyLnB1c2gocHJvY2Vzc0RhdGEoanNvblJlc3BvbnNlLCBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRheURhdGFBcnIpO1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5IHRoZSB3ZWF0aGVyIGRhdGEgbmljZWx5XHJcbiAgICAgICAgLy9kaXNwbGF5Q29udHJvbGxlcihwcm9jZXNzZWREYXRhKTtcclxuICAgICAgICBkYXlEYXRhQXJyLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpc3BsYXk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA9IGRpc3BsYXlDb250cm9sbGVyLmJpbmQoZGF5RGF0YUFycltpbmRleF0sIGluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5Q29udHJvbGxlci5iaW5kKGRheURhdGFBcnJbaW5kZXhdLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzcGxheSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbn1cclxuXHJcblxyXG4vLyBmYWN0b3J5IGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgcmVxdWlyZWQgaW5mbyBmcm9tIHRoZSBBUEkganNvbiByZXNwb25zZVxyXG5mdW5jdGlvbiBwcm9jZXNzRGF0YShkYXRhVG9Qcm9jZXNzLCBpbmRleCkge1xyXG4gICAgLy8gZ2V0IHRoZSBwcm9wcyB0aGF0IHdlIG5lZWQgLSBiYXNpYyBzaW5nbGUgZGF5XHJcbiAgICAvLyBjb25zdCBjdXJyZW50VGVtcENlbHNpdXMgPSBkYXRhVG9Qcm9jZXNzLmN1cnJlbnQudGVtcF9jOyAgICAgLy8gY3VycmVudCB0ZW1wIGluIGNlbHNpdXNcclxuICAgIC8vIGNvbnN0IGxvY2F0aW9uTmFtZSA9IGRhdGFUb1Byb2Nlc3MubG9jYXRpb24ubmFtZTsgICAgICAgICAgICAvLyBsb2NhdGlvbiBuYW1lXHJcbiAgICAvLyBjb25zdCB3ZWF0aGVyVGV4dCA9IGRhdGFUb1Byb2Nlc3MuY3VycmVudC5jb25kaXRpb24udGV4dDtcclxuICAgIC8vIGNvbnN0IGljb24gPSBkYXRhVG9Qcm9jZXNzLmN1cnJlbnQuY29uZGl0aW9uLmljb24gICAgICAgICAgICAvLyBjdXJyZW50IHdlYXRoZXIgaWNvblxyXG5cclxuICAgIC8vIHJldHVybiB7IGN1cnJlbnRUZW1wQ2Vsc2l1cywgbG9jYXRpb25OYW1lLCB3ZWF0aGVyVGV4dCwgaWNvbiB9O1xyXG5cclxuICAgIC8vIGdldCBmb3JlY2FzdCBvYmplY3RcclxuICAgIGNvbnN0IGZvcmVjYXN0T2JqID0gZGF0YVRvUHJvY2Vzcy5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF07XHJcblxyXG4gICAgLy8gY3VycmVudCB0ZW1wXHJcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGRhdGFUb1Byb2Nlc3MuY3VycmVudC50ZW1wX2M7XHJcbiAgICBjb25zb2xlLmxvZyhgQ3VycmVudCB0ZW1wOiAke2N1cnJlbnRUZW1wfWApO1xyXG5cclxuXHJcbiAgICAvLyAyNCBob3VyIGZvcmVjYXN0XHJcbiAgICBsZXQgdGVtcEFyciA9IGZvcmVjYXN0T2JqLmhvdXIubWFwKGl0ZW0gPT4gaXRlbS50ZW1wX2MpO1xyXG4gICAgbGV0IGljb25BcnIgPSBmb3JlY2FzdE9iai5ob3VyLm1hcChpdGVtID0+IGl0ZW0uY29uZGl0aW9uLmljb24pO1xyXG4gICAgbGV0IGhvdXJBcnIgPSBmb3JlY2FzdE9iai5ob3VyLm1hcChpdGVtID0+IGl0ZW0udGltZSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyBpY29uQXJyKVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRlbXAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnRlbXBfYztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEljb24oaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmNvbmRpdGlvbi5pY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDMgZGF5IGZvcmVjYXN0XHJcbiAgICBjb25zdCB0ZW1wSGlnaCA9IGZvcmVjYXN0T2JqLmRheS5tYXh0ZW1wX2M7XHJcbiAgICBjb25zdCB0ZW1wTG93ID0gZm9yZWNhc3RPYmouZGF5Lm1pbnRlbXBfYztcclxuICAgIGNvbnN0IHRlbXBBdmcgPSBmb3JlY2FzdE9iai5kYXkuYXZndGVtcF9jO1xyXG4gICAgY29uc3QgdGV4dCA9IGZvcmVjYXN0T2JqLmRheS5jb25kaXRpb24udGV4dDtcclxuICAgIGNvbnN0IGljb24gPSBmb3JlY2FzdE9iai5kYXkuY29uZGl0aW9uLmljb247XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRhdGFUb1Byb2Nlc3MubG9jYXRpb24ubmFtZTtcclxuICAgIGNvbnN0IGRhdGUgPSBmb3JlY2FzdE9iai5kYXRlO1xyXG4gICAgcmV0dXJuIHsgdGVtcEhpZ2gsIHRlbXBMb3csIHRlbXBBdmcsIHRleHQsIGljb24sIGxvY2F0aW9uLCBkYXRlLCB0ZW1wQXJyLCBpY29uQXJyLCBob3VyQXJyIH07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Q29udHJvbGxlcihpbmRleCkge1xyXG4gICAgbGV0IGhlYWRlck1zZyA9IFwiXCI7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIC8vIGRpc3BsYXlzIGhlYWRlciB0ZXh0IGlmIGZvcmVjYXN0IGlzIHRvZGF5XHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICBjb25zdCByaWdodEFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgY29uc3QgbGVmdEFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgcmlnaHRBcnJvdy5zcmMgPSByQXJyb3c7XHJcbiAgICAgICAgbGVmdEFycm93LnNyYyA9IGxBcnJvdztcclxuICAgICAgICByaWdodEFycm93LnNldEF0dHJpYnV0ZSgnaWQnLCAncmlnaHQtYXJyb3cnKTtcclxuICAgICAgICBsZWZ0QXJyb3cuc2V0QXR0cmlidXRlKCdpZCcsICdsZWZ0LWFycm93Jyk7XHJcblxyXG4gICAgICAgIGhlYWRlck1zZyA9IGAke3RoaXMudGV4dH0gaW4gJHt0aGlzLmxvY2F0aW9ufSwgd2l0aCBoaWdocyBvZiAke3RoaXMudGVtcEhpZ2h9XFx1MDBCMEMuYDtcclxuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBoZWFkZXJNc2c7XHJcbiAgICAgICAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGVhZGVyLW1zZycpO1xyXG4gICAgICAgIHdlYXRoZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICAvLyAyNGggZm9yZWNhc3RcclxuICAgICAgICB0aGlzLnRlbXBBcnIuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaG91ckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgaW5kZXgpO1xyXG4gICAgICAgICAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXJzJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JlY2FzdEhvdXIgPSBuZXcgRGF0ZSh0aGlzLmhvdXJBcnJbaW5kZXhdKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLUdCJywgeyBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHlwZW9mIGZvcmVjYXN0SG91ci5zcGxpdCgnOicpWzBdKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHlwZW9mIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lID09PSBwYXJzZUludChmb3JlY2FzdEhvdXIuc3BsaXQoJzonKVswXSkpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVTZWN0aW9uLnRleHRDb250ZW50ID0gJ05vdyc7XHJcbiAgICAgICAgICAgICAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVTZWN0aW9uLnRleHRDb250ZW50ID0gZm9yZWNhc3RIb3VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlbXBTZWN0aW9uLnRleHRDb250ZW50ID0gYCR7ZWxlbX1cXHUwMEIwQ2A7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25TZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWNvbkFycltpbmRleF0pO1xyXG4gICAgICAgICAgICBpY29uU2VjdGlvbi5zcmMgPSB0aGlzLmljb25BcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKHRpbWVTZWN0aW9uKTtcclxuICAgICAgICAgICAgaG91ckRpdi5hcHBlbmRDaGlsZChpY29uU2VjdGlvbik7XHJcbiAgICAgICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGVtcFNlY3Rpb24pO1xyXG4gICAgICAgICAgICBob3VybHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdkZXRhaWxlZC1mb3JlY2FzdCcpO1xyXG4gICAgICAgICAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91ckRpdik7XHJcbiAgICAgICAgICAgIGhvdXJseUNvbnRhaW5lci5hcHBlbmRDaGlsZChsZWZ0QXJyb3cpO1xyXG4gICAgICAgICAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRBcnJvdyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGF0cyBmb3IgZWFjaCBkYXlcclxuICAgIGNvbnN0IHN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBjb25zdCBhdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICBjb25zdCBoaWdoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGNvbnN0IGxvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblxyXG4gICAgZGF5LnRleHRDb250ZW50ID0gZ2V0RGF5TmFtZSh0aGlzLmRhdGUsICdlbi1HQicpO1xyXG4gICAgYXZnLnRleHRDb250ZW50ID0gYEF2ZXJhZ2U6ICR7dGhpcy50ZW1wQXZnfVxcdTAwQjBDYDtcclxuICAgIGhpZ2gudGV4dENvbnRlbnQgPSBgSGlnaDogJHt0aGlzLnRlbXBIaWdofVxcdTAwQjBDYDtcclxuICAgIGxvdy50ZXh0Q29udGVudCA9IGBMb3c6ICR7dGhpcy50ZW1wTG93fVxcdTAwQjBDYDtcclxuXHJcbiAgICBzdGF0cy5hcHBlbmRDaGlsZChkYXkpO1xyXG4gICAgc3RhdHMuYXBwZW5kQ2hpbGQoYXZnKTtcclxuICAgIHN0YXRzLmFwcGVuZENoaWxkKGhpZ2gpO1xyXG4gICAgc3RhdHMuYXBwZW5kQ2hpbGQobG93KTtcclxuICAgIC8vIFRPRE86IFJlbW92ZVxyXG4gICAgY29uc29sZS5sb2coc3RhdHMpO1xyXG5cclxuICAgIC8vIHdlYXRoZXIgaWNvblxyXG4gICAgY29uc3QgaW1nVG9EaXNwbGF5ID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWdUb0Rpc3BsYXkuc3JjID0gdGhpcy5pY29uO1xyXG4gICAgaW1nVG9EaXNwbGF5LndpZHRoID0gJzE1MCc7XHJcbiAgICBcclxuICAgIGNvbnN0IHdlYXRoZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKCdncmlkLWl0ZW0nKTtcclxuICAgIHdlYXRoZXJJdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBgaXRlbS0ke2luZGV4fWApXHJcblxyXG4gICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQoaW1nVG9EaXNwbGF5KTtcclxuICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKHN0YXRzKTtcclxuXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJseUNvbnRhaW5lcik7XHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIHNsaWRlUG9zID0gcGFyc2VJbnQoY3VycmVudFBvcyk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTbGlkZXMoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gY2hlY2sgdmFsaWRpdHkgb2YgaW5wdXQgYmVmb3JlIHNlbmRpbmcgdG8gZ2V0V2VhdGhlcigpLiBDdXJyZW50bHkgb25seSBjaGVja3MgdGhhdCBhIHZhbHVlIGhhcyBiZWVuIGVudGVyZWQuXHJcbmZ1bmN0aW9uIGNoZWNrVmFsaWQoaW5wdXQpIHtcclxuICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJyk7XHJcbiAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgaW5wdXQgPT09IHVuZGVmaW5lZCB8fCBpbnB1dC50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgICBlcnJvckRpdi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBlcnJvckRpdi50ZXh0Q29udGVudCA9ICdVaCBvaCwgbG9va3MgbGlrZSB5b3UgaGF2ZW5cXCd0IGVudGVyZWQgYSBsb2NhdGlvbic7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlcnJvckRpdi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBlcnJvckRpdi50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBoZWxwZXIgdG8gY29udmVydCBkYXRlIHRvIGRheVxyXG5mdW5jdGlvbiBnZXREYXlOYW1lKGRhdGVTdHIsIGxvY2FsZSlcclxue1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyKTtcclxuICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgd2Vla2RheTogJ2xvbmcnIH0pOyAgICAgICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2dyZXNzU2xpZGVzKHJpZ2h0ID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob3VycycpO1xyXG5cclxuICAgIC8vIEluY3JlbWVudCBvciBkZWNyZW1lbnQgc2xpZGVQb3MgZGVwZW5kaW5nIG9uIHdoZXRoZXIgcmlnaHQgb3IgbGVmdCBhcnJvdyBjbGlja2VkIFxyXG4gICAgaWYgKHJpZ2h0ICYmIHNsaWRlUG9zIDwgc2xpZGVzLmxlbmd0aCAtIE5VTV9TTElERVNfRElTUExBWSkge1xyXG4gICAgICBzbGlkZVBvcysrO1xyXG4gICAgfSBlbHNlIGlmICghcmlnaHQgJiYgc2xpZGVQb3MgPiAwKSB7XHJcbiAgICAgIHNsaWRlUG9zLS07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gREJHXHJcbiAgICBjb25zb2xlLmxvZyhzbGlkZVBvcyk7XHJcblxyXG4gICAgLy8gY29udHJvbHMgd2hpY2ggc2xpZGVzIGFyZSB2aXNpYmxlXHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IHNsaWRlUG9zICYmIGluZGV4IDwgKHNsaWRlUG9zICsgTlVNX1NMSURFU19ESVNQTEFZKSkge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Zpc2libGUnKSkge1xyXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBwcmV2ZW50IHNsaWRlUG9zIGdvaW5nIG91dCBvZiBib3VuZHMgLSBpLmUuIDAgPD0gc2xpZGUgcG9zIDw9IDIzXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtYXJyb3cnKS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNsaWRlUG9zID49IHNsaWRlcy5sZW5ndGggLSBOVU1fU0xJREVTX0RJU1BMQVkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZnQtYXJyb3cnKS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNsaWRlUG9zIDw9IDApOyBcclxufVxyXG5cclxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgaW5wdXRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXJMb2NhdGlvbicpO1xyXG4gICAgY29uc3QgdXNlcklucHV0ID0gaW5wdXRFbGVtLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2codXNlcklucHV0KTtcclxuICAgIC8vIHByZXZlbnQgZHVwbGljYXRlIGRpc3BsYXkgd2hlbiB1c2VyIHByZXNzZXMgZW50ZXIgbXVsdGlwbGUgdGltZXNcclxuICAgIHdlYXRoZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgaWYgKGNoZWNrVmFsaWQodXNlcklucHV0KSkgZ2V0V2VhdGhlcih1c2VySW5wdXQpO1xyXG59KVxyXG5cclxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdFxyXG4gICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyTG9jYXRpb24nKTtcclxuICAgICAgICBjb25zdCB1c2VySW5wdXQgPSBpbnB1dEVsZW0udmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codXNlcklucHV0KTtcclxuICAgICAgICAvLyBwcmV2ZW50IGR1cGxpY2F0ZSBkaXNwbGF5IHdoZW4gdXNlciBwcmVzc2VzIGVudGVyIG11bHRpcGxlIHRpbWVzXHJcbiAgICAgICAgd2VhdGhlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNoZWNrVmFsaWQodXNlcklucHV0KSkgZ2V0V2VhdGhlcih1c2VySW5wdXQpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlJyk7XHJcbi8vIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9ncmVzc1NsaWRlcylcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnNvbGUubG9nKHRhcmdldC5pZCk7XHJcbiAgICBpZiAodGFyZ2V0LmlkID09PSAncmlnaHQtYXJyb3cnKSB7XHJcbiAgICAgICAgcHJvZ3Jlc3NTbGlkZXModHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PT0gJ2xlZnQtYXJyb3cnKSB7XHJcbiAgICAgICAgcHJvZ3Jlc3NTbGlkZXMoKTtcclxuICAgIH1cclxufSkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9ETV9TYW5zL0RNU2Fucy1WYXJpYWJsZUZvbnRfb3Bzeix3Z2h0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2JhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XHJcbiAgICBmb250LWZhbWlseTogZG1TYW5zO1xyXG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gIH1cclxuXHJcbioge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgICBmb250LWZhbWlseTogIGRtU2Fucywgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtc2l6ZTogMS40ZW07XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XHJcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xyXG59XHJcbmxpIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAvKiB0ZXh0LWFsaWduOiBsZWZ0OyAqL1xyXG59XHJcblxyXG51bCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxufVxyXG5cclxuLnNlYXJjaGJhciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLXRvcDogNSU7XHJcbn1cclxuXHJcbmlucHV0IHtcclxuICAgIGFsbDogdW5zZXQ7XHJcbiAgICBib3JkZXItbGVmdDogMDtcclxuICAgIGJvcmRlci10b3A6IDA7XHJcbiAgICBib3JkZXItcmlnaHQ6IDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuI3N1Ym1pdCB7XHJcbiAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDsgKi9cclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmVycm9yIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCA1MCUpO1xyXG59XHJcblxyXG4ud2VhdGhlci1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGNvbHVtbi1nYXA6IDIwcHg7XHJcbiAgICAvKiBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7ICovXHJcbn1cclxuXHJcbiNoZWFkZXItbXNnIHtcclxuICAgIC8qIGdyaWQtY29sdW1uOiAxIC8gNDsgKi9cclxuICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTAwcHggMTBweDtcclxufVxyXG5cclxuI2RldGFpbGVkLWZvcmVjYXN0IHtcclxuICAgIGZsZXgtYmFzaXM6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDIwcHggMDtcclxuICAgIGNvbG9yOiByZ2JhKDE2LCAyNTUsIDIzMywgMC44Nyk7XHJcbiAgICBjb2x1bW4tZ2FwOiAyMHB4O1xyXG59XHJcblxyXG4jZGV0YWlsZWQtZm9yZWNhc3QgZGl2IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuI3JpZ2h0LWFycm93LFxyXG4jbGVmdC1hcnJvdyB7XHJcbiAgICB3aWR0aDogMzJweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuI3JpZ2h0LWFycm93IHtcclxuICAgIG9yZGVyOiAyO1xyXG59XHJcblxyXG4jbGVmdC1hcnJvdyB7XHJcbiAgICBvcmRlcjogMTtcclxufVxyXG5cclxuI3JpZ2h0LWFycm93LmRpc2FibGVkLFxyXG4jbGVmdC1hcnJvdy5kaXNhYmxlZCB7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG59XHJcbi5ncmlkLWl0ZW0ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzkxYmFjZDtcclxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICM5MWJhY2Q7ICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjNzO1xyXG4gICAgcGFkZGluZzogNnB4IDE2cHg7XHJcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xyXG59XHJcblxyXG4uZ3JpZC1pdGVtOmhvdmVyIHtcclxuICAgIGJveC1zaGFkb3c6IDAgOHB4IDE2cHggMCByZ2JhKDAsMCwwLDAuMik7XHJcbn1cclxuXHJcbi5ob3VycyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgb3JkZXI6IDI7XHJcbn1cclxuXHJcbi52aXNpYmxlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC4zO1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY1MHB4KSB7XHJcbiAgICAjaGVhZGVyLW1zZyB7cGFkZGluZzogNTBweCAxMHB4O31cclxuICAgIC5ncmlkLWl0ZW0geyB3aWR0aDogNjAlOyBkaXNwbGF5OiBmbGV4OyB0ZXh0LWFsaWduOiBsZWZ0O31cclxuICAgIC53ZWF0aGVyLWdyaWQgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyByb3ctZ2FwOiAyMHB4OyBhbGlnbi1pdGVtczogY2VudGVyO31cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0NTVweCkge1xyXG4gICAgLmdyaWQtaXRlbSB7IHdpZHRoOiAxMDAlOyB9XHJcbn1cclxuXHJcbi8qIHByZXZlbnQgYmx1ZSBhdXRvZmlsbCBiYWNrZ3JvdW5kIC0gc29sdXRpb24gdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTEzMTk0NC9ob3ctdG8tcmVtb3ZlLWJsdWUtYmFja2dyb3VuZC1vbi1jaHJvbWUtYXV0b2NvbXBsZXRlICovXHJcbi8qIGlucHV0Oi13ZWJraXQtYXV0b2ZpbGwsXHJcbmlucHV0Oi13ZWJraXQtYXV0b2ZpbGw6aG92ZXIsXHJcbmlucHV0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGwsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGw6aG92ZXIsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXHJcbnNlbGVjdDotd2Via2l0LWF1dG9maWxsLFxyXG5zZWxlY3Q6LXdlYmtpdC1hdXRvZmlsbDpob3Zlcixcclxuc2VsZWN0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMge1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDBweCAxMDAwcHggI2ZmZmZmZiBpbnNldCAhaW1wb3J0YW50O1xyXG59ICovYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksbUJBQW1CO0lBQ25CLDRDQUE4RDtJQUM5RCxnQkFBZ0I7RUFDbEI7O0FBRUY7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0lBQ2hCLHlEQUE4QztJQUM5QywrQkFBK0I7QUFDbkM7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksVUFBVTtJQUNWLGNBQWM7SUFDZCxhQUFhO0lBQ2IsZUFBZTtJQUNmLDhCQUE4QjtJQUM5Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSTs7ZUFFVztJQUNYLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtJQUNmLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEI7O3lDQUVxQztBQUN6Qzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsY0FBYztJQUNkLCtCQUErQjtJQUMvQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7O0lBRUksV0FBVztJQUNYLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxRQUFRO0FBQ1o7O0FBRUE7SUFDSSxRQUFRO0FBQ1o7O0FBRUE7O0lBRUksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLCtCQUErQjtJQUMvQixrQkFBa0I7SUFDbEIsdUNBQXVDO0lBQ3ZDLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFFBQVE7QUFDWjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYSxrQkFBa0IsQ0FBQztJQUNoQyxhQUFhLFVBQVUsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7SUFDekQsZ0JBQWdCLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQztBQUMvRTs7QUFFQTtJQUNJLGFBQWEsV0FBVyxFQUFFO0FBQzlCOztBQUVBLDZKQUE2SjtBQUM3Sjs7Ozs7Ozs7OztHQVVHXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgICBmb250LWZhbWlseTogZG1TYW5zO1xcclxcbiAgICBzcmM6IHVybCgnLi9mb250cy9ETV9TYW5zL0RNU2Fucy1WYXJpYWJsZUZvbnRfb3BzelxcXFwsd2dodC50dGYnKTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4qIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAgZG1TYW5zLCBzYW5zLXNlcmlmO1xcclxcbiAgICBmb250LXNpemU6IDEuNGVtO1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvYmFja2dyb3VuZC5qcGcpO1xcclxcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xcclxcbn1cXHJcXG5saSB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIC8qIHRleHQtYWxpZ246IGxlZnQ7ICovXFxyXFxufVxcclxcblxcclxcbnVsIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5zZWFyY2hiYXIge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nLXRvcDogNSU7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gICAgYWxsOiB1bnNldDtcXHJcXG4gICAgYm9yZGVyLWxlZnQ6IDA7XFxyXFxuICAgIGJvcmRlci10b3A6IDA7XFxyXFxuICAgIGJvcmRlci1yaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuI3N1Ym1pdCB7XFxyXFxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICByaWdodDogMDsgKi9cXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3Ige1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5hY3RpdmUge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDUwJTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgNTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItZ3JpZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDIwcHg7XFxyXFxuICAgIC8qIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7ICovXFxyXFxufVxcclxcblxcclxcbiNoZWFkZXItbXNnIHtcXHJcXG4gICAgLyogZ3JpZC1jb2x1bW46IDEgLyA0OyAqL1xcclxcbiAgICBmb250LXNpemU6IDEuNWVtO1xcclxcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDEwMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNkZXRhaWxlZC1mb3JlY2FzdCB7XFxyXFxuICAgIGZsZXgtYmFzaXM6IDEwMCU7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweCAwO1xcclxcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZGV0YWlsZWQtZm9yZWNhc3QgZGl2IHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jcmlnaHQtYXJyb3csXFxyXFxuI2xlZnQtYXJyb3cge1xcclxcbiAgICB3aWR0aDogMzJweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jcmlnaHQtYXJyb3cge1xcclxcbiAgICBvcmRlcjogMjtcXHJcXG59XFxyXFxuXFxyXFxuI2xlZnQtYXJyb3cge1xcclxcbiAgICBvcmRlcjogMTtcXHJcXG59XFxyXFxuXFxyXFxuI3JpZ2h0LWFycm93LmRpc2FibGVkLFxcclxcbiNsZWZ0LWFycm93LmRpc2FibGVkIHtcXHJcXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXHJcXG59XFxyXFxuLmdyaWQtaXRlbSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzkxYmFjZDtcXHJcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogIzkxYmFjZDsgKi9cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsMCwwLDAuMik7XFxyXFxuICAgIHRyYW5zaXRpb246IDAuM3M7XFxyXFxuICAgIHBhZGRpbmc6IDZweCAxNnB4O1xcclxcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1pdGVtOmhvdmVyIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCA4cHggMTZweCAwIHJnYmEoMCwwLDAsMC4yKTtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJzIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgb3JkZXI6IDI7XFxyXFxufVxcclxcblxcclxcbi52aXNpYmxlIHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5kaXNhYmxlZCB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NTBweCkge1xcclxcbiAgICAjaGVhZGVyLW1zZyB7cGFkZGluZzogNTBweCAxMHB4O31cXHJcXG4gICAgLmdyaWQtaXRlbSB7IHdpZHRoOiA2MCU7IGRpc3BsYXk6IGZsZXg7IHRleHQtYWxpZ246IGxlZnQ7fVxcclxcbiAgICAud2VhdGhlci1ncmlkIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgcm93LWdhcDogMjBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjt9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDU1cHgpIHtcXHJcXG4gICAgLmdyaWQtaXRlbSB7IHdpZHRoOiAxMDAlOyB9XFxyXFxufVxcclxcblxcclxcbi8qIHByZXZlbnQgYmx1ZSBhdXRvZmlsbCBiYWNrZ3JvdW5kIC0gc29sdXRpb24gdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTEzMTk0NC9ob3ctdG8tcmVtb3ZlLWJsdWUtYmFja2dyb3VuZC1vbi1jaHJvbWUtYXV0b2NvbXBsZXRlICovXFxyXFxuLyogaW5wdXQ6LXdlYmtpdC1hdXRvZmlsbCxcXHJcXG5pbnB1dDotd2Via2l0LWF1dG9maWxsOmhvdmVyLFxcclxcbmlucHV0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXFxyXFxudGV4dGFyZWE6LXdlYmtpdC1hdXRvZmlsbCxcXHJcXG50ZXh0YXJlYTotd2Via2l0LWF1dG9maWxsOmhvdmVyLFxcclxcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXFxyXFxuc2VsZWN0Oi13ZWJraXQtYXV0b2ZpbGwsXFxyXFxuc2VsZWN0Oi13ZWJraXQtYXV0b2ZpbGw6aG92ZXIsXFxyXFxuc2VsZWN0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMge1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMHB4IDEwMDBweCAjZmZmZmZmIGluc2V0ICFpbXBvcnRhbnQ7XFxyXFxufSAqL1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJJY29uIiwibEFycm93IiwickFycm93IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndlYXRoZXJDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2xpZGVQb3MiLCJOVU1fU0xJREVTX0RJU1BMQVkiLCJzdWJtaXRCdG4iLCJzcmMiLCJ3aWR0aCIsImlucHV0IiwiZ2V0V2VhdGhlciIsImxvY2F0aW9uIiwiTlVNREFZUyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwianNvblJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIkVycm9yIiwibWVzc2FnZSIsImRheURhdGFBcnIiLCJpIiwicHVzaCIsInByb2Nlc3NEYXRhIiwiZm9yRWFjaCIsImRheSIsImluZGV4IiwiZGlzcGxheSIsImRpc3BsYXlDb250cm9sbGVyIiwiYmluZCIsImFsZXJ0IiwiZGF0YVRvUHJvY2VzcyIsImZvcmVjYXN0T2JqIiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImN1cnJlbnRUZW1wIiwiY3VycmVudCIsInRlbXBfYyIsInRlbXBBcnIiLCJob3VyIiwibWFwIiwiaXRlbSIsImljb25BcnIiLCJjb25kaXRpb24iLCJpY29uIiwiaG91ckFyciIsInRpbWUiLCJnZXRUZW1wIiwiZ2V0SWNvbiIsInRlbXBIaWdoIiwibWF4dGVtcF9jIiwidGVtcExvdyIsIm1pbnRlbXBfYyIsInRlbXBBdmciLCJhdmd0ZW1wX2MiLCJ0ZXh0IiwibmFtZSIsImRhdGUiLCJoZWFkZXJNc2ciLCJoZWFkZXIiLCJob3VybHlDb250YWluZXIiLCJyaWdodEFycm93IiwibGVmdEFycm93Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImVsZW0iLCJob3VyRGl2IiwidGltZVNlY3Rpb24iLCJjdXJyZW50VGltZSIsIkRhdGUiLCJnZXRIb3VycyIsImZvcmVjYXN0SG91ciIsInRvTG9jYWxlVGltZVN0cmluZyIsIm1pbnV0ZSIsInNwbGl0IiwicGFyc2VJbnQiLCJ0ZW1wU2VjdGlvbiIsImljb25TZWN0aW9uIiwic3RhdHMiLCJhdmciLCJoaWdoIiwibG93IiwiZ2V0RGF5TmFtZSIsImltZ1RvRGlzcGxheSIsIkltYWdlIiwid2VhdGhlckl0ZW0iLCJjdXJyZW50U2xpZGUiLCJxdWVyeVNlbGVjdG9yIiwiY3VycmVudFBvcyIsImdldEF0dHJpYnV0ZSIsInByb2dyZXNzU2xpZGVzIiwiY2hlY2tWYWxpZCIsImVycm9yRGl2IiwidW5kZWZpbmVkIiwidHJpbSIsInJlbW92ZSIsImRhdGVTdHIiLCJsb2NhbGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ3ZWVrZGF5IiwicmlnaHQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzbGlkZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2xpZGUiLCJjb250YWlucyIsInRvZ2dsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaW5wdXRFbGVtIiwidXNlcklucHV0IiwidmFsdWUiLCJrZXkiLCJ0YXJnZXQiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=