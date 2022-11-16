<template>
  <div class="d-flex flex-wrap me-10">
    <v-sheet
      class="text-center"
      theme="dark"
      color="teal-darken-4"
      min-width="100%"
      rounded
    >
      <h3
        class="my-5 text-grey-lighten-3 text-h5 font-weight-medium text-uppercase"
      >
        News Headlines
      </h3>
    </v-sheet>
    <v-card
      v-for="(article, index) in articles"
      :item="article"
      :index="index"
      :key="article.id"
      width="100%"
      min-height="60px"
      class="mx-0 my-2 py-3 rtlStl"
      theme="dark"
      fill-height
      @click="newsDialog = true"
    >
      <a
        :href="article.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-decoration-none"
      >
        <v-row no-gutters>
          <v-col col="12" md="5" lg="5" class="px-5 d-flex align-center">
            <v-img
              lazy-src="../assets/imageLazy.png"
              v-ripple
              :src="article.urlToImage"
              class="align-start imgSt"
              cover
              transition="slide-x-reverse-transition"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    indeterminate
                    color="teal-lighten-4"
                  ></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-col>
          <v-col col="12" md="7" lg="7" class="px-2">
            <v-card-title class="align-start text-h6 text-white text-wrap ps-0">
              {{ articleTitle(article.title) }}
            </v-card-title>
            <v-card-subtitle
              class="text-subtitle-2 text-grey-lighten-3 text-start ps-0"
              ><span>{{ convertDate(article.publishedAt) }}</span>
            </v-card-subtitle>
            <v-card-subtitle
              class="text-subtitle-2 text-grey-lighten-3 text-start pt-2 ps-0"
            >
              <span>{{ article.source.name }}</span>
            </v-card-subtitle>

            <v-sheet class="text-white text-start ps-0 pe-4 py-5 mx-0">
              <h1 class="text-subtitle-1 font-weight-medium">
                {{ article.description }}
              </h1>
            </v-sheet>
          </v-col>
        </v-row>
      </a>
    </v-card>
    <!-- <v-carousel hide-delimiters cycle interval="9000" progress>
      <v-carousel-item
        v-for="(article, i) in articles"
        :item="article"
        :key="i"
        :src="article.urlToImage"
        class="align-end xyz"
        cover
      >
        <a :href="article.url" target="_blank" rel="noopener noreferrer">
          <v-sheet
            color="rgba(0,0,0,.8)"
            class="text-white text-center px-2 py-7 mx-0 xyz"
          >
            <h1 class="text-subtitle-1 text-white font-weight-medium">
              {{ article.description }}
            </h1>
          </v-sheet>
        </a></v-carousel-item
      >
    </v-carousel> -->
  </div>
</template>
<script>
import { useNewsStore } from "../stores/NewsStore";
export default {
  setup() {
    const newStore = useNewsStore();
    return { newStore };
  },
  name: "newsComponent",
  data: () => ({
    newsDialog: false,
  }),
  computed: {
    articles() {
      return this.newStore.getNewsResult;
    },
  },
  methods: {
    articleTitle(x) {
      let z = x.split("-");
      return z[0];
    },
    convertDate(utc) {
      let mDate = new Date(utc);
      return mDate.toLocaleString();
    },
  },
};
</script>
<style scoped>
.rtlStl {
  direction: rtl;
  font-family: Arial, Helvetica, sans-serif;
}
.xyz a {
  text-decoration: none !important;
  text-transform: none;
}
.imgSt {
  border-radius: 0.2rem;
}
.imgSt:hover {
  opacity: 0.8;
}
</style>
