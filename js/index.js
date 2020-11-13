let actualWeather = "clear";
let actualColor = "black";
let actualVerticalColor = "black-vertical";
let apiKey = "1ef8550400ece86661dfa0fc0e0af7d7";

const getWheaterByQuery = async (query) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +  apiKey + "&units=imperial");
    const json = await response.json();
    return json;
}

const getWheaterByCoorditates = async ({coords}) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&appid=" + apiKey + "&units=imperial");
    const json = await response.json();
    return json;
}

const setImageByWeather = (weather) => {
    console.log(weather);
    setContentColorByWeather(weather);
    document.querySelector(".weather-image").classList.remove(actualWeather);
    document.querySelector(".weather-image").classList.add(weather.toLowerCase());
    actualWeather = weather.toLowerCase();
}

const setWeatherContent = (weather) => {
    const temperature = Math.round(weather.main.temp);
    const description = weather.weather[0].description;
    const weatherContent = "<i class='" + getIcon(description) + "'></i> " + temperature + "°</h1>";
    const country = weather.name.toUpperCase() + ", " + weather.sys.country;
    document.querySelector(".country").textContent = country;
    document.querySelector(".weather").innerHTML = weatherContent;
    document.querySelector(".description").textContent = description;
}

const inputWeather = document.querySelector(".seeker-input");
inputWeather.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        getWheaterByQuery(inputWeather.value).then(weather => {
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

    document.querySelector(".conditions").innerHTML = conditionsHTML;
}

const getIcon = (description) => {
    let icon = "";
    switch (description) {
        case "clear sky":
            icon = "flaticon-sun";
            break;
        case "few clouds":
            icon = "flaticon-cloudy";
            break;
        case "scattered clouds":
            icon = "flaticon-cloudy-1";
            break;
        case "broken clouds":
            icon = "flaticon-cloudy-1";
            break;
        case "overcast clouds":
            icon = "flaticon-cloudy-1";
            break;
        case "shower rain":
            icon = "flaticon-rain";
            break;
        case "heavy intensity rain":
            icon = "flaticon-rain";
            break;
        case "very heavy rain": 
            icon = "flaticon-rain";
            break;
        case "light rain":
            icon = "flaticon-rain-3";
            break;
        case "rain":
            icon = "flaticon-rain-3";
            break;
        case "moderate rain":
            icon = "flaticon-rain-3";
            break;
        case "thunderstorm":
            icon = "flaticon-thunder";
            break;
        case "snow":
            icon = "flaticon-snowflake";
            break;
        case "tornado":
            icon = "flaticon-tornado"
            break;
        default:
            icon = "flaticon-fog";
            break;
    }
    return icon;
}

const setContentColorByWeather = (weather) => {
    
    switch (weather) {
        case "Clouds":
            setColor("black");
            break;
        case "Clear":
            setColor("white");
            break;
        case "Fog":
            setColor("black");
            break;
        case "Mist":
            setColor("white");
            break;
        case "Thunderstorm":
            setColor("white");
            break;
        case "Rain":
            setColor("white");
            break;
        case "Drizzle":
            setColor("white");
            break;
        case "Squall":
            setColor("white");
            break;
        case "Snow":
            setColor("black");
            break;
        case "Smoke":
            setColor("white");
            break;
        case "Haze":
            setColor("black");
            break;
        case "Dust":
            setColor("black");
            break;
        case "Sand":
            setColor("white");
            break;
        case "Ash":
            setColor("black");
            break;
        case "Tornado":
            setColor("white");
            break;
        default:
            break;
    }
}

const setColor = (color) => {
    document.querySelector(".container-fluid").classList.remove(actualColor);
    document.querySelector(".container-fluid").classList.add(color);
    document.querySelector(".vertical").classList.remove(actualVerticalColor);
    document.querySelector(".vertical").classList.add(color + "-vertical");
    actualColor = color;
    actualVerticalColor = color + "-vertical";
}

const showWeatherByLocation = (position) => {
    getWheaterByCoorditates(position).then(weather => {
        console.log(weather);
        setImageByWeather(weather.weather[0].main);
        setWeatherContent(weather);
        setWeatherConditions(weather);
    });
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeatherByLocation);
    }
}

getLocation();