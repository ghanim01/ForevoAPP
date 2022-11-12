<template>
  <div>
    <v-sheet
      class="ms-3 text-center py-5 mt-2"
      theme="dark"
      color="teal-darken-4"
      min-width="100%"
      rounded
    >
      <div v-if="loading == true">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </div>
      <div v-if="loading == false">
        <h3
          class="mb-5 text-grey-lighten-3 text-h5 font-weight-medium text-uppercase"
        >
          Soccer Results
        </h3>
        <v-sheet
          theme="light"
          height="120px"
          class="d-flex flex-row m-0 pa-0 justify-center align-center text-center"
        >
          <img :src="competition.emblem" width="100" />
        </v-sheet>

        <v-card
          v-for="(match, index) in matches"
          :item="match"
          :index="index"
          :key="match.id"
          class="my-3 mx-3 py-3 justify-center align-center"
          min-width="95%"
        >
          <v-row class="py-2">
            <v-col
              col="5"
              md="5"
              lg="5"
              class="d-flex flex-wrap justify-end align-center"
            >
              <span class="mx-3 text-subtitle-2">{{
                match.homeTeam.shortName
              }}</span>
              <v-img :src="match.homeTeam.crest" max-width="32" />
            </v-col>
            <v-col
              col="2"
              md="2"
              lg="2"
              class="d-flex flex-wrap justify-center align-center"
            >
              <h4 class="mx-3">
                {{ match.score.fullTime.home }} -
                {{ match.score.fullTime.away }}
              </h4>
            </v-col>
            <v-col
              col="5"
              md="5"
              lg="5"
              class="d-flex flex-wrap justify-start align-center"
            >
              <v-img :src="match.awayTeam.crest" max-width="32" />
              <span class="mx-3 text-subtitle-2">{{
                match.awayTeam.shortName
              }}</span>
            </v-col>
          </v-row>
          <v-card-text class="pb-1 pt-3 ma-0">
            {{ convertDate(match.utcDate) }}
          </v-card-text>
        </v-card>
        <v-sheet
          theme="light"
          height="120px"
          class="d-flex flex-row m-0 pa-0 justify-center align-center text-center"
        >
          <img :src="WCcompetition.emblem" width="100" />
        </v-sheet>

        <v-card
          v-for="(match, index) in WCmatches"
          :item="match"
          :index="index"
          :key="match.id"
          class="my-3 mx-3 py-3 justify-center align-center"
          min-width="95%"
        >
          <v-row class="py-2">
            <v-col
              col="5"
              md="5"
              lg="5"
              class="d-flex flex-wrap justify-end align-center"
            >
              <span class="mx-3 text-subtitle-2">{{
                match.homeTeam.shortName
              }}</span>
              <v-img :src="match.homeTeam.crest" max-width="32" />
            </v-col>
            <v-col
              col="2"
              md="2"
              lg="2"
              class="d-flex flex-wrap justify-center align-center"
            >
              <h4 class="mx-3">
                {{ match.score.fullTime.home }} -
                {{ match.score.fullTime.away }}
              </h4>
            </v-col>
            <v-col
              col="5"
              md="5"
              lg="5"
              class="d-flex flex-wrap justify-start align-center"
            >
              <v-img :src="match.awayTeam.crest" max-width="32" />
              <span class="mx-3 text-subtitle-2">{{
                match.awayTeam.shortName
              }}</span>
            </v-col>
          </v-row>
          <v-card-text class="pb-1 pt-3 ma-0">
            {{ convertDate(match.utcDate) }}
          </v-card-text>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { useSoccerStore } from "../stores/soccerStore";
export default {
  setup() {
    const soccerStore = useSoccerStore();
    return {
      soccerStore,
    };
  },
  name: "soccerResults",
  data: () => ({
    isLoading: true,
  }),
  computed: {
    loading() {
      return this.soccerStore.loading;
    },

    matches() {
      let x = this.soccerStore.getSoccerResults.matches;
      let reveresed = x.reverse();
      let slicedMatches = reveresed.slice(0, 20);
      return slicedMatches;
    },
    competition() {
      return this.soccerStore.getSoccerResults.competition;
    },
    WCmatches() {
      let x = this.soccerStore.getWCResults.matches;
      let slicedMatches = x.slice(0, 20);
      return slicedMatches;
    },
    WCcompetition() {
      return this.soccerStore.getWCResults.competition;
    },
  },
  methods: {
    convertDate(utc) {
      let mDate = new Date(utc);
      return mDate.toLocaleString();
    },
  },
};
</script>
<style></style>
