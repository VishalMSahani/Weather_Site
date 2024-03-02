const d = new Date((1709391928 - 19800) * 1000)
const timeZone = document.querySelector('.time');
let date = d.toGMTString()
timeZone.innerText ="Local Time: " + date;



function timeZoneOfCountry(dateAndTime) {
    const d = new Date(dateAndTime * 1000);
    return d.toLocaleTimeString('en-US', { timeZone: weatherInfo.timezone });
}

timeZone.innerText = timeZoneOfCountry(weatherInfo.dt);