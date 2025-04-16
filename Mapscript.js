const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const weatherInfo = document.getElementById('info');

// Initialize Leaflet map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Handle map click
map.on('click', async function (e) {
  const { lat, lng } = e.latlng;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  
  weatherInfo.innerHTML = 'Fetching weather data...';

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      weatherInfo.innerHTML = `Error: ${data.message}`;
      return;
    }

    weatherInfo.innerHTML = `
      <strong>Location:</strong> ${data.name || 'Unknown'}<br/>
      <strong>Temperature:</strong> ${data.main.temp} °C<br/>
      <strong>Weather:</strong> ${data.weather[0].description}<br/>
      <strong>Humidity:</strong> ${data.main.humidity}%<br/>
      <strong>Wind:</strong> ${data.wind.speed} m/s
    `;
  } catch (err) {
    weatherInfo.innerHTML = 'Failed to fetch weather data.';
  }
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
