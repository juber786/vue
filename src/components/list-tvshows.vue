<template>
  <div v-if="loading" class="overlay"></div>
  <div v-if="loading" class="loader"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-4"><h3 >TV Shows</h3></div>
      <div class="col-md-6 col-8">
        <searchTvShow @getSearchKey="getSearchData" />
      </div>
      <div class="col-md-12">
        <tvShowTable v-if="!loading" :shows="tvShows" />
      </div>
    </div>
  </div>
</template>
<script>
import tvShowTable from "../components/tvshowTable.vue";
import searchTvShow from "../components/searchTvShow.vue";
import tvShowService from "../services/tvshows-service.js";
export default {
  name: "listTvShows",
  data() {
    return {
      tvShows: [],
      pageNumber: 0,
      loading: false,
    };
  },
  methods: {
    displayTvShowData() {
      this.loading = true;
      tvShowService.getTvShow()
        .then((res) => {
           this.tvShows = res;
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
            this.tvShows = res.map((val) => {
              return val.show;
            });
            this.scrollfunction();
            this.loading = false;
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    },
    getMoreData() {
      tvShowService.getTvShowByPage(this.pageNumber)
        .then((res) => {
          this.tvShows = this.tvShows.concat(res);
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
  },
  created() {
    this.displayTvShowData();
    document.addEventListener("scroll", this.scrollfunction);
  },
  unmounted() {
    document.removeEventListener("scroll", this.scrollfunction);
  },
  components: {
    tvShowTable,
    searchTvShow,
  },
};
</script>
<style>

</style>