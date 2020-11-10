let actualWeather = "clear";

const getWheaterByQuery = async (query) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=1ef8550400ece86661dfa0fc0e0af7d7&units=imperial");
    const json = await response.json();
    return json;
}

const setImageByWeather = (weather) => {
    document.querySelector(".weather-image").classList.remove(actualWeather);
    document.querySelector(".weather-image").classList.add(weather.toLowerCase());
    actualWeather = weather.toLowerCase();
}

const setWeatherContent = (weather) => {
    const temperature = Math.round(weather.main.temp);
    const description = weather.weather[0].description;
    const weatherContent = "<i class='fas " + getIcon(description) + " fa-xs gray'></i> " + temperature + "°</h1>";
    const country = weather.name.toUpperCase() + ", " + weather.sys.country;
    document.querySelector(".country").textContent = country;
    document.querySelector(".weather").innerHTML = weatherContent;
    document.querySelector(".description").textContent = description;
}

const inputWeather = document.querySelector(".weather-input");
inputWeather.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        getWheaterByQuery(inputWeather.value).then(weather => {
            console.log(weather);
            setImageByWeather(weather.weather[0].main);
            setWeatherContent(weather);
            setWeatherConditions(weather);
        });
    }
});

const setWeatherConditions = (weather) => {
    const conditionsHTML =  "<p> Clouds: " + weather.clouds.all + " %</p> " + 
                            "<p> Humidity: " + weather.main.humidity + " %</p> " + 
                            "<p> Wind: " + weather.wind.speed + "mps</p>";
    
    console.log(conditionsHTML);
    document.querySelector(".conditions").innerHTML = conditionsHTML;
}

const getIcon = (description) => {
    let icon = "";
    switch (description) {
        case "clear sky":
            icon = "fa-circle";
            break;
        case "few clouds":
            icon = "fa-cloud-sun";
            break;
        case "scattered clouds":
            icon = "fa-cloud";
            break;
        case "broken clouds":
            icon = "fa-cloud";
            break;
        case "shower rain":
            icon = "fa-cloud-showers-heavy";
            break;
        case "light rain":
            icon = "fa-cloud-sun-rain";
            break;
        case "rain":
            icon = "fa-cloud-sun-rain";
            break;
        case "thunderstorm":
            icon = "fa-bolt";
            break;
        case "snow":
            icon = "fa-snowflake";
            break;
        default:
            icon = "fa-smog";
            break;
    }
    return icon;
}