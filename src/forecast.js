class Forecast {
  constructor() {
    this.key = "ZExhgDtfL6dAox3Epys81gGqyodNBaKB";

    this.cityUrl =
      "http://dataservice.accuweather.com/locations/v1/cities/search";

    this.weatherUrl =
      "http://dataservice.accuweather.com/currentconditions/v1/";

    this.fiveDayForecastUrl =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

    this.cityID = "";

    this.cityName = "";
  }

  async setCityID(cityName) {
    try {
      const query = `?apikey=${this.key}&q=${cityName}`;

      const response = await fetch(this.cityUrl + query);

      if (response.status === 200) {
        const json = await response.json();

        this.cityID = json[0].Key;

        this.cityName = json[0].EnglishName;
      } else {
        throw new Error("Error fetching data!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCityWeather() {
    try {
      const query = `${this.cityID}?apikey=${this.key}`;

      const response = await fetch(this.weatherUrl + query);

      if (response.status === 200) {
        const json = await response.json();

        return json[0];
      } else {
        throw new Error("Error fetching city weather!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getFiveDayForecast() {
    try {
      const query = `${this.cityID}?apikey=${this.key}`;

      const response = await fetch(this.fiveDayForecastUrl + query);
      if (response.status === 200) {
        const json = await response.json();

        return json;
      } else {
        throw new Error("Error getting five day forecast!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { Forecast };
