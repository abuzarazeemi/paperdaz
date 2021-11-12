<template>
  <div id="landing-layout" class="relative">
    <app-bar class="sticky z-10 top-0" />
    <main><Nuxt /></main>
    <app-footer />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppBar from '~/components/widgets/AppBar.vue'
import AppFooter from '~/components/widgets/AppFooter.vue'
export default Vue.extend({
  components: { AppBar, AppFooter },
})
</script>
