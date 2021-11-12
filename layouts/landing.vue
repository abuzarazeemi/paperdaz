<template>
  <div id="landing-layout" class="relative bg-[rgba(119,195,96,0.1)]">
    <app-bar />
    <main class="bg-white"><Nuxt /></main>
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
