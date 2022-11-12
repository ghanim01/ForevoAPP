import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "../utils/axios";
export const useSoccerStore = defineStore("soccerStore", {
  state: () => ({
    soccerResults: ref({}),
    worldCupResults: ref({}),
    loading: true,
  }),
  getters: {
    getSoccerResults: function () {
      return this.soccerResults;
    },
    getWCResults: function () {
      return this.worldCupResults;
    },
  },
  actions: {
    async searchSoccer() {
      const authToken = import.meta.env.VITE_SOCCER_TOKEN;
      console.log(authToken);
      var config = {
        method: "get",
        url: "/api/competitions/PL/matches",
        headers: {
          "X-Auth-Token": authToken,
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          status: "FINISHED",
        },
      };
      let res = await axios(config).catch(function (error) {
        console.log(error);
      });
      this.soccerResults = res.data;
    },
    async searchWCMatches() {
      const authToken = import.meta.env.VITE_SOCCER_TOKEN;
      var config = {
        method: "get",
        url: "/api/competitions/WC/matches",
        headers: {
          "X-Auth-Token": authToken,
          "Access-Control-Allow-Origin": "*",
        },
      };
      let res = await axios(config).catch(function (error) {
        console.log(error);
      });
      this.worldCupResults = res.data;
      this.loading = false;
    },
  },
});
