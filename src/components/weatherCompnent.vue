<template>
  <div>
    <v-card class="mx-3 py-3" width="100%">
      <v-card-title
        class="d-flex align-center justify-space-between text-h4 text-grey-lighten-1 pb-0"
      >
        {{ searchRes.city }}
        <v-card-subtitle class="text-subtitle-2 text-end"
          >{{ searchRes.date }} <br />
          Latest Updated
        </v-card-subtitle>
      </v-card-title>

      <v-card-text class="pt-0 pb-1 mx-3">
        <v-row align="center" class="text-center">
          <v-col cols="12" md="12" lg="12">
            <h1 class="text-h2 font-weight-regular">
              {{ Math.floor(searchRes.temp) }}&deg;C
            </h1>
            <v-card-subtitle
              class="d-flex justify-center text-center align-center mt-1"
            >
              <v-img :src="icon" max-width="32px" class="me-1"></v-img>
              {{ searchRes.description }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card-text>

      <v-row class="py-3 px-3 text-start justify-space-around" no-gutters>
        <v-col col="6" md="4" lg="4" align="center">
          <v-list>
            <v-list-item density="comfortable" title="Real Feel">
              <v-list-item-subtitle
                >{{ searchRes.feels_like }} &deg;C</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Sunrise">
              <v-list-item-subtitle>{{
                searchRes.sunrise
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Sunset">
              <v-list-item-subtitle>{{
                searchRes.sunset
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col col="6" md="4" lg="4" align="center">
          <v-list>
            <v-list-item density="comfortable" title="Max Temp ">
              <v-list-item-subtitle>
                {{ searchRes.temp_max }} &deg;C
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Humidity">
              <v-list-item-subtitle>
                {{ Math.floor(searchRes.humidity) }}
                %</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Clouds">
              <v-list-item-subtitle
                >{{ searchRes.clouds }} %</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-col>
        <v-col col="6" md="4" lg="4" align="center">
          <v-list>
            <v-list-item density="comfortable" title="Min Temp ">
              <v-list-item-subtitle>
                {{ searchRes.temp_min }} &deg;C</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Wind Speed">
              <v-list-item-subtitle
                >{{ searchRes.windSpeed }} M/S</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item density="comfortable" title="Wind Degree">
              <v-list-item-subtitle
                >{{ searchRes.windDeg }} Degree</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { useWeatherStore } from "../stores/weatherStore";

export default {
  setup() {
    const weatherStore = useWeatherStore();
    return {
      weatherStore,
    };
  },
  name: "weatherComponent",
  data: () => ({}),
  computed: {
    searchRes() {
      return this.weatherStore.getSearchInput;
    },
    icon() {
      return (
        "http://openweathermap.org/img/wn/" +
        this.weatherStore.getSearchInput.xicon +
        ".png"
      );
    },
  },
  methods: {},
};

// var icon = () => {
//   var url =
//     "http://openweathermap.org/img/wn/" + searchRes.value.xicon + ".png";
//   return url;
// };

// onMounted(() => {
//   search.value = "Cairo";
//   searchCity();
// });
// var background = ref("");
// switch (searchRes.value.condition) {
//   case "Thunderstorm":
//     background.value = "../assets/background/Thunderstorm.jpg";
//     break;
//   case "Drizzle":
//     background.value = "../assets/background/Drizzle.jpg";
//     break;
//   case "Rain":
//     background.value = "../assets/background/Rain.jpg";
//     break;
//   case "Snow":
//     background.value = "../assets/background/Snow.jpg";
//     break;
//   case "Atmosphere ":
//     background.value = "../assets/background/Atmosphere.jpg";
//     break;
//   case "Clear ":
//     background.value = "../assets/background/Clear.jpg";
//     break;
//   case "Clouds ":
//     background.value = "../assets/background/Clouds.jpg";
//     break;
//   default:
//     background.value = "../assets/background/Snow.jpg";
// }
// const switchedIMG = background.value;
// const bgVar = {
//   backgroundImage: `url("${switchedIMG}")`,
// };
// console.log(bgVar.backgroundImage);
// defineExpose({
//   bgVar,
//   switchedIMG,
// });
</script>
<style></style>
