import { ref } from "vue";
import { defineStore } from "pinia";
import cities from "cities.json";
import _ from "lodash";
import axios from "axios";
export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    searchresponseult: {
      temp: 0,
      city: "",
      windSpeed: "",
      windDeg: "",
      humidity: "",
      clouds: "",
      xicon: "04n",
      description: "",
      feels_like: "",
      temp_min: "",
      temp_max: "",
      date: "",
      sunrise: "",
      sunset: "",
      condition: "",
    },
    cityresponseult: ref(""),
  }),
  getters: {
    getSearchInput: function () {
      return this.searchresponseult;
    },
  },
  actions: {
    searchCityName(city) {
      let z = [];
      z = city.toLocaleLowerCase().trim();
      let y = z[0].toUpperCase() + z.slice(1);
      const x = _.findIndex(cities, function (o) {
        return o.name == y;
      });
      this.cityresponseult = cities[x];
      this.searchresponseult.city = this.cityresponseult.name;
      this.searchWeather();
    },
    async searchWeather() {
      const appID = import.meta.env.VITE_APP_ID;
      let response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weatherapi/weather",
        {
          params: {
            lat: this.cityresponseult.lat,
            lon: this.cityresponseult.lng,
            appid: appID,
            units: "metric",
          },
        }
      );
      var datetime = new Date(response.data.dt * 1000);
      var sunrise = new Date(response.data.sys.sunrise * 1000);
      var sunset = new Date(response.data.sys.sunset * 1000);
      var formattedDate = datetime.toLocaleString();
      var formattedSunrise = sunrise.toLocaleTimeString();
      var formattedSunset = sunset.toLocaleTimeString();
      this.searchresponseult.date = formattedDate;
      this.searchresponseult.sunrise = formattedSunrise;
      this.searchresponseult.sunset = formattedSunset;
      this.searchresponseult.temp = response.data.main.temp;
      this.searchresponseult.humidity = response.data.main.humidity;
      this.searchresponseult.windSpeed = response.data.wind.speed;
      this.searchresponseult.windDeg = response.data.wind.deg;
      this.searchresponseult.clouds = response.data.clouds.all;
      this.searchresponseult.condition = response.data.weather[0].main;
      this.searchresponseult.xicon = response.data.weather[0].icon;
      this.searchresponseult.description = response.data.weather[0].description;
      this.searchresponseult.feels_like = response.data.main.feels_like;
      this.searchresponseult.temp_max = response.data.main.temp_max;
      this.searchresponseult.temp_min = response.data.main.temp_min;
      this.searchresponseult.city = response.data.name;
    },
  },
});
