<template>
  <div id="pdf-layout" class="relative bg-[#E0E0E0] min-h-screen">
    <dashboard-navbar
      class="sticky top-0 justify-self-stretch z-50"
      title="Pdf Tool"
      :compact="true"
    />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardNavbar from '~/components/navbars/DashboardNavbar.vue'
export default Vue.extend({
  components: { DashboardNavbar },
  name: 'PdfLayout',
})
</script>

<style scoped lang="scss">
#pdf-layout {
  height: var(--viewport-height, 100vh);
  min-height: var(--viewport-height, 100vh);
  max-height: var(--viewport-height, 100vh);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  // grid-template-rows: 1fr;
  /* // grid-template-rows: 1fr; */
  grid-template-rows: max-content 1fr;
}
</style>
