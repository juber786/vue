<template>
  <div>
    <div v-if="loading" class="overlay">
      <div class="loader"></div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6"><h3>Popular TV Shows</h3></div>
        <div class="col-md-6">
          <SearchTvShow
            @getSearchKey="getSearchData"
            @filterByCat="filterTvShowByCat"
          />
        </div>
        <div class="col-md-12">
          <TvShowTable :shows="tvShows" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TvShowTable from "./TvShowTable.vue";
import SearchTvShow from "./SearchTvShow.vue";
import TvShowsService from "../services/TvShowsService.js";
import { filterByCategory } from "../utils/filterUtil.js";
export default {
  name: "dashboard",
  data() {
    return {
      tvShows: [],
      loading: false,
      tvShowsHistory: [],
    };
  },
  methods: {
    async displayTvShowData() {
      try {
        this.loading = true;
        const resp =  await TvShowsService.getTvShow();
        this.tvShowsHistory = resp.sort(
          (a, b) => b.rating.average - a.rating.average
        );
        this.tvShows = this.tvShowsHistory.slice(0, 5);
        this.loading = false;
      } catch (error) {
        console.log("Error", error);
      }
    },
    getSearchData(searchKey) {
      this.loading = true;
      if (searchKey === "") {
        this.displayTvShowData();
        this.loading = false;
      } else {
        try {
          let searchResult = TvShowsService.getSearchResult(searchKey).sort(
              (a, b) => b.show.rating.average - a.show.rating.average
            ).map((val) => val.show);
            this.tvShows = searchResult.slice(0, 5);
            this.loading = false;
        } catch (error) {
          console.log("Error", error);
        }
      }
    },
    filterTvShowByCat(category) {
      let filteredData =
        category !== "All"
          ? filterByCategory(this.tvShowsHistory, category)
          : this.tvShowsHistory;

      this.tvShows = filteredData.slice(0, 5);
    }
  },
  created() {
    console.log(this.$route.path);
    this.displayTvShowData();
  },
  components: {
    TvShowTable,
    SearchTvShow,
  },
};
</script>
<style>
</style>
