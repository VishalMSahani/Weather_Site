// const API_KEY = "02c12725c03e42661d91511e426ee133";

// async function showWeather() {
//     try {
//         let city = "Mumbai";
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }

//         const data = await response.json();
//         console.log("Weather Data:", data);

//         let newPara = document.createElement('p');
//         newPara.textContent = `${(data?.main?.temp.toFixed(2))} °C`;
//         document.body.appendChild(newPara);
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//     }
// }

// showWeather();

const  userTab = document.querySelector("[data-userWeather]");
const  searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weatherContainer");

const grantAccess = document.querySelector(".grantAccessContiner");

const loadingScreen = document.querySelector(".loadingContainer");
const userInfoContainer = document.querySelector(".displayInfoContainer");

let currentTab = userTab;
const API_KEY = "02c12725c03e42661d91511e426ee133";
currentTab.classList.add("current-tab");
getFromSessionStoreage();


function switchTabs(clickedTab){
    if (currentTab != clickedTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccess.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.add("active");
            getFromSessionStoreage();

        }
    }
};

userTab.addEventListener( 'click', () => switchTabs(userTab));
searchTab.addEventListener( 'click', () => switchTabs(searchTab));

// check in cordinate are already present in session storeage

function getFromSessionStoreage(){
    const localCordinates = sessionStorage.getItem("user-cordinates");
    if(!localCordinates){
        grantAccess.classList.add('active');
    }
    else{
        const cordinates =  JSON.parse(localCordinates);
        fetchUserWeatherInfo(cordinates);
    }
};

async function fetchUserWeatherInfo(cordinates){
    const {lat,lon} = cordinates;
    grantAccess.classList.remove( "active" );
    loadingScreen.classList.add("active");

    //api call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        let data = await response.json() ;
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherinfo(data);
      
    }
    catch(err){
        alert('Error: Could not retrieve weather information for user data');
        return;
    }
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
       alert('Geolocation is not supported by this browser.');
       }
}

function showPosition(position){
    const userCordinates = {
        lat : position.coords.latitude, 
        lon : position.coords.longitude,
}

sessionStorage.setItem("userCordinates", JSON.stringify(userCordinates));
    fetchUserWeatherInfo(userCordinates);
    
    }


function renderWeatherinfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const contryIcon = document.querySelector("[data-Contyflag]");
    const description = document.querySelector("[data-weatehrDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temprature = document.querySelector(".temp");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudeness = document.querySelector("[data-Cloud]");

    cityName.innerText =weatherInfo?.name;
    contryIcon.src= `https://flagcdn.com/108x81/${weatherInfo?.say?.country.toLowerCase()}.png`;
    description.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png` ;
    temprature.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText =  weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudeness.innerText = weatherInfo?.clouds?.all;
}



const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccess.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchinput]");
const searchForm = document.querySelector(".formContainer"); 

searchForm.addEventListener("submit", (e) => { // Listen for form submission
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "") {
        return;
    }
    else {
        fetchSearchweatherInfo(cityName)
    }
});

async function fetchSearchweatherInfo(city){
    // loadingScreen.classList.add("active");
    // userInfoContainer.classList.remove("active");
    // grantAccess.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json() ;
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherinfo(data);
    }
    catch{
        alert('Error: Could not retrieve weather information');
        return;
    }
};
