const API_KEY = 'YOUR_API_KEY'; // Replace with OpenWeatherMap key
const forecastContainer = document.getElementById('forecast');
const loading = document.getElementById('loading');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const toggleTheme = document.getElementById('toggleTheme');

// Toggle dark mode
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Fetch forecast (mock or real)
async function getForecast(city) {
  loading.style.display = 'block';
  forecastContainer.innerHTML = '';

  try {
    // Use OpenWeatherMap 5-day forecast API or mock data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data.cod !== "200") throw new Error(data.message);

    // Get one forecast per day (every 8 items = 24 hours)
    const daily = data.list.filter((_, index) => index % 8 === 0);

    daily.forEach(day => {
      const date = new Date(day.dt_txt);
      const icon = day.weather[0].icon;
      const temp = day.main.temp.toFixed(1);
      const description = day.weather[0].description;

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${date.toDateString()}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>
      `;
      forecastContainer.appendChild(card);
    });
  } catch (err) {
    forecastContainer.innerHTML = `<p>Error: ${err.message}</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

// Event listener for search
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getForecast(city);
});

// Load default city on start
getForecast('London');
