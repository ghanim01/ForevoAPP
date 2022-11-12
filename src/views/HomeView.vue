<template>
  <div background-color="transparent">
    <v-row>
      <v-col col="12" lg="12"> <navBar /> </v-col>
    </v-row>
    <v-row align-start>
      <v-col col="12" lg="4" align-self="start" position="fixed" no-gutters>
        <div no-gutters><weatherComponent /> <soccerResults /></div>
      </v-col>
      <v-col col="12" lg="8"> <newsComponent /> </v-col>
    </v-row>
  </div>
</template>
<script>
import navBar from "../components/navBar.vue";
import weatherComponent from "../components/weatherCompnent.vue";
import newsComponent from "../components/newsComponent.vue";
import soccerResults from "../components/soccerResults.vue";
export default {
  setup() {},
  name: "HomeView",
  components: {
    navBar,
    weatherComponent,
    newsComponent,
    soccerResults,
  },
  data: () => ({}),
  methods: {},
};
</script>
<style></style>
