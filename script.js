const KEY = "e662586e097e47f694c105707212612";

const frm = document.getElementById("frmSearch");
frm.addEventListener("submit", (e) => getWeather(e));

const city = document.getElementById("city");

var cityLocation = document.getElementById("location");
const currentDate = document.getElementById("currentDate");
const day = document.getElementById("day");
const todayImage = document.getElementById("todayImage");
const todayDegree = document.getElementById("todayDegree");
const todayCondition = document.getElementById("todayCondition");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const logos = document.getElementsByClassName("logo");
const days = document.getElementsByClassName("date");
const degrees = document.getElementsByClassName("degree");

async function getWeather(e) {
  e.preventDefault();
  var res = await (
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city.value}&days=3&aqi=no&alerts=no`,
      { mode: "cors" }
    )
  ).json();

  if (res.error) {
    cityLocation.innerHTML = res.error.message;
    city.value = "";
  } else setInfo(res);
}

function setInfo(weather) {
  //Set Location
  cityLocation.innerText = `${weather.location.name} | ${weather.location.country}`;

  //SetImage
  todayImage.setAttribute(
    "src",
    `.${weather.current.condition.icon.substring(20)}`
  );
  //Set Today Temperature
  todayDegree.innerHTML = `${weather.current.temp_c} &degC`;
  //Set Today Condition
  todayCondition.innerHTML = weather.current.condition.text;

  //Set Date
  var date = Date.parse(weather.forecast.forecastday[0].date);
  var d = new Date(date);
  currentDate.innerText = `${getDayName(
    d.getDay()
  )}-${d.getMonth()}-${d.getFullYear()}`;

  //Set Day
  day.innerText = getDayName(d.getDay());

  //Set HUMIDITY , WIND
  humidity.innerHTML = weather.current.humidity;
  wind.innerHTML = `${weather.forecast.forecastday[0].day.maxwind_kph} KM/H`;

  //Set Days
  for (var i = 0; i <= 2; i++) {
    logos[i].setAttribute(
      "src",
      `.${weather.forecast.forecastday[i].day.condition.icon.substring(20)}`
    );
    days[i].innerHTML = getDayName(d.getDay() + i);
    degrees[
      i
    ].innerHTML = `${weather.forecast.forecastday[i].day.avgtemp_c} &degC`;
  }

  city.value = "";
}

function getDayName(day) {
  var days = ["SUN", "MON", "TUE", "THU", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
