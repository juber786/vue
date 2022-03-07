<template>
  <div v-if="loading" class="overlay">,
    <div class="loader"></div>
  </div>
  
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-4"><h3 >TV Shows</h3></div>
      <div class="col-md-6 col-8">
        <SearchTvShow @getSearchKey="getSearchData" @filterByCat="filterTvShowByCat" />
      </div>
      <div class="col-md-12">
        <TvShowTable v-if="!loading" :shows="tvShows" />
      </div>
    </div>
  </div>
</template>
<script>
import TvShowTable from "./TvShowTable.vue";
import SearchTvShow from "./SearchTvShow.vue";
import TvShowService from "../services/TvShowsService.js";
import { filterByCategory } from '../utils/filterUtil.js'
export default {
  name: "ListTvShows",
  data() {
    return {
      tvShows: [],
      tvShowsHistory: [],
      pageNumber: 0,
      loading: false,
      categoryHistory: 'All',
     
    };
  },
  methods: {
    displayTvShowData() {
      this.loading = true;
      TvShowService.getTvShow()
        .then((res) => {
           
           this.tvShows = res.sort((a, b) =>  b.rating.average - a.rating.average);
           this.tvShowsHistory = this.tvShows
           this.loading = false;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    getSearchData(searchKey) {
      this.loading = true;
      if (searchKey === "") {
        this.displayTvShowData();
        this.loading = false;
      } else {
        TvShowService.getSearchResult(searchKey)
          .then((res) => {
            this.tvShows = res.map((val) => {
              return val.show;
            });
            this.tvShowsHistory = this.tvShows
            this.scrollfunction();
            this.loading = false;
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    },
    getMoreData() {
      TvShowService.getTvShowByPage(this.pageNumber)
        .then((res) => {
          this.tvShowsHistory = this.tvShowsHistory.concat(res);
          let filterResult =  this.categoryHistory !== "All"
                              ? filterByCategory(res, this.categoryHistory)
                              : res;
          
          this.tvShows = this.tvShows.concat(filterResult);
        })
         .catch((err) => {
          console.log("Error", err);
        });
    },
    scrollfunction() {
      if (this.tvShows.length && window.innerHeight + window.scrollY >= 
      document.body.offsetHeight - 40) 
      {
        this.pageNumber++;
        this.getMoreData();
      }
    },
    filterTvShowByCat(category){
       this.categoryHistory = category;
       let filteredData = category !== "All"
          ? filterByCategory(this.tvShowsHistory, category)
          : this.tvShowsHistory;
       this.tvShows = filteredData;
    }
  },
  created() {
    this.displayTvShowData();
    document.addEventListener("scroll", this.scrollfunction);
  },
  unmounted() {
    document.removeEventListener("scroll", this.scrollfunction);
  },
  components: {
    TvShowTable,
    SearchTvShow,
  },
};
</script>
<style>

</style>