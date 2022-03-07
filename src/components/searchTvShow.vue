<template>
  <div class="serWrap">
    <select class="form-control w100" v-model="selected"  placeholder="By Category" @change="filterCategory" >
       <option selected="selected" value="All">All</option>
       <option value="Drama">Drama</option>
       <option value="Action">Action</option>
       <option value="Comedy">Comedy</option>
    </select>
    <input type="search" id="site-search" aria-label="Search TV Show" class="form-control w100" placeholder="Search TV Show" v-model="search" />
    <button id="search" type="button" @click="getData" class="btn btn-primary btn-sm">
      Search
    </button>
  </div>
</template>
<script>
export default {
  name: "SearchTvShow",
  
  emits: ["getSearchKey", "filterByCat"],
 
  data() {
    return {
      search: "",
      selected: "All",
    };
  },
  methods: {
    getData() {
      this.$emit("getSearchKey", this.search);
    },
    filterCategory(e){
      this.$emit("filterByCat", e.target.value);
     
    }
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
</style>

