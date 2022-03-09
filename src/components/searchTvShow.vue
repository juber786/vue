<template>
  <div class="serWrap">
    <select id="select" class="form-control w100" v-model='selected' placeholder="By Category"
    @change="$emit('filterByCat', selected)" >
       <option value="All" selected="selected">All</option>
       <option value="Drama">Drama</option>
       <option value="Action">Action</option>
       <option value="Comedy">Comedy</option>
    </select>
    <input type="search" id="site-search" aria-label="Search TV Show" class="form-control w100" placeholder="Search TV Show" v-model="search" />
    <button id="search" type="button" @click="$emit('getSearchKey', search)" class="btn btn-primary btn-sm">
      Search
    </button>
  </div>
</template>
<script>
export default {
  name: "SearchTvShow",
  data() {
    return {
      search: "",
      selected: "All",
    };
  },
};
</script>
<style>
.serWrap {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
}
.serWrap input {
  margin-right: 5px;
}
.w100{width:180px; margin-right: 10px;}

@media only screen and (max-width: 768px){
.serWrap { justify-content: left; margin-bottom:5px;}
}

</style>
