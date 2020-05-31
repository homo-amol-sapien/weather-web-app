"use strict";

import { Forecast } from "./forecast";

const forecast = new Forecast();

const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const cityValue = form.city.value;

  await forecast.setCityID(cityValue);

  const weather = await forecast.getCityWeather();

  const fiveDayForecast = await forecast.getFiveDayForecast();

  updateTodayWeather(forecast.cityName, weather);

  updateFiveDayWeather(fiveDayForecast);
});

const city = document.querySelector(".city");
const weatherLogo = document.querySelector(".logo");
const temprature = document.querySelector(".temp");

async function updateTodayWeather(cityName, weather) {
  city.textContent = cityName;

  weatherLogo.innerHTML = `<img src="./images/icons/${weather.WeatherIcon}.svg"/>
            <h3>${weather.WeatherText}</h3>`;

  temprature.innerHTML = `<h2>Temprature</h2>
            <h1 class="deg">${weather.Temperature.Metric.Value}&deg; C</h1>`;
}

const days = document.querySelectorAll(".day");

const nights = document.querySelectorAll(".night");

const tempratures = document.querySelectorAll(".temprature");

async function updateFiveDayWeather(fiveDayForecast) {
  const dailyForecasts = fiveDayForecast.DailyForecasts;

  updateEachDaysForecast(dailyForecasts, days);

  updateEachNightsForecast(dailyForecasts, nights);

  updateEachDaysTemprature(dailyForecasts, tempratures);
}

async function updateEachDaysForecast(forecast, days) {
  days.forEach((day, index) => {
    day.innerHTML = `<img src="./images/icons/${forecast[index].Day.Icon}.svg" />

    <h3 class="day-icon-name"> ${forecast[index].Day.IconPhrase}</h3>`;
  });
}

async function updateEachNightsForecast(forecast, nights) {
  nights.forEach((night, index) => {
    night.innerHTML = `<img src="./images/icons/${forecast[index].Night.Icon}.svg" />

    <h3 class="night-icon-name"> ${forecast[index].Night.IconPhrase}</h3>`;
  });
}

async function updateEachDaysTemprature(forecast, tempratures) {
  tempratures.forEach((temprature, index) => {
    const maxTemprature = fahrenheitToCelsius(
      forecast[index].Temperature.Maximum.Value
    );

    const minTemprature = fahrenheitToCelsius(
      forecast[index].Temperature.Minimum.Value
    );

    temprature.innerHTML = `<h3 class="max"> ${maxTemprature}&deg; C</h3>

                            <h3 class="min"> ${minTemprature}&deg; C</h3>`;
  });
}

function fahrenheitToCelsius(fahrenheit) {
  const celsius = ((fahrenheit - 32) / 1.8).toPrecision(2);

  return celsius;
}
