import { ref } from "vue";
import { defineStore } from "pinia";
import cities from "cities.json";
import _ from "lodash";
import axios from "../utils/axios";

export const useNewsStore = defineStore("newsStore", {
  state: () => ({
    newsSearchResult: ref([]),
    cityresponseResult: ref(),
  }),
  getters: {
    getNewsResult: function () {
      return this.newsSearchResult;
    },
  },
  actions: {
    searchCity(city) {
      let z = [];
      z = city.toLocaleLowerCase().trim();
      let y = z[0].toUpperCase() + z.slice(1);
      const x = _.findIndex(cities, function (o) {
        return o.name == y;
      });
      this.cityresponseResult = cities[x];
      this.searchNews();
    },
    async searchNews() {
      let response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: this.cityresponseResult.country,
          sortBy: "publishedAt",
          apiKey: "54f15d50e2ff41acadc5109c8b8d4243",
        },
      });
      this.newsSearchResult = response.data.articles;
    },
  },
});
