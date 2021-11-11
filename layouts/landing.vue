<template>
  <div id="landing-layout" class="relative">
    <app-bar class="sticky top-0" />
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

<style scoped>
#landing-layout {
  /* height: var(--viewport-height, 100vh);
  min-height: var(--viewport-height, 100vh);
  max-height: var(--viewport-height, 100vh);
  overflow: hidden;
  overflow-y: auto; */
}
</style>
