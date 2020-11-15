let actualWeather = "clear";
let actualColor = "black";
let actualVerticalColor = "black-vertical";
let apiKey = "1ef8550400ece86661dfa0fc0e0af7d7";
let utcHour = new Date();

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

const search = (input) => {
    getWheaterByQuery(input).then(weather => {
        setHourByTimeZone(weather.timezone);
        setImageByWeather(weather.weather[0].main);
        setWeatherContent(weather);
        setWeatherConditions(weather);
    });
}

const setHourByTimeZone = (timezone) => {
    var timestamp = new Date(Date.now()+(new Date().getTimezoneOffset()*60000)).getTime();
    utcHour = new Date(timestamp);
    const hourTime = Math.floor(timezone / 3600);
    utcHour.setHours(utcHour.getHours() + hourTime);
    console.log(utcHour);
}

const setImageByWeather = (weather) => {
    document.querySelector(".weather-image").classList.remove(actualWeather);

    if (utcHour.getHours() < 18 && utcHour.getHours() > 6) {
        document.querySelector(".weather-image").classList.add(weather.toLowerCase());
        actualWeather = weather.toLowerCase();
    } else {
        document.querySelector(".weather-image").classList.add(weather.toLowerCase() + "-night");
        actualWeather = weather.toLowerCase() + "-night";
    }
}

const setWeatherContent = (weather) => {
    const temperature = Math.round(weather.main.temp);
    const description = weather.weather[0].description;
    const weatherContent = "<i class='" + getIconAndSetColor(weather) + "'></i> " + temperature + "°</h1>";
    const country = weather.name.toUpperCase() + ", " + weather.sys.country;
    document.querySelector(".country").textContent = country;
    document.querySelector(".weather").innerHTML = weatherContent;
    document.querySelector(".description").textContent = description;
}

const inputWeather = document.querySelector(".seeker-input");
inputWeather.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        search(inputWeather.value);
    }
});

const setWeatherConditions = (weather) => {
    const conditionsHTML =  "<p> Clouds: " + weather.clouds.all + " %</p> " + 
                            "<p> Humidity: " + weather.main.humidity + " %</p> " + 
                            "<p> Wind: " + weather.wind.speed + "mps</p>";

    document.querySelector(".conditions").innerHTML = conditionsHTML;
}

const getIconByTime = (iconDay, iconNight) => {
    if (utcHour.getHours() < 18 && utcHour.getHours() > 6) {
        return iconDay;
    } else {
        return iconNight;
    }
}

const getIconAndSetColor = (weather) => {
    weather = weather.weather[0].main;
    switch (weather) {
        case "Clouds":
            setColor("black", "white");
            setHeaderColor("#01C0C0", "#000000");
            return getIconByTime("flaticon-cloudy", "flaticon-cloudy-2");
        case "Clear":
            setColor("white", "white");
            setHeaderColor("#194572", "#151D20");
            return getIconByTime("flaticon-sun", "flaticon-full-moon");
        case "Fog":
            setColor("black", "white");
            setHeaderColor("#C6DBDE", "#C6DBDE");
            return getIconByTime("flaticon-fog-1", "flaticon-fog-2");
        case "Mist":
            setColor("white", "black");
            setHeaderColor("#D7D8DC", "#D7D8DC");
            return "flaticon-fog";
        case "Thunderstorm":
            setColor("white", "white");
            setHeaderColor("#654664", "#654664");
            return "flaticon-thunder";
        case "Rain":
            setColor("white", "white");
            setHeaderColor("#081B29", "#121F27");
            return "flaticon-rain-1";
        case "Drizzle":
            setColor("white", "white");
            setHeaderColor("#081B29", "#121F27");
            return "flaticon-rain-3";
        case "Squall":
            setColor("white", "white");
            setHeaderColor("#081B29", "#121F27");
            return "flaticon-rain";
        case "Snow":
            setColor("black", "white");
            setHeaderColor("#FFFFFF", "#24444F");
            return "flaticon-snowflake";
        case "Smoke":
            setColor("white", "black");
            setHeaderColor("#A9969E", "#A9969E");
            return "flaticon-fog";
        case "Haze":
            setColor("black", "white");
            setHeaderColor("#EEE3DF", "#EEE3DF");
            return getIconByTime("flaticon-fog-1", "flaticon-fog-2");
        case "Dust":
            setColor("black", "white");
            setHeaderColor("#CCD0D3", "#CCD0D3");
            return getIconByTime("flaticon-fog-1", "flaticon-fog-2");
        case "Sand":
            setColor("white", "black");
            setHeaderColor("#EFCA96", "#EFCA96");
            return getIconByTime("flaticon-fog-1", "flaticon-fog-2");
        case "Ash":
            setColor("black", "white");
            setHeaderColor("#CCD0D3", "#CCD0D3");
            return "flaticon-fog";
        case "Tornado":
            setColor("white", "black");
            setHeaderColor("#545D6D", "#545D6D");
            return "flaticon-tornado";
        default:
            break;
    }
}

const setColor = (colorDay, colorNight) => {
    document.querySelector(".container-fluid").classList.remove(actualColor);
    document.querySelector(".vertical").classList.remove(actualVerticalColor);
    document.querySelector(".seeker-input").classList.remove("seeker-white");

    if (utcHour.getHours() < 18 && utcHour.getHours() > 6) {
        document.querySelector(".seeker-input").classList.add("seeker-" + colorDay);
        document.querySelector(".container-fluid").classList.add(colorDay);
        document.querySelector(".vertical").classList.add(colorDay + "-vertical");
        actualColor = colorDay;
        actualVerticalColor = colorDay + "-vertical";
    } else {
        document.querySelector(".seeker-input").classList.add("seeker-" + colorNight);
        document.querySelector(".container-fluid").classList.add(colorNight);
        document.querySelector(".vertical").classList.add(colorNight + "-vertical");
        actualColor = colorNight;
        actualVerticalColor = colorNight + "-vertical";
    }
}

const setHeaderColor = (colorDay, colorNight) => {
    if (utcHour.getHours() < 18 && utcHour.getHours() > 6) {
        document.querySelector("meta[name='theme-color']").setAttribute("content", colorDay);
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute("content", colorNight);
    }
}

const showWeatherByLocation = (position) => {
    getWheaterByCoorditates(position).then(weather => {
        setHourByTimeZone(weather.timezone);
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

search("paris");
getLocation();