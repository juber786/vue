<template>
  <div>
    <div v-if="loading" class="overlay">
      <div class="loader"></div>
    </div>
    <div v-else class="container">
      <div class="row">
        <div class="col-md-6"><h3>{{title}}</h3></div>
        <div class="col-md-6">
          <SearchTvShow
            @getSearchKey="getSearchData"
            @filterByCat="filterTvShowByCat"
          />
        </div>
        <div class="col-md-12">
          <TvShowTable :shows="dataByRoutePath" />
          <div v-if="errorText != ''" class="alert alert-danger text-center">{{errorText}}</div>
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
      title: 'Top 5',
      tvShows: [],
      tvShowsHistory: [],
      pageNumber: 0,
      loading: false,
      selectedCategory: 'All',
      errorText: ''

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
            this.tvShows = this.tvShowsHistory
            this.loading = false;
      } catch (error) {
        this.errorText = error
      }
    },
    getSearchData(searchKey) {
      this.loading = true;
      if (searchKey === "") {
        this.displayTvShowData();
        this.loading = false;
      } else {
          TvShowsService.getSearchResult(searchKey)
          .then((res) => {
              let serchResult = res.sort(
                (a, b) => b.show.rating.average - a.show.rating.average
              ).map((val) => val.show);
              this.tvShow = serchResult;
              this.tvShowsHistory = serchResult
              this.loading = false;
           })
           .catch((error) => {
             this.errorText = error
           });
      }
    },
    filterTvShowByCat(category) {
      let filteredData =
        category !== "All"
          ? filterByCategory(this.tvShowsHistory, category)
          : this.tvShowsHistory;
          this.tvShows = filteredData;

    },
    getMoreData() {
      TvShowsService.getTvShowByPage(this.pageNumber)
        .then((res) => {
          this.tvShowsHistory = this.tvShowsHistory.concat(res);
          console.log(this.tvShowsHistory)
          let filterResult =  this.selectedCategory !== "All"
                              ? filterByCategory(res, this.selectedCategory)
                              : res;
          this.tvShows = this.tvShows.concat(filterResult);
        })
         .catch((error) => {
          this.errorText = error
        });
    },
    scrollfunction() {
      if (this.tvShows.length && window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 40)
      { this.pageNumber++;
        this.getMoreData();
      }
    }

  },
  created() {
      this.displayTvShowData();
  },
  unmounted() {
    document.removeEventListener("scroll", this.scrollfunction);
  },
  computed: {
      dataByRoutePath(){
        return this.$route.path === '/' ? this.tvShows.slice(0, 5) : this.tvShows
      },
  },
  watch:{
    '$route.path': {
        handler: function(path) {
          if(path === '/'){
              this.title = 'Top 5';
              document.removeEventListener("scroll", this.scrollfunction);
            }else{
              this.title = 'All TV Shows';
              document.addEventListener("scroll", this.scrollfunction);
            }
        },
        deep: true,
        immediate: true
      }
  },
  components: {
    TvShowTable,
    SearchTvShow,
  }
};
</script>
<style>
</style>
