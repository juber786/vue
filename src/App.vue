<template>
   <headerSection> </headerSection>
   
   <router-view></router-view>
</template>

<script>

require('@/assets/style.css')
import headerSection from './components/header.vue'

export default {
  name: 'App',
  components: {
     headerSection
  }
}
</script>

<style>

</style>
