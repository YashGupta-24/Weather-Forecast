const Date_URL = "https://worldtimeapi.org/api/timezone/Asia/Kolkata"; //API for time, date, week, etc
let searchButton = document.querySelector('button'); //Search Button
let temperature = document.querySelector("#temperature"); //Current temp of a particular location
let date = document.querySelector('#date'); //Display current date
let cityDisplay = document.querySelector('#city'); //Display the searched city
let time = document.querySelector('#time'); //Display current time
let greeting = document.querySelector('#Greeting'); //Display Greeting (Good morning...)
let Status=document.querySelector("#Status"); //Displaying the status of temperature
let feels=document.querySelector('#feels'); //Displaying feels like temperature
let latitude=document.querySelector("#latitude"); //Display latitude of current location
let longitude=document.querySelector("#longitude"); //Display longitude of current location
let humidity=document.querySelector('#humidity'); //Display humidity
let pressure=document.querySelector('#pressure'); //Display pressure
let windSpeed=document.querySelector('#wind'); //Display wind speed
let response, data; //To get response & data from APIs
let inputCity; //Get Entered City

//Onclick for search button
searchButton.addEventListener('click', () => {
    inputCity = document.querySelector('input').value;
    //Checking if anything is entered or not
    if (inputCity != "")
        temp(inputCity);
    else
        alert("Enter any city, country name");
});

const temp = async (inputCity) => {
    //API for temperature info
    const Temp_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=2f0816befe5d2daac3dbd0a8b5118ef9`;
    response = await fetch(Temp_URL);
    data = await response.json();

    //Checking if the entered name is of a correct station or not
    if (data.cod != "404") {
        temperature.innerText = toCelsius(data.main.temp);
        cityDisplay.innerText = inputCity;
        Status.innerText=data.weather[0].description.toUpperCase(); 
        feels.innerText=`feels like: ${toCelsius(data.main.feels_like)}`;
        latitude.innerText=data.coord.lat;
        longitude.innerText=data.coord.lon;
        humidity.innerText=`${data.main.humidity} %`;
        pressure.innerText=`${data.main.pressure} hPa`;
        windSpeed.innerText=`${data.wind.speed} km/h`;
    }
    else {
        alert("Enter a correct city, country name");
        reset();
    }
}

//Function to convert fahrenheit to degree celsius
const toCelsius = (temp) => {
    return ((temp - 273).toFixed(1));
}

//Function to reset the values
const reset=()=>{
    cityDisplay.innerText = "City";
    tempStatus.innerText="";
    latitude.innerText="";
    longitude.innerText="";
    humidity.innerText="";
    pressure.innerText="";
    windSpeed.innerText="";
}

setInterval(()=>{
    let dateData=new Date();
    time.innerHTML=dateData.toLocaleTimeString();
    if(date.innerText!=dateData.toLocaleDateString()){
        date.innerHTML=dateData.toLocaleDateString();
        greet(dateData.getHours());
    }
},1000);

//Function to change the greeting and timeStatus(i.e. AM/PM)
const greet = (hour) => {
    if (hour >= '04' && hour < '12') {
        greeting.innerText = "Good Morning";
    }
    else if (hour>='12' && hour <= '16') {
        greeting.innerText = "Good Afternoon";
    }
    else if (hour >='17' && hour <= '20') {
        greeting.innerText = "Good Evening";
    }
    else {
        greeting.innerText = "Good Night";
    }
}