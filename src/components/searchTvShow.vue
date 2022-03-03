<template>
  <div class="serWrap">
    <input type="text" placeholder="Search TV Show" v-model="search" />
    <button type="button" @click="getData" class="btn btn-primary btn-sm">
      Search
    </button>
  </div>
</template>
<script>
export default {
  name: "SearchKey",
  emits: ["getSearchKey"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    getData() {
      this.$emit("getSearchKey", this.search);
    },
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
</style>

