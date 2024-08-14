const saveBtn = document.getElementById('btn_heart');
const heartIcon = saveBtn.querySelector('svg');
const locationOptions = document.getElementById('location-options');
const searchInput = document.getElementById('search_input');
const locationContainer = document.getElementById('location-container');
const tempUnitElements = document.getElementsByClassName('tempUnit');

let temperatureData, selectedLocation;
let isCelsius = true;

onStart()

async function onStart() {
  await getWeatherData();
  console.log(temperatureData);
  onSelectedLocation(temperatureData.data[0]);
  renderLocationOptions();
}

function renderLocationOptions() {
  for (const location of temperatureData.data) {
    const li = document.createElement("li");
    const locationEnElement = document.createElement("p");
    locationEnElement.innerText = location.place;
    li.appendChild(locationEnElement);
    li.addEventListener('click', function () {
      onSelectedLocation(location)
    })
    locationOptions.appendChild(li)
  }

  // const liList = locations.map(location => {
  //   const li = document.createElement("li");
  //   li.innerText = location.nameEn
  //   return li
  // })
  // locationOptions.replaceChildren(...liList)
}

function onSelectedLocation(location) {
  // {
  //   code: 'CCH',
  //   nameEn: 'Cheung Chau',
  //   nameZh: ''
  // }
  // searchInput.innerHTML = ''
  selectedLocation = location
  const locationEnElement = document.createElement("span");
  locationEnElement.innerText = location.place;
  searchInput.replaceChildren(locationEnElement)
  hideLcoationList()
  console.log(selectedLocation);
  const temperatureElement = document.getElementById('temperature');
  temperatureElement.innerText = location.value;
  const dateElement = document.getElementById('date');
  const formatter = new Intl.DateTimeFormat('en-HK', { dateStyle: 'short', timeStyle: 'short' });
  const recordDate = new Date(temperatureData.recordTime)
  dateElement.innerText = formatter.format(recordDate)
  console.log(temperatureData);
}

function toggleLocationList() {
  locationContainer.hidden = !locationContainer.hidden

  // if (locationContainer.hidden) {
  //   locationContainer.hidden = false;
  // } else {
  //   locationContainer.hidden = true;
  // }
}

function hideLcoationList() {
  locationContainer.hidden = true
}

async function getWeatherData() {
  const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en');
  const data = await response.json();
  temperatureData = data.temperature
}

async function getHighLowTemperatureData() {
  const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd');
  const data = await response.json();
  console.log('High Low');
  console.log(data);
}

fetchCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv', true, true)
  .then((rows) => console.log(rows))

async function fetchCSV(targetUrl, removeTitle = true, removeTail = true) {
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // const url = proxyUrl + targetUrl;
  const response = await fetch(url)
  const data = await response.text()
  const rows = data.split('\n')
  if (removeTitle) rows.shift()
  if (removeTail) rows.pop()
  return rows
}

function changeTempUnit() {
  // console.log(`isCelsius before: ${isCelsius}`);
  isCelsius = !isCelsius
  // console.log(`isCelsius after: ${isCelsius}`);
  for (const tempUnit of tempUnitElements) {
    tempUnit.innerText = `°${isCelsius ? 'C' : 'F'}`
  }

  // if (isCelsius) {
  //   tempUnit.innerText = '°C'
  // } else {
  //   tempUnit.innerText = '°F'
  // }
}

function heart() {
  if (heartIcon.getAttribute('fill') === 'red') {
    heartIcon.setAttribute('fill', '#0F1035');
  } else {
    heartIcon.setAttribute('fill', 'red');
  }
}

