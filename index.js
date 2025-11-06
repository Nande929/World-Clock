function selectCity(event) {

    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {

        cityTimeZone = moment.tz.guess();
    }
    let cityName = cityTimeZone.replace("-", " ").split("/")[1];
    let cityId = cityName.lowercase;
    let replaceCitiesElement = document.querySelector("#replace-cities");
    replaceCitiesElement.innerHTML = `
            <div class="city-container">
                <div>
                    <h3>${cityName}</h3>
                    <small class="date"></small>
                </div>
                <div class="image-time">
                    <div>
                        <span class="time"></span>
                    </div>
                    <div class="weather">
                    <span class="weather-icon"></span>
                        <p id="${cityId}-temp"></p>
                    </div>
                </div>
            </div>`;

            let anyCity = replaceCitiesElement.querySelector(".date");
            let anyTime = replaceCitiesElement.querySelector(".time");

            function setSelectedCityClock() {
                let liverTime = moment().tz(cityTimeZone);;
                anyCity.innerHTML = liverTime.format("MMMM Do YYYY");
                anyTime.innerHTML = liverTime.format("HH:mm:ss");
            }
            setSelectedCityClock()
            setInterval(setSelectedCityClock, 1000);

            getCity(cityName, `#${cityId}-temp`, `#${cityId}, .weather-icon`);
}

function displayClock() {
    //Berlin
    let berlinElement = document.querySelector("#berlin");
    let berlinDateElement = berlinElement.querySelector(".date");
    let berlinTimeElement = berlinElement.querySelector(".time");
    let berlinTime = moment().tz("Europe/Berlin");


    berlinDateElement.innerHTML = berlinTime.format("MMMM Do YYYY");
    berlinTimeElement.innerHTML = berlinTime.format("HH:mm:ss");

    //Nairobi

    let nairobiElement = document.querySelector("#nairobi");
    let nairobiDateElement = nairobiElement.querySelector(".date");
    let nairobiTimeElement = nairobiElement.querySelector(".time");
    let nairobiTime = moment().tz("Africa/Nairobi");


    nairobiDateElement.innerHTML = nairobiTime.format("MMMM Do YYYY");
    nairobiTimeElement.innerHTML = nairobiTime.format("HH:mm:ss");

    //Johannesburg
    let johannesburgElement = document.querySelector("#johannesburg");
    let johannesburgDateElement = johannesburgElement.querySelector(".date");
    let johannesburgTimeElement = johannesburgElement.querySelector(".time");
    let johannesburgTime = moment().tz("Africa/Johannesburg");


    johannesburgDateElement.innerHTML = johannesburgTime.format("MMMM Do YYYY");
    johannesburgTimeElement.innerHTML = johannesburgTime.format("HH:mm:ss");

    //Denver
    let denverElement = document.querySelector("#denver");
    let denverDateElement = denverElement.querySelector(".date");
    let denverTimeElement = denverElement.querySelector(".time");
    let denverTime = moment().tz("America/Denver");


    denverDateElement.innerHTML = denverTime.format("MMMM Do YYYY");
    denverTimeElement.innerHTML = denverTime.format("HH:mm:ss");
}



function displayWeather(response, cityTemp, cityIcon) {

    let weatherIcon = document.querySelector(cityIcon);
    let berlinTemp = document.querySelector(cityTemp);
    console.log(response.data)
    weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`; 
    berlinTemp.innerHTML = `${Math.round(response.data.temperature.current)}&deg;`
   
}
 
function getCity(city, cityTemp, cityIcon) {

    let apiKey = "e2b85d39ocbf2atcfebaabf3b2422057";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;


    axios.get(apiUrl).then(function(response) {
    displayWeather(response, cityTemp, cityIcon)
    });

}

let pickValue = document.querySelector("#countries");
pickValue.addEventListener("change", selectCity);

getCity("Berlin", "#berlin-temp", "#berlin .weather-icon");
getCity("Nairobi", "#nairobi-temp", "#nairobi .weather-icon");
getCity("Johannesburg", "#johannesburg-temp", "#johannesburg .weather-icon");
getCity("Denver", "#denver-temp", "#denver .weather-icon");

displayClock();
setInterval(displayClock, 1000);
