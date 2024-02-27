const API_KEY = "02c12725c03e42661d91511e426ee133";
let city = "mumbai";
async function showWeather() {
  
    console.log("City: ", city);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data = await response.json();
    console.log("Weather Data:", data);

    let newPara = document.createElement('p');
    newPara.textContent = `${(data?.main?.temp.toFixed(2))} °C`;
    document.body.appendChild(newPara);
}

console.log( "Weather of", city, showWeather());
