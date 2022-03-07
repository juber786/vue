<template>
  <div v-if="loading" class="overlay">
     <div class="loader"></div>
  </div>
  
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="!loading && showDetails">
          <h3 class="title mb-3">{{ showDetails.name }}</h3>
          <div class="showDetails row">
            <div class="col-md-3">
              <img
                v-if="showDetails.image && showDetails.image.medium"
                class="showimg"
                :src="showDetails.image.medium"
              />
            </div>
            <div class="col-md-9">
              <div v-html="showDetails.summary"></div>
              <div class="Bwidth">
                <div class="text-sm">
                  <b>Genres :</b>
                  <span v-for="(genre, index) in showDetails.genres" :key="index">{{ genre }} &nbsp;</span>
                </div>
                <div class="text-sm">
                  <b>Language :</b>
                  <span>{{ showDetails.language }} &nbsp;</span>
                </div>
                <div class="text-sm">
                  <b>Rating :</b>
                  <span v-if="showDetails.rating">{{ showDetails.rating.average }} &nbsp;</span>
                </div>
                <div class="text-sm">
                  <b>Country :</b>
                  <span v-if="showDetails.network">{{ showDetails.network.country.name }} &nbsp;</span>
                </div>
                <div class="text-sm">
                  <b>Url :</b>
                  <a :href="showDetails.url">{{ showDetails.url }} &nbsp;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TvShowService from "../services/TvShowsService.js";
export default {
  name: "TvShowDetails",
  data() {
    return {
      id: parseInt(this.$route.params.id),
      showDetails: {},
      loading: false,
    };
  },
  methods: {
    displayData() {
      this.loading = true
      TvShowService.getTvShowDetails(this.id)
        .then((res) => {
          this.showDetails = res;
          this.loading = false
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.displayData();
  },
};
</script>
<style>
.title {
  margin-top: 20px;
}
.showimg {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #ddd;
}
.showDetails {
  display: flex;
  flex-direction: row;
}
.text-sm {
  border-bottom: 1px solid #ddd;
  padding: 8px 0px;
}
.Bwidth b {
  width: 110px;
  display: inline-block;
}
</style>