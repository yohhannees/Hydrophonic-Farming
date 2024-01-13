/////////////////////////configuration for  changing variables ////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////configuration for the config variable /////////////////////////////////

document.getElementById('settingsForm').addEventListener('submit', function(event) {
  // Prevent the form from being submitted normally
  event.preventDefault();

  // Get the input values
  var port = document.getElementById('port').value;
  var plant = document.getElementById('plant').value;
  var location = document.getElementById('location').value;

    console.log("Port:", port);
    console.log("Plant :", plant);
    console.log("Location:", location);

  // Create an object with the data
  var data = {
    port: port,
    plant: plant,
    location: location
  };

  console.log("data",data)

  // Save the data to local storage
  localStorage.setItem('settings', JSON.stringify(data));
});
/////////////////////////////////////////////////////////////////////////////////////

/////////////////   weather api configuration  ////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "a8d503e79f791912910dc535060e0137"; // Replace with your OpenWeatherMap API key
  // var query = "Addis Ababa"; 

  // Retrieve the data from local storage
var data = JSON.parse(localStorage.getItem('settings'));

// Use the location as the query
var query = data.location;


  fetchWeatherData(apiKey, query);
});

async function fetchWeatherData(apiKey, query) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      displayWeatherInfo(data);
    } else {
      console.error("Error fetching weather data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
function displayWeatherInfo(weatherData) {
  const leftColumn = document.getElementById("leftColumn");
  const rightColumn = document.getElementById("rightColumn");

  leftColumn.innerHTML = `
    <p class="info"><i class="bi bi-building"></i> City: <span class="value">${weatherData.name}</span></p>
    <p class="info"><i class="bi bi-thermometer-half"></i> Temperature: <span class="value">${weatherData.main.temp}°C</span></p>
    <p class="info"><i class="bi bi-cloud"></i> Weather : <span class="value">${weatherData.weather[0].description}</span></p>
    <p class="info"><i class="bi bi-droplet-half"></i> Humidity: <span class="value">${weatherData.main.humidity}%</span></p>
    <p class="info"><i class="bi bi-wind"></i> Wind Speed: <span class="value">${weatherData.wind.speed} m/s</span></p>
    <p class="info"><i class="bi bi-bar-chart-line"></i> Pressure: <span class="value">${weatherData.main.pressure} hPa</span></p>
  `;

  rightColumn.innerHTML = `
    <p class="info"><i class="bi bi-eye"></i> Visibility: <span class="value">${
      weatherData.visibility
    } meters</span></p>
    <p class="info"><i class="bi bi-brightness-alt-high"></i> Sunrise: <span class="value">${new Date(
      weatherData.sys.sunrise * 1000
    ).toLocaleTimeString()}</span></p>
    <p class="info"><i class="bi bi-brightness-alt-low"></i> Sunset: <span class="value">${new Date(
      weatherData.sys.sunset * 1000
    ).toLocaleTimeString()}</span></p>
    <p class="info"><i class="bi bi-cloud"></i> Cloudiness: <span class="value">${
      weatherData.clouds.all
    }%</span></p>
  `;
}

//////////////////////////////////////////////////////////////////////////////////

////////////////////////////////configuration for control //////////////////////////

// Declare the API URL
const apiUrl = "http://your-api-url.com";

// Retrieve the data from local storage
var data = JSON.parse(localStorage.getItem('settings'));

// Use the location as the query
var query = data.port;

// Function to fetch data
async function fetchData(endpoint) {
  const response = await fetch(apiUrl + endpoint);
  const data = await response.json();
  return data;
}

// Set initial values to "Off"
document.querySelector(".fan-status p").textContent = "Off";
document.querySelector(".pump-status p").textContent = "Off";
document.querySelector(".led-status p").textContent = "Off";
document.querySelector(".system-status p").textContent = "Off";
document.querySelector(".buzzer-status p").textContent = "Off";
// set initial values to "Not Measured"
// document.querySelector(".water-level p").textContent = "Not Measured";
// document.querySelector(".humidity p").textContent = "Not Measured";
// document.querySelector(".temperature p").textContent = "Not Measured";
// Fetch temperature
fetchData("/temperature").then((data) => {
  document.querySelector(
    ".temperature h"
  ).textContent = `${data.temperature}°C`;
});

// Fetch humidity
fetchData("/humidity").then((data) => {
  document.querySelector(".humidity h3").textContent = `${data.humidity}%`;
});

// Fetch water level
fetchData("/water-level").then((data) => {
  document.querySelector(".water-level h3").textContent = `${data.waterLevel}%`;
});

// Fetch fan status
fetchData("/fan-status").then((data) => {
  document.querySelector(".fan-status p").textContent = data.fanStatus
    ? "On"
    : "Off";
});

// Fetch pump status
fetchData("/pump-status").then((data) => {
  document.querySelector(".pump-status p").textContent = data.pumpStatus
    ? "On"
    : "Off";
});

// Fetch LED status
fetchData("/led-status").then((data) => {
  document.querySelector(".led-status p").textContent = data.ledStatus
    ? "On"
    : "Off";
});
// Fetch Buzzer Status
fetchData("/buzzer-status").then((data) => {
  document.querySelector(".buzzer-status p").textContent = data.buzzerStatus
    ? "On"
    : "Off";
});

// Fetch system Status

fetchData("/system-status").then((data) => {
  document.querySelector(".system-status p").textContent = data.systemStatus
    ? "On"
    : "Off";
});

///////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////configuration for config //////////////////////////

// Handle form submission
// document.getElementById('pumpForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const startDelay = document.getElementById('pumpStartDelay').value;
//   const duration = document.getElementById('pumpDuration').value;
//   fetch(apiUrl + '/pump/setSchedule', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ startDelay, duration }),
//   });
// });

// document.getElementById('fanForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const startDelay = document.getElementById('fanStartDelay').value;
//   const duration = document.getElementById('fanDuration').value;
//   fetch(apiUrl + '/fan/setSchedule', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ startDelay, duration }),
//   });
// });

// document.getElementById('ledForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const startDelay = document.getElementById('ledStartDelay').value;
//   const duration = document.getElementById('ledDuration').value;
//   fetch(apiUrl + '/led/setSchedule', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ startDelay, duration }),
//   });
// });

//    this displays delay data on the forms
// Handle form submission
document
  .getElementById("pumpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const startDelayInput = document.getElementById("pumpStartDelay");
    const durationInput = document.getElementById("pumpDuration");
    const startDelay = startDelayInput.value;
    const duration = durationInput.value;
    fetch(apiUrl + "/pump/setSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDelay, duration }),
    })
      .then((response) => response.json())
      .then((data) => {
        startDelayInput.value = data.startDelay;
        durationInput.value = data.duration;
      });
  });

document.getElementById("fanForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const startDelayInput = document.getElementById("fanStartDelay");
  const durationInput = document.getElementById("fanDuration");
  const startDelay = startDelayInput.value;
  const duration = durationInput.value;
  fetch(apiUrl + "/fan/setSchedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDelay, duration }),
  })
    .then((response) => response.json())
    .then((data) => {
      startDelayInput.value = data.startDelay;
      durationInput.value = data.duration;
    });
});

document.getElementById("ledForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const startDelayInput = document.getElementById("ledStartDelay");
  const durationInput = document.getElementById("ledDuration");
  const startDelay = startDelayInput.value;
  const duration = durationInput.value;
  fetch(apiUrl + "/led/setSchedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDelay, duration }),
  })
    .then((response) => response.json())
    .then((data) => {
      startDelayInput.value = data.startDelay;
      durationInput.value = data.duration;
    });
});

//////////////////////////////////////////////////////////////////////////////

//////////////////////////configuration for controller////////////////////////////////

// Function to make a POST request
async function postData(endpoint, data = {}) {
  const response = await fetch(apiUrl + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Add event listener to fan toggle
document.getElementById("fanToggle").addEventListener("change", function () {
  postData("/fan/" + (this.checked ? "on" : "off"));
});

// Add event listener to pump toggle
document.getElementById("pumpToggle").addEventListener("change", function () {
  postData("/pump/" + (this.checked ? "on" : "off"));
});

// Add event listener to led toggle
document.getElementById("ledToggle").addEventListener("change", function () {
  postData("/led/" + (this.checked ? "on" : "off"));
});

// Add event listener to system toggle
document.getElementById("systemToggle").addEventListener("change", function () {
  postData("/system/" + (this.checked ? "on" : "off"));
});

// Add event listener to buzzer toggle
document.getElementById("buzzerToggle").addEventListener("change", function () {
  postData("/buzzer/" + (this.checked ? "on" : "off"));
});

/////////////////////////////////////////////////////////////////////////////////////
