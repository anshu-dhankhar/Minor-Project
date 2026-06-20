async function getWeather() {
    // PASTE YOUR API KEY HERE
    const apiKey = '58f9dc700f6100217a8d4ffb0cfaf57c'; 
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    const errorMsg = document.getElementById('errorMessage');

    if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    errorMsg.textContent = "Loading...";
    resultDiv.classList.add('hidden');

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        const data = await response.json();

       
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        document.getElementById('condition').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind').textContent = data.wind.speed;

        errorMsg.textContent = "";
        resultDiv.classList.remove('hidden');
    } catch (error) {
        errorMsg.textContent = error.message;
        resultDiv.classList.add('hidden');
    }
}