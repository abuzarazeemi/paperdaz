<template>
  <div
    id="landing-layout"
    class="relative bg-[#E2FFD0] flex flex-col min-h-screen"
  >
    <app-bar />
    <main class="flex-1 flex flex-col"><Nuxt class="flex-1" /></main>
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
