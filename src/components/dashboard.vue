<template>
  <div v-if="loading" class="overlay"></div>
  <div v-if="loading" class="loader"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-4"><h3>Popular TV Shows</h3></div>
      <div class="col-md-6 col-8">
        <searchTvShow @getSearchKey="getSearchData" />
      </div>
      <div class="col-md-12">
        <tvShowTable :shows="tvShows" />
      </div>
    </div>
  </div>
</template>
<script>
import tvShowTable from "../components/tvshowTable.vue";
import searchTvShow from "../components/searchTvShow.vue";
import tvShowService from "../services/tvshows-service.js";
export default {
  name: "dashboard",
  data() {
    return {
      tvShows: [],
      loading: false,
    };
  },
  methods: {
    displayTvShowData() {
      this.loading = true;
      tvShowService.getTvShow()
        .then((res) => {
          let getHighRating = res.sort((a, b) => {
            if (a.rating.average < b.rating.average) {
              return 1;
            }
            if (a.rating.average > b.rating.average) {
              return -1;
            }
          });
          this.tvShows = getHighRating.slice(0, 5);
          this.loading = false;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },

    getSearchData(e) {
      this.loading = true;
      if (e === "") {
        this.displayTvShowData();
        this.loading = false;
      } else {
        tvShowService.getSearchResult(e)
          .then((res) => {
           let transData = res.sort((a, b) => {
              if (a.show.rating.average < b.show.rating.average) {
                return 1;
              }
              if (a.show.rating.average > b.show.rating.average) {
                return -1;
              }
            });
            let searchResult = transData.map((val) => {
              return val.show;
            });
            this.tvShows = searchResult.slice(0, 5);
            this.loading = false;
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    },
  },
  created() {
    this.displayTvShowData();
  },
  components: {
    tvShowTable,
    searchTvShow,
  },
};
</script>
<style>
</style>