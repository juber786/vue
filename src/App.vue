<template>
   <TvShowHeader />
   
   <router-view></router-view>
</template>

<script>

require('@/assets/style.css')
import TvShowHeader from './components/TvShowHeader.vue'

export default {
  name: 'App',
  components: {
     TvShowHeader
  }
}
</script>

<style>

</style>
