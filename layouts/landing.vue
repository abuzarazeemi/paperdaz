<template>
  <div id="landing-layout" class="relative">
    <app-bar class="sticky z-10 top-0" />
    <main><Nuxt /></main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppBar from '~/components/widgets/AppBar.vue'
export default Vue.extend({
  components: { AppBar },
})
</script>
