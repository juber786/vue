<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="menuWrapper">
          <ul class="menu">
            <li>
              <router-link class='linkBtn' to="/"><span> Top 5 </span></router-link>
            </li>
            <li>
              <router-link class='linkBtn' to="/tvShows"><span> All Tv Shows </span></router-link>
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
.router-link-active{color:#fff!important; background-color: #007bff!important}
.linkBtn:link,
.linkBtn:visited {
    text-transform: uppercase;

    text-decoration: none;
    padding: 15px 30px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    /*position: absolute;*/
    display:block;
}

.linkBtn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.linkBtn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.linkBtn {
    background-color: #ddd;
    color: #777;
}

.linkBtn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
}

.linkBtn-white::after {
    background-color: #fff;
}

.linkBtn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

.linkBtn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}

@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

</style>
