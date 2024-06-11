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
    position: absolute;
    top: 50%;
    width: 32px;
    cursor: pointer;
}

#right-arrow {
    right: 33%;
}

#left-arrow {
    left: 33%;
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
}

.visible {
    display: block;
}

.disabled {
    opacity: 0.3;
}

@media only screen and (max-width: 650px) {
    #header-msg {padding: 50px 10px;}
    .grid-item { width: 60%;}
    .weather-grid { flex-direction: column; row-gap: 20px; align-items: center;}
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
} */`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,4CAA8D;IAC9D,gBAAgB;EAClB;;AAEF;IACI,sBAAsB;AAC1B;;AAEA;IACI,gCAAgC;IAChC,gBAAgB;IAChB,yDAA8C;IAC9C,+BAA+B;AACnC;AACA;IACI,gBAAgB;IAChB,sBAAsB;AAC1B;;AAEA;IACI,SAAS;IACT,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,eAAe;IACf,qBAAqB;IACrB,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,eAAe;AACnB;;AAEA;IACI,UAAU;IACV,cAAc;IACd,aAAa;IACb,eAAe;IACf,8BAA8B;IAC9B,uBAAuB;AAC3B;;AAEA;IACI;;eAEW;IACX,eAAe;AACnB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,SAAS;IACT,+BAA+B;AACnC;;AAEA;IACI,aAAa;IACb,eAAe;IACf,uBAAuB;IACvB,gBAAgB;IAChB;;yCAEqC;AACzC;;AAEA;IACI,wBAAwB;IACxB,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,cAAc;IACd,+BAA+B;IAC/B,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;;IAEI,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,eAAe;AACnB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,SAAS;AACb;;AAEA;;IAEI,mBAAmB;AACvB;AACA;IACI,kBAAkB;IAClB,yBAAyB;IACzB,+BAA+B;IAC/B,kBAAkB;IAClB,uCAAuC;IACvC,gBAAgB;IAChB,iBAAiB;IACjB,+BAA+B;AACnC;;AAEA;IACI,wCAAwC;AAC5C;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa,kBAAkB,CAAC;IAChC,aAAa,UAAU,CAAC;IACxB,gBAAgB,sBAAsB,EAAE,aAAa,EAAE,mBAAmB,CAAC;AAC/E;;AAEA,6JAA6J;AAC7J;;;;;;;;;;GAUG","sourcesContent":["@font-face {\r\n    font-family: dmSans;\r\n    src: url('./fonts/DM_Sans/DMSans-VariableFont_opsz\\,wght.ttf');\r\n    font-weight: 400;\r\n  }\r\n\r\n* {\r\n    box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n    font-family:  dmSans, sans-serif;\r\n    font-size: 1.4em;\r\n    background-image: url(./images/background.jpg);\r\n    color: rgba(16, 255, 233, 0.87);\r\n}\r\nli {\r\n    list-style: none;\r\n    /* text-align: left; */\r\n}\r\n\r\nul {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    flex-wrap: wrap;\r\n    align-content: center;\r\n    align-items: flex-start;\r\n}\r\n\r\n.searchbar {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    padding-top: 5%;\r\n}\r\n\r\ninput {\r\n    all: unset;\r\n    border-left: 0;\r\n    border-top: 0;\r\n    border-right: 0;\r\n    border-bottom: 1px solid black;\r\n    background: transparent;\r\n}\r\n\r\n#submit {\r\n    /* position: absolute;\r\n    top: 0;\r\n    right: 0; */\r\n    cursor: pointer;\r\n}\r\n\r\n.error {\r\n    color: white;\r\n}\r\n\r\n.active {\r\n    background-color: red;\r\n    border-radius: 5px;\r\n    padding: 5px;\r\n    position: absolute;\r\n    left: 50%;\r\n    transform: translate(-50%, 50%);\r\n}\r\n\r\n.weather-grid {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    justify-content: center;\r\n    column-gap: 20px;\r\n    /* display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    grid-template-rows: repeat(2, 1fr); */\r\n}\r\n\r\n#header-msg {\r\n    /* grid-column: 1 / 4; */\r\n    font-size: 1.5em;\r\n    flex-basis: 100%;\r\n    text-align: center;\r\n    padding: 100px 10px;\r\n}\r\n\r\n#detailed-forecast {\r\n    flex-basis: 100%;\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin: 20px 0;\r\n    color: rgba(16, 255, 233, 0.87);\r\n    column-gap: 20px;\r\n}\r\n\r\n#detailed-forecast div {\r\n    text-align: center;\r\n}\r\n\r\n#right-arrow,\r\n#left-arrow {\r\n    position: absolute;\r\n    top: 50%;\r\n    width: 32px;\r\n    cursor: pointer;\r\n}\r\n\r\n#right-arrow {\r\n    right: 33%;\r\n}\r\n\r\n#left-arrow {\r\n    left: 33%;\r\n}\r\n\r\n#right-arrow.disabled,\r\n#left-arrow.disabled {\r\n    cursor: not-allowed;\r\n}\r\n.grid-item {\r\n    text-align: center;\r\n    border: 1px solid #91bacd;\r\n    /* background-color: #91bacd; */\r\n    border-radius: 5px;\r\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\r\n    transition: 0.3s;\r\n    padding: 6px 16px;\r\n    color: rgba(16, 255, 233, 0.87);\r\n}\r\n\r\n.grid-item:hover {\r\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\r\n}\r\n\r\n.hours {\r\n    display: none;\r\n}\r\n\r\n.visible {\r\n    display: block;\r\n}\r\n\r\n.disabled {\r\n    opacity: 0.3;\r\n}\r\n\r\n@media only screen and (max-width: 650px) {\r\n    #header-msg {padding: 50px 10px;}\r\n    .grid-item { width: 60%;}\r\n    .weather-grid { flex-direction: column; row-gap: 20px; align-items: center;}\r\n}\r\n\r\n/* prevent blue autofill background - solution taken from https://stackoverflow.com/questions/55131944/how-to-remove-blue-background-on-chrome-autocomplete */\r\n/* input:-webkit-autofill,\r\ninput:-webkit-autofill:hover,\r\ninput:-webkit-autofill:focus,\r\ntextarea:-webkit-autofill,\r\ntextarea:-webkit-autofill:hover,\r\ntextarea:-webkit-autofill:focus,\r\nselect:-webkit-autofill,\r\nselect:-webkit-autofill:hover,\r\nselect:-webkit-autofill:focus {\r\n  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;\r\n} */"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS1yZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBJY29uIGZyb20gJy4vaW1hZ2VzL3NlYXJjaC5zdmcnO1xyXG5pbXBvcnQgbEFycm93IGZyb20gJy4vaW1hZ2VzL2xlZnQtYXJyb3cuc3ZnJztcclxuaW1wb3J0IHJBcnJvdyBmcm9tICcuL2ltYWdlcy9yaWdodC1hcnJvdy5zdmcnO1xyXG5cclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuY29uc3Qgd2VhdGhlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG53ZWF0aGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXItZ3JpZCcpO1xyXG4vLyBnZXQgdXNlciBlbnRlcmVkIGxvY2F0aW9uXHJcbmxldCBzbGlkZVBvcyA9IDA7XHJcbmNvbnN0IE5VTV9TTElERVNfRElTUExBWSA9IDQ7XHJcbi8vIGdldCBzdWJtaXQgYnV0dG9uICYgaW5wdXQgZmllbGRcclxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpO1xyXG5zdWJtaXRCdG4uc3JjID0gSWNvbjtcclxuc3VibWl0QnRuLndpZHRoID0gJzE4JztcclxuXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXJMb2NhdGlvbicpO1xyXG5cclxuLy8gdGFrZSB1c2VyIGlucHV0IGxvY2F0aW9uIGFuZCByZXR1cm4gY3VycmVudCB3ZWF0aGVyIGZvcmVjYXN0IGZvciB0b2RheVxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCBOVU1EQVlTID0gMztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIGZldGNoIHRoZSB3ZWF0aGVyIGRhdGFcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1mMWNmNmI4OGY1MTM0MTdiOTBkMTEyODUyMjQxNDA1JnE9JHtsb2NhdGlvbn0mZGF5cz0ke05VTURBWVN9YCwgeyBtb2RlOiAnY29ycycgfSk7XHJcblxyXG4gICAgICAgIC8vIHdhaXQgdW50aWwgZGF0YSBoYXMgYmVlbiBmZXRjaGVkLCB0aGVuIHN0b3JlIEpTT04gaW4ganNvblJlc3BvbnNlXHJcbiAgICAgICAgY29uc3QganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGpzb25SZXNwb25zZSk7XHJcbiAgICAgICAgaWYgKGpzb25SZXNwb25zZS5lcnJvcikgdGhyb3cgbmV3IEVycm9yKGpzb25SZXNwb25zZS5lcnJvci5tZXNzYWdlKTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIG9iamVjdCBjb250YWluaW5nIG9ubHkgdGhlIGRhdGEgd2Ugd2FudFxyXG4gICAgICAgIGxldCBkYXlEYXRhQXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1EQVlTOyBpKyspIHtcclxuICAgICAgICAgICAgZGF5RGF0YUFyci5wdXNoKHByb2Nlc3NEYXRhKGpzb25SZXNwb25zZSwgaSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXlEYXRhQXJyKTtcclxuXHJcbiAgICAgICAgLy8gZGlzcGxheSB0aGUgd2VhdGhlciBkYXRhIG5pY2VseVxyXG4gICAgICAgIC8vZGlzcGxheUNvbnRyb2xsZXIocHJvY2Vzc2VkRGF0YSk7XHJcbiAgICAgICAgZGF5RGF0YUFyci5mb3JFYWNoKChkYXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXNwbGF5O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5Q29udHJvbGxlci5iaW5kKGRheURhdGFBcnJbaW5kZXhdLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheUNvbnRyb2xsZXIuYmluZChkYXlEYXRhQXJyW2luZGV4XSwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpc3BsYXkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuLy8gZmFjdG9yeSBmdW5jdGlvbiB0byByZXR1cm4gdGhlIHJlcXVpcmVkIGluZm8gZnJvbSB0aGUgQVBJIGpzb24gcmVzcG9uc2VcclxuZnVuY3Rpb24gcHJvY2Vzc0RhdGEoZGF0YVRvUHJvY2VzcywgaW5kZXgpIHtcclxuICAgIC8vIGdldCB0aGUgcHJvcHMgdGhhdCB3ZSBuZWVkIC0gYmFzaWMgc2luZ2xlIGRheVxyXG4gICAgLy8gY29uc3QgY3VycmVudFRlbXBDZWxzaXVzID0gZGF0YVRvUHJvY2Vzcy5jdXJyZW50LnRlbXBfYzsgICAgIC8vIGN1cnJlbnQgdGVtcCBpbiBjZWxzaXVzXHJcbiAgICAvLyBjb25zdCBsb2NhdGlvbk5hbWUgPSBkYXRhVG9Qcm9jZXNzLmxvY2F0aW9uLm5hbWU7ICAgICAgICAgICAgLy8gbG9jYXRpb24gbmFtZVxyXG4gICAgLy8gY29uc3Qgd2VhdGhlclRleHQgPSBkYXRhVG9Qcm9jZXNzLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAvLyBjb25zdCBpY29uID0gZGF0YVRvUHJvY2Vzcy5jdXJyZW50LmNvbmRpdGlvbi5pY29uICAgICAgICAgICAgLy8gY3VycmVudCB3ZWF0aGVyIGljb25cclxuXHJcbiAgICAvLyByZXR1cm4geyBjdXJyZW50VGVtcENlbHNpdXMsIGxvY2F0aW9uTmFtZSwgd2VhdGhlclRleHQsIGljb24gfTtcclxuXHJcbiAgICAvLyBnZXQgZm9yZWNhc3Qgb2JqZWN0XHJcbiAgICBjb25zdCBmb3JlY2FzdE9iaiA9IGRhdGFUb1Byb2Nlc3MuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdO1xyXG5cclxuICAgIC8vIGN1cnJlbnQgdGVtcFxyXG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBkYXRhVG9Qcm9jZXNzLmN1cnJlbnQudGVtcF9jO1xyXG4gICAgY29uc29sZS5sb2coYEN1cnJlbnQgdGVtcDogJHtjdXJyZW50VGVtcH1gKTtcclxuXHJcblxyXG4gICAgLy8gMjQgaG91ciBmb3JlY2FzdFxyXG4gICAgbGV0IHRlbXBBcnIgPSBmb3JlY2FzdE9iai5ob3VyLm1hcChpdGVtID0+IGl0ZW0udGVtcF9jKTtcclxuICAgIGxldCBpY29uQXJyID0gZm9yZWNhc3RPYmouaG91ci5tYXAoaXRlbSA9PiBpdGVtLmNvbmRpdGlvbi5pY29uKTtcclxuICAgIGxldCBob3VyQXJyID0gZm9yZWNhc3RPYmouaG91ci5tYXAoaXRlbSA9PiBpdGVtLnRpbWUpO1xyXG4gICAgLy8gY29uc29sZS5sb2cgaWNvbkFycilcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUZW1wKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gaXRlbS50ZW1wX2M7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRJY29uKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gaXRlbS5jb25kaXRpb24uaWNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAzIGRheSBmb3JlY2FzdFxyXG4gICAgY29uc3QgdGVtcEhpZ2ggPSBmb3JlY2FzdE9iai5kYXkubWF4dGVtcF9jO1xyXG4gICAgY29uc3QgdGVtcExvdyA9IGZvcmVjYXN0T2JqLmRheS5taW50ZW1wX2M7XHJcbiAgICBjb25zdCB0ZW1wQXZnID0gZm9yZWNhc3RPYmouZGF5LmF2Z3RlbXBfYztcclxuICAgIGNvbnN0IHRleHQgPSBmb3JlY2FzdE9iai5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICBjb25zdCBpY29uID0gZm9yZWNhc3RPYmouZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBkYXRhVG9Qcm9jZXNzLmxvY2F0aW9uLm5hbWU7XHJcbiAgICBjb25zdCBkYXRlID0gZm9yZWNhc3RPYmouZGF0ZTtcclxuICAgIHJldHVybiB7IHRlbXBIaWdoLCB0ZW1wTG93LCB0ZW1wQXZnLCB0ZXh0LCBpY29uLCBsb2NhdGlvbiwgZGF0ZSwgdGVtcEFyciwgaWNvbkFyciwgaG91ckFyciB9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUNvbnRyb2xsZXIoaW5kZXgpIHtcclxuICAgIGxldCBoZWFkZXJNc2cgPSBcIlwiO1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAvLyBkaXNwbGF5cyBoZWFkZXIgdGV4dCBpZiBmb3JlY2FzdCBpcyB0b2RheVxyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcmlnaHRBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGNvbnN0IGxlZnRBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIHJpZ2h0QXJyb3cuc3JjID0gckFycm93O1xyXG4gICAgICAgIGxlZnRBcnJvdy5zcmMgPSBsQXJyb3c7XHJcbiAgICAgICAgcmlnaHRBcnJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JpZ2h0LWFycm93Jyk7XHJcbiAgICAgICAgbGVmdEFycm93LnNldEF0dHJpYnV0ZSgnaWQnLCAnbGVmdC1hcnJvdycpO1xyXG5cclxuICAgICAgICBoZWFkZXJNc2cgPSBgJHt0aGlzLnRleHR9IGluICR7dGhpcy5sb2NhdGlvbn0sIHdpdGggaGlnaHMgb2YgJHt0aGlzLnRlbXBIaWdofVxcdTAwQjBDLmA7XHJcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gaGVhZGVyTXNnO1xyXG4gICAgICAgIGhlYWRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hlYWRlci1tc2cnKTtcclxuICAgICAgICB3ZWF0aGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgLy8gMjRoIGZvcmVjYXN0XHJcbiAgICAgICAgdGhpcy50ZW1wQXJyLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBob3VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhvdXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsIGluZGV4KTtcclxuICAgICAgICAgICAgaG91ckRpdi5jbGFzc0xpc3QuYWRkKCdob3VycycpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RIb3VyID0gbmV3IERhdGUodGhpcy5ob3VyQXJyW2luZGV4XSkudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1HQicsIHsgaG91cjogXCIyLWRpZ2l0XCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBmb3JlY2FzdEhvdXIuc3BsaXQoJzonKVswXSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBjdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSA9PT0gcGFyc2VJbnQoZm9yZWNhc3RIb3VyLnNwbGl0KCc6JylbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lU2VjdGlvbi50ZXh0Q29udGVudCA9ICdOb3cnO1xyXG4gICAgICAgICAgICAgICAgaG91ckRpdi5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lU2VjdGlvbi50ZXh0Q29udGVudCA9IGZvcmVjYXN0SG91cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0ZW1wU2VjdGlvbi50ZXh0Q29udGVudCA9IGAke2VsZW19XFx1MDBCMENgO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmljb25BcnJbaW5kZXhdKTtcclxuICAgICAgICAgICAgaWNvblNlY3Rpb24uc3JjID0gdGhpcy5pY29uQXJyW2luZGV4XTtcclxuICAgICAgICAgICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0aW1lU2VjdGlvbik7XHJcbiAgICAgICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQoaWNvblNlY3Rpb24pO1xyXG4gICAgICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKHRlbXBTZWN0aW9uKTtcclxuICAgICAgICAgICAgaG91cmx5Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGV0YWlsZWQtZm9yZWNhc3QnKTtcclxuICAgICAgICAgICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJEaXYpO1xyXG4gICAgICAgICAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdEFycm93KTtcclxuICAgICAgICAgICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0QXJyb3cpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhdHMgZm9yIGVhY2ggZGF5XHJcbiAgICBjb25zdCBzdGF0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgY29uc3QgYXZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxyXG4gICAgY29uc3QgaGlnaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBjb25zdCBsb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgIGRheS50ZXh0Q29udGVudCA9IGdldERheU5hbWUodGhpcy5kYXRlLCAnZW4tR0InKTtcclxuICAgIGF2Zy50ZXh0Q29udGVudCA9IGBBdmVyYWdlOiAke3RoaXMudGVtcEF2Z31cXHUwMEIwQ2A7XHJcbiAgICBoaWdoLnRleHRDb250ZW50ID0gYEhpZ2g6ICR7dGhpcy50ZW1wSGlnaH1cXHUwMEIwQ2A7XHJcbiAgICBsb3cudGV4dENvbnRlbnQgPSBgTG93OiAke3RoaXMudGVtcExvd31cXHUwMEIwQ2A7XHJcblxyXG4gICAgc3RhdHMuYXBwZW5kQ2hpbGQoZGF5KTtcclxuICAgIHN0YXRzLmFwcGVuZENoaWxkKGF2Zyk7XHJcbiAgICBzdGF0cy5hcHBlbmRDaGlsZChoaWdoKTtcclxuICAgIHN0YXRzLmFwcGVuZENoaWxkKGxvdyk7XHJcbiAgICAvLyBUT0RPOiBSZW1vdmVcclxuICAgIGNvbnNvbGUubG9nKHN0YXRzKTtcclxuXHJcbiAgICAvLyB3ZWF0aGVyIGljb25cclxuICAgIGNvbnN0IGltZ1RvRGlzcGxheSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nVG9EaXNwbGF5LnNyYyA9IHRoaXMuaWNvbjtcclxuICAgIGltZ1RvRGlzcGxheS53aWR0aCA9ICcxNTAnO1xyXG4gICAgXHJcbiAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZCgnZ3JpZC1pdGVtJyk7XHJcbiAgICB3ZWF0aGVySXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYGl0ZW0tJHtpbmRleH1gKVxyXG5cclxuICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKGltZ1RvRGlzcGxheSk7XHJcbiAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZChzdGF0cyk7XHJcblxyXG4gICAgd2VhdGhlckNvbnRhaW5lci5hcHBlbmRDaGlsZChob3VybHlDb250YWluZXIpO1xyXG4gICAgd2VhdGhlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlckNvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50UG9zID0gY3VycmVudFNsaWRlLmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICBzbGlkZVBvcyA9IHBhcnNlSW50KGN1cnJlbnRQb3MpO1xyXG4gICAgICAgIHByb2dyZXNzU2xpZGVzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGNoZWNrIHZhbGlkaXR5IG9mIGlucHV0IGJlZm9yZSBzZW5kaW5nIHRvIGdldFdlYXRoZXIoKS4gQ3VycmVudGx5IG9ubHkgY2hlY2tzIHRoYXQgYSB2YWx1ZSBoYXMgYmVlbiBlbnRlcmVkLlxyXG5mdW5jdGlvbiBjaGVja1ZhbGlkKGlucHV0KSB7XHJcbiAgICBjb25zdCBlcnJvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpO1xyXG4gICAgaWYgKGlucHV0ID09PSBudWxsIHx8IGlucHV0ID09PSB1bmRlZmluZWQgfHwgaW5wdXQudHJpbSgpID09PSBcIlwiKSB7XHJcbiAgICAgICAgZXJyb3JEaXYuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZXJyb3JEaXYudGV4dENvbnRlbnQgPSAnVWggb2gsIGxvb2tzIGxpa2UgeW91IGhhdmVuXFwndCBlbnRlcmVkIGEgbG9jYXRpb24nO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JEaXYuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZXJyb3JEaXYudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaGVscGVyIHRvIGNvbnZlcnQgZGF0ZSB0byBkYXlcclxuZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlU3RyLCBsb2NhbGUpXHJcbntcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XHJcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KTsgICAgICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9ncmVzc1NsaWRlcyhyaWdodCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG91cnMnKTtcclxuXHJcbiAgICAvLyBJbmNyZW1lbnQgb3IgZGVjcmVtZW50IHNsaWRlUG9zIGRlcGVuZGluZyBvbiB3aGV0aGVyIHJpZ2h0IG9yIGxlZnQgYXJyb3cgY2xpY2tlZCBcclxuICAgIGlmIChyaWdodCAmJiBzbGlkZVBvcyA8IHNsaWRlcy5sZW5ndGggLSBOVU1fU0xJREVTX0RJU1BMQVkpIHtcclxuICAgICAgc2xpZGVQb3MrKztcclxuICAgIH0gZWxzZSBpZiAoIXJpZ2h0ICYmIHNsaWRlUG9zID4gMCkge1xyXG4gICAgICBzbGlkZVBvcy0tO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERCR1xyXG4gICAgY29uc29sZS5sb2coc2xpZGVQb3MpO1xyXG5cclxuICAgIC8vIGNvbnRyb2xzIHdoaWNoIHNsaWRlcyBhcmUgdmlzaWJsZVxyXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSBzbGlkZVBvcyAmJiBpbmRleCA8IChzbGlkZVBvcyArIE5VTV9TTElERVNfRElTUExBWSkpIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gcHJldmVudCBzbGlkZVBvcyBnb2luZyBvdXQgb2YgYm91bmRzIC0gaS5lLiAwIDw9IHNsaWRlIHBvcyA8PSAyM1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LWFycm93JykuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzbGlkZVBvcyA+PSBzbGlkZXMubGVuZ3RoIC0gTlVNX1NMSURFU19ESVNQTEFZKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0LWFycm93JykuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzbGlkZVBvcyA8PSAwKTsgXHJcbn1cclxuXHJcbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyTG9jYXRpb24nKTtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IGlucHV0RWxlbS52YWx1ZTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJJbnB1dCk7XHJcbiAgICAvLyBwcmV2ZW50IGR1cGxpY2F0ZSBkaXNwbGF5IHdoZW4gdXNlciBwcmVzc2VzIGVudGVyIG11bHRpcGxlIHRpbWVzXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIGlmIChjaGVja1ZhbGlkKHVzZXJJbnB1dCkpIGdldFdlYXRoZXIodXNlcklucHV0KTtcclxufSlcclxuXHJcbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHRcclxuICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlckxvY2F0aW9uJyk7XHJcbiAgICAgICAgY29uc3QgdXNlcklucHV0ID0gaW5wdXRFbGVtLnZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJJbnB1dCk7XHJcbiAgICAgICAgLy8gcHJldmVudCBkdXBsaWNhdGUgZGlzcGxheSB3aGVuIHVzZXIgcHJlc3NlcyBlbnRlciBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICAgIHdlYXRoZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjaGVja1ZhbGlkKHVzZXJJbnB1dCkpIGdldFdlYXRoZXIodXNlcklucHV0KTtcclxuICAgIH1cclxufSlcclxuXHJcbi8vIGNvbnN0IHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZScpO1xyXG4vLyByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvZ3Jlc3NTbGlkZXMpXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBjb25zb2xlLmxvZyh0YXJnZXQuaWQpO1xyXG4gICAgaWYgKHRhcmdldC5pZCA9PT0gJ3JpZ2h0LWFycm93Jykge1xyXG4gICAgICAgIHByb2dyZXNzU2xpZGVzKHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuaWQgPT09ICdsZWZ0LWFycm93Jykge1xyXG4gICAgICAgIHByb2dyZXNzU2xpZGVzKCk7XHJcbiAgICB9XHJcbn0pIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udHMvRE1fU2Fucy9ETVNhbnMtVmFyaWFibGVGb250X29wc3osd2dodC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1mYW1pbHk6IGRtU2FucztcclxuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICB9XHJcblxyXG4qIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gICAgZm9udC1mYW1pbHk6ICBkbVNhbnMsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDEuNGVtO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xyXG4gICAgY29sb3I6IHJnYmEoMTYsIDI1NSwgMjMzLCAwLjg3KTtcclxufVxyXG5saSB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgLyogdGV4dC1hbGlnbjogbGVmdDsgKi9cclxufVxyXG5cclxudWwge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5zZWFyY2hiYXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZy10b3A6IDUlO1xyXG59XHJcblxyXG5pbnB1dCB7XHJcbiAgICBhbGw6IHVuc2V0O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDA7XHJcbiAgICBib3JkZXItdG9wOiAwO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbiNzdWJtaXQge1xyXG4gICAgLyogcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7ICovXHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgNTAlKTtcclxufVxyXG5cclxuLndlYXRoZXItZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBjb2x1bW4tZ2FwOiAyMHB4O1xyXG4gICAgLyogZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyAqL1xyXG59XHJcblxyXG4jaGVhZGVyLW1zZyB7XHJcbiAgICAvKiBncmlkLWNvbHVtbjogMSAvIDQ7ICovXHJcbiAgICBmb250LXNpemU6IDEuNWVtO1xyXG4gICAgZmxleC1iYXNpczogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwMHB4IDEwcHg7XHJcbn1cclxuXHJcbiNkZXRhaWxlZC1mb3JlY2FzdCB7XHJcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xyXG4gICAgY29sdW1uLWdhcDogMjBweDtcclxufVxyXG5cclxuI2RldGFpbGVkLWZvcmVjYXN0IGRpdiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNyaWdodC1hcnJvdyxcclxuI2xlZnQtYXJyb3cge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICB3aWR0aDogMzJweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuI3JpZ2h0LWFycm93IHtcclxuICAgIHJpZ2h0OiAzMyU7XHJcbn1cclxuXHJcbiNsZWZ0LWFycm93IHtcclxuICAgIGxlZnQ6IDMzJTtcclxufVxyXG5cclxuI3JpZ2h0LWFycm93LmRpc2FibGVkLFxyXG4jbGVmdC1hcnJvdy5kaXNhYmxlZCB7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG59XHJcbi5ncmlkLWl0ZW0ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzkxYmFjZDtcclxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6ICM5MWJhY2Q7ICovXHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjNzO1xyXG4gICAgcGFkZGluZzogNnB4IDE2cHg7XHJcbiAgICBjb2xvcjogcmdiYSgxNiwgMjU1LCAyMzMsIDAuODcpO1xyXG59XHJcblxyXG4uZ3JpZC1pdGVtOmhvdmVyIHtcclxuICAgIGJveC1zaGFkb3c6IDAgOHB4IDE2cHggMCByZ2JhKDAsMCwwLDAuMik7XHJcbn1cclxuXHJcbi5ob3VycyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4udmlzaWJsZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmRpc2FibGVkIHtcclxuICAgIG9wYWNpdHk6IDAuMztcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NTBweCkge1xyXG4gICAgI2hlYWRlci1tc2cge3BhZGRpbmc6IDUwcHggMTBweDt9XHJcbiAgICAuZ3JpZC1pdGVtIHsgd2lkdGg6IDYwJTt9XHJcbiAgICAud2VhdGhlci1ncmlkIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgcm93LWdhcDogMjBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjt9XHJcbn1cclxuXHJcbi8qIHByZXZlbnQgYmx1ZSBhdXRvZmlsbCBiYWNrZ3JvdW5kIC0gc29sdXRpb24gdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTEzMTk0NC9ob3ctdG8tcmVtb3ZlLWJsdWUtYmFja2dyb3VuZC1vbi1jaHJvbWUtYXV0b2NvbXBsZXRlICovXHJcbi8qIGlucHV0Oi13ZWJraXQtYXV0b2ZpbGwsXHJcbmlucHV0Oi13ZWJraXQtYXV0b2ZpbGw6aG92ZXIsXHJcbmlucHV0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGwsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGw6aG92ZXIsXHJcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMsXHJcbnNlbGVjdDotd2Via2l0LWF1dG9maWxsLFxyXG5zZWxlY3Q6LXdlYmtpdC1hdXRvZmlsbDpob3Zlcixcclxuc2VsZWN0Oi13ZWJraXQtYXV0b2ZpbGw6Zm9jdXMge1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDBweCAxMDAwcHggI2ZmZmZmZiBpbnNldCAhaW1wb3J0YW50O1xyXG59ICovYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksbUJBQW1CO0lBQ25CLDRDQUE4RDtJQUM5RCxnQkFBZ0I7RUFDbEI7O0FBRUY7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0lBQ2hCLHlEQUE4QztJQUM5QywrQkFBK0I7QUFDbkM7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksVUFBVTtJQUNWLGNBQWM7SUFDZCxhQUFhO0lBQ2IsZUFBZTtJQUNmLDhCQUE4QjtJQUM5Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSTs7ZUFFVztJQUNYLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtJQUNmLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEI7O3lDQUVxQztBQUN6Qzs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsY0FBYztJQUNkLCtCQUErQjtJQUMvQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7O0lBRUksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixXQUFXO0lBQ1gsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFNBQVM7QUFDYjs7QUFFQTs7SUFFSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQix1Q0FBdUM7SUFDdkMsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSx3Q0FBd0M7QUFDNUM7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhLGtCQUFrQixDQUFDO0lBQ2hDLGFBQWEsVUFBVSxDQUFDO0lBQ3hCLGdCQUFnQixzQkFBc0IsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7QUFDL0U7O0FBRUEsNkpBQTZKO0FBQzdKOzs7Ozs7Ozs7O0dBVUdcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBkbVNhbnM7XFxyXFxuICAgIHNyYzogdXJsKCcuL2ZvbnRzL0RNX1NhbnMvRE1TYW5zLVZhcmlhYmxlRm9udF9vcHN6XFxcXCx3Z2h0LnR0ZicpO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgfVxcclxcblxcclxcbioge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICBkbVNhbnMsIHNhbnMtc2VyaWY7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS40ZW07XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZyk7XFxyXFxuICAgIGNvbG9yOiByZ2JhKDE2LCAyNTUsIDIzMywgMC44Nyk7XFxyXFxufVxcclxcbmxpIHtcXHJcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgLyogdGV4dC1hbGlnbjogbGVmdDsgKi9cXHJcXG59XFxyXFxuXFxyXFxudWwge1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlYXJjaGJhciB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmctdG9wOiA1JTtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXQge1xcclxcbiAgICBhbGw6IHVuc2V0O1xcclxcbiAgICBib3JkZXItbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXRvcDogMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG4jc3VibWl0IHtcXHJcXG4gICAgLyogcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIHJpZ2h0OiAwOyAqL1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5lcnJvciB7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2ZSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCA1MCUpO1xcclxcbn1cXHJcXG5cXHJcXG4ud2VhdGhlci1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgY29sdW1uLWdhcDogMjBweDtcXHJcXG4gICAgLyogZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuI2hlYWRlci1tc2cge1xcclxcbiAgICAvKiBncmlkLWNvbHVtbjogMSAvIDQ7ICovXFxyXFxuICAgIGZvbnQtc2l6ZTogMS41ZW07XFxyXFxuICAgIGZsZXgtYmFzaXM6IDEwMCU7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RldGFpbGVkLWZvcmVjYXN0IHtcXHJcXG4gICAgZmxleC1iYXNpczogMTAwJTtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxuICAgIGNvbG9yOiByZ2JhKDE2LCAyNTUsIDIzMywgMC44Nyk7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbiNkZXRhaWxlZC1mb3JlY2FzdCBkaXYge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNyaWdodC1hcnJvdyxcXHJcXG4jbGVmdC1hcnJvdyB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIHdpZHRoOiAzMnB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNyaWdodC1hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiAzMyU7XFxyXFxufVxcclxcblxcclxcbiNsZWZ0LWFycm93IHtcXHJcXG4gICAgbGVmdDogMzMlO1xcclxcbn1cXHJcXG5cXHJcXG4jcmlnaHQtYXJyb3cuZGlzYWJsZWQsXFxyXFxuI2xlZnQtYXJyb3cuZGlzYWJsZWQge1xcclxcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcclxcbn1cXHJcXG4uZ3JpZC1pdGVtIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTFiYWNkO1xcclxcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjOTFiYWNkOyAqL1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwwLDAsMC4yKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogMC4zcztcXHJcXG4gICAgcGFkZGluZzogNnB4IDE2cHg7XFxyXFxuICAgIGNvbG9yOiByZ2JhKDE2LCAyNTUsIDIzMywgMC44Nyk7XFxyXFxufVxcclxcblxcclxcbi5ncmlkLWl0ZW06aG92ZXIge1xcclxcbiAgICBib3gtc2hhZG93OiAwIDhweCAxNnB4IDAgcmdiYSgwLDAsMCwwLjIpO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cnMge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udmlzaWJsZSB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZWQge1xcclxcbiAgICBvcGFjaXR5OiAwLjM7XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjUwcHgpIHtcXHJcXG4gICAgI2hlYWRlci1tc2cge3BhZGRpbmc6IDUwcHggMTBweDt9XFxyXFxuICAgIC5ncmlkLWl0ZW0geyB3aWR0aDogNjAlO31cXHJcXG4gICAgLndlYXRoZXItZ3JpZCB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IHJvdy1nYXA6IDIwcHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7fVxcclxcbn1cXHJcXG5cXHJcXG4vKiBwcmV2ZW50IGJsdWUgYXV0b2ZpbGwgYmFja2dyb3VuZCAtIHNvbHV0aW9uIHRha2VuIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTUxMzE5NDQvaG93LXRvLXJlbW92ZS1ibHVlLWJhY2tncm91bmQtb24tY2hyb21lLWF1dG9jb21wbGV0ZSAqL1xcclxcbi8qIGlucHV0Oi13ZWJraXQtYXV0b2ZpbGwsXFxyXFxuaW5wdXQ6LXdlYmtpdC1hdXRvZmlsbDpob3ZlcixcXHJcXG5pbnB1dDotd2Via2l0LWF1dG9maWxsOmZvY3VzLFxcclxcbnRleHRhcmVhOi13ZWJraXQtYXV0b2ZpbGwsXFxyXFxudGV4dGFyZWE6LXdlYmtpdC1hdXRvZmlsbDpob3ZlcixcXHJcXG50ZXh0YXJlYTotd2Via2l0LWF1dG9maWxsOmZvY3VzLFxcclxcbnNlbGVjdDotd2Via2l0LWF1dG9maWxsLFxcclxcbnNlbGVjdDotd2Via2l0LWF1dG9maWxsOmhvdmVyLFxcclxcbnNlbGVjdDotd2Via2l0LWF1dG9maWxsOmZvY3VzIHtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDBweCAxMDAwcHggI2ZmZmZmZiBpbnNldCAhaW1wb3J0YW50O1xcclxcbn0gKi9cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiSWNvbiIsImxBcnJvdyIsInJBcnJvdyIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ3ZWF0aGVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNsaWRlUG9zIiwiTlVNX1NMSURFU19ESVNQTEFZIiwic3VibWl0QnRuIiwic3JjIiwid2lkdGgiLCJpbnB1dCIsImdldFdlYXRoZXIiLCJsb2NhdGlvbiIsIk5VTURBWVMiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsImpzb25SZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiLCJkYXlEYXRhQXJyIiwiaSIsInB1c2giLCJwcm9jZXNzRGF0YSIsImZvckVhY2giLCJkYXkiLCJpbmRleCIsImRpc3BsYXkiLCJkaXNwbGF5Q29udHJvbGxlciIsImJpbmQiLCJhbGVydCIsImRhdGFUb1Byb2Nlc3MiLCJmb3JlY2FzdE9iaiIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJjdXJyZW50VGVtcCIsImN1cnJlbnQiLCJ0ZW1wX2MiLCJ0ZW1wQXJyIiwiaG91ciIsIm1hcCIsIml0ZW0iLCJpY29uQXJyIiwiY29uZGl0aW9uIiwiaWNvbiIsImhvdXJBcnIiLCJ0aW1lIiwiZ2V0VGVtcCIsImdldEljb24iLCJ0ZW1wSGlnaCIsIm1heHRlbXBfYyIsInRlbXBMb3ciLCJtaW50ZW1wX2MiLCJ0ZW1wQXZnIiwiYXZndGVtcF9jIiwidGV4dCIsIm5hbWUiLCJkYXRlIiwiaGVhZGVyTXNnIiwiaGVhZGVyIiwiaG91cmx5Q29udGFpbmVyIiwicmlnaHRBcnJvdyIsImxlZnRBcnJvdyIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJlbGVtIiwiaG91ckRpdiIsInRpbWVTZWN0aW9uIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiZ2V0SG91cnMiLCJmb3JlY2FzdEhvdXIiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJtaW51dGUiLCJzcGxpdCIsInBhcnNlSW50IiwidGVtcFNlY3Rpb24iLCJpY29uU2VjdGlvbiIsInN0YXRzIiwiYXZnIiwiaGlnaCIsImxvdyIsImdldERheU5hbWUiLCJpbWdUb0Rpc3BsYXkiLCJJbWFnZSIsIndlYXRoZXJJdGVtIiwiY3VycmVudFNsaWRlIiwicXVlcnlTZWxlY3RvciIsImN1cnJlbnRQb3MiLCJnZXRBdHRyaWJ1dGUiLCJwcm9ncmVzc1NsaWRlcyIsImNoZWNrVmFsaWQiLCJlcnJvckRpdiIsInVuZGVmaW5lZCIsInRyaW0iLCJyZW1vdmUiLCJkYXRlU3RyIiwibG9jYWxlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwid2Vla2RheSIsInJpZ2h0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsInNsaWRlIiwiY29udGFpbnMiLCJ0b2dnbGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0RWxlbSIsInVzZXJJbnB1dCIsInZhbHVlIiwia2V5IiwidGFyZ2V0IiwiaWQiXSwic291cmNlUm9vdCI6IiJ9