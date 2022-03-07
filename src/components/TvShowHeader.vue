<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="menuWrapper">
          <ul class="menu">
            <li>
              <router-link to="/">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/tvShows">TV Shows</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TvShowHeader"
};
</script>
<style>
.menuWrapper {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.menu {
  margin-bottom: 0px;
  padding: 0px;
  margin-bottom: 25px;
  margin-top: 10px;
}
.menu li {
  list-style-type: none;
  display: inline-block;
  margin-right: 25px;
}
.menu li a {
  display: block;
}
.router-link-active {
  background: #222;
  padding: 4px;
  color: #fff;
  border-radius: 5px;
}
.router-link-active:hover {
  color: #fff;
  text-decoration: none;
}
</style>