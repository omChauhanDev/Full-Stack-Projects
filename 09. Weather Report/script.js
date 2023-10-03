const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccess = document.querySelector(".grant-location-container");
const searchForm = document.querySelector(".form-container"); 
const loadingScreen = document.querySelector(".loading-container");
const errorScreen = document.querySelector(".error-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorText = document.querySelector("[error-text]");

let currentTab = userTab;
const API_KEY = "24646e0ffadd27ec7004e491a9e595d0";
currentTab.classList.add("current-tab");
getFromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
    
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccess.classList.remove("active");
            errorScreen.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorScreen.classList.remove("active");
            getFromSessionStorage();    
        }
    }

}

userTab.addEventListener('click', ()=>{
    switchTab(userTab);
});

searchTab.addEventListener('click', ()=>{
    switchTab(searchTab);
});

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccess.classList.add("active"); 
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    grantAccess.classList.remove("active");
    loadingScreen.classList.add("active");

    try{
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        if(data?.cod == "404"){
            throw new Error("Location Not Found");
        }
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        errorScreen.classList.add("active");
        errorText.innerText = "Location Not Found";
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDescription]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText =  weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m\s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Unable to access your location.")
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click', getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        userInfoContainer.classList.remove("active");
        errorScreen.classList.add("active");
        errorText.innerText = "Please Enter City";
        return;
    }
    else 
        fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccess.classList.remove("active");
    errorScreen.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        if(data?.cod == "404"){
            throw new Error("City Not Found");
        }
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){
        errorScreen.classList.add("active");
        errorText.innerText = "City Not Found";
    }
}
