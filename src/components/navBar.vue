<template>
  <v-app-bar theme="dark" density="default" class="align-center" extended>
    <v-app-bar-title>
      <v-img src="../assets/forevoLogo.png" width="110px" class="mt-6 ml-8" />
    </v-app-bar-title>
    <v-text-field
      v-model.lazy="model"
      label="search"
      prepend-inner-icon="mdi-magnify"
      clearable
      density="compact"
      class="mt-12 me-3"
      variant="outlined"
      rounded
      @keydown.enter="searchCity()"
    ></v-text-field>
    <!-- <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      hide-no-data
      hide-selected
      item-title="Description"
      item-value="name"
      label="Search Cities"
      placeholder="Start typing to Search"
      prepend-icon="mdi-city"
      return-object
      clearable
    ></v-autocomplete> -->
    <v-btn
      @click="searchCity()"
      class="mt-6 px-0 text-blue-lighten-3"
      variant="flat"
      ripple
      icon="mdi-magnify"
    ></v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
// import cities from "cities.json";
// import _ from "lodash";
import { onMounted, ref } from "vue";
import { useWeatherStore } from "../stores/weatherStore";
import { useNewsStore } from "../stores/NewsStore";
// import cities from "cities.json";
// import _ from "lodash";
import { useSoccerStore } from "../stores/soccerStore";

export default {
  setup() {
    const weatherStore = useWeatherStore();
    const newsStore = useNewsStore();
    const soccerStore = useSoccerStore();
    const model = ref("");
    onMounted(() => {
      model.value = "Cairo";
      weatherStore.searchCityName(model.value);
      newsStore.searchCity(model.value);
      soccerStore.searchSoccer();
      soccerStore.searchWCMatches();
    });
    return {
      weatherStore,
      newsStore,
      soccerStore,
      model,
    };
  },
  name: "navBar",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    search: null,
  }),
  methods: {
    searchCity() {
      this.weatherStore.searchCityName(this.model);
      this.newsStore.searchCity(this.model);
    },
  },
  // computed: {
  //   // fields() {
  //   //   if (!this.model) return [];

  //   //   return Object.keys(this.model).map((key) => {
  //   //     return {
  //   //       key,
  //   //       value: this.model[key] || "n/a",
  //   //     };
  //   //   });
  //   // },
  //   items() {
  //     return this.entries.map((entry) => {
  //       const Description =
  //         entry.name.length > this.descriptionLimit
  //           ? entry.name.slice(0, this.descriptionLimit) + "..."
  //           : entry.name;

  //       return Object.assign({}, entry, { Description });
  //     });
  //   },
  // },

  // watch: {
  //   model() {
  //     // Items have already been loaded
  //     if (this.items.length > 0) return;

  //     // Items have already been requested
  //     if (this.isLoading) return;

  //     this.isLoading = true;
  //     setTimeout(() => {
  //       let z = [];
  //       z = this.model.toLocaleLowerCase().trim();
  //       let y = z[0].toUpperCase() + z.slice(1);
  //       const x = _.findIndex(cities, function (o) {
  //         return o.name == y;
  //       });
  //       this.entries = cities[x];
  //       console.log(this.entries);
  //     }, 500);
  //     // stop loading
  //     this.isLoading = false;
  //   },
  // },
};
</script>
<style></style>
