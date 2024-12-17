const apiKey = "26214897fe3c1a7aa50f8f858da7912d";
const cityInput = document.querySelector(".cityInput");
const main = document.querySelector(".main");
const card = document.querySelector(".card");

main.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    getWeatherData(city);
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const {
            name: cityName,
            main: { temp: temperature },
            sys: { country },
            weather: [{ id: weatherId,description : describe }],
        } = data;

        // Clear and show the card
        card.textContent = "";
        card.style.display = "flex";

        // Append city name
        const name = document.createElement("h1");
        name.textContent = `${cityName}, ${country}`;
        card.appendChild(name);

        // Append temperature
        const temp = document.createElement("div");
        temp.classList.add("temp");
        temp.textContent = `${temperature}°C`;
        card.appendChild(temp);

        // Append emoji
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = getEmoji(weatherId);
        card.appendChild(emoji);

        // Append decription
        const decription = document.createElement("div");
        decription.classList.add("decription");
        decription.textContent = describe;
        card.appendChild(decription);

    } catch (error) {
        console.error(error.message);
        card.textContent = "Error fetching weather data. Please try again.";
        card.style.display = "flex";
    }
}

function getEmoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            return "⛈️";
        case weatherId >= 300 && weatherId < 400:
            return "🌧️";
        case weatherId >= 500 && weatherId < 600:
            return "🌧️";
        case weatherId >= 600 && weatherId < 700:
            return "❄️";
        case weatherId >= 700 && weatherId < 800:
            return "🌫️";
        case weatherId === 800:
            return "☀️";
        case weatherId > 800:
            return "☁️";
        default:
            return "❓";
    }
}
