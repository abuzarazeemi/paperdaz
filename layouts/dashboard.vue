<template>
  <div id="dashboard-layout" class="p-4 bg-[#F6F5FA]">
    <div id="sidebar-container" class="w-60">
      <dashboard-sidebar />
    </div>
    <div
      id="main-container"
      class="h-full overflow-y-auto relative flex flex-col gap-4"
    >
      <dashboard-navbar class="sticky top-0" />
      <Nuxt class="flex-1" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardNavbar from '~/components/navbars/DashboardNavbar.vue'
import DashboardSidebar from '~/components/sidebars/DashboardSidebar.vue'
export default Vue.extend({
  name: 'DashboardLayout',
  components: { DashboardSidebar, DashboardNavbar },
})
</script>

<style lang="scss" scoped>
#dashboard-layout {
  height: var(--viewport-height, 100vh);
  min-height: var(--viewport-height, 100vh);
  max-height: var(--viewport-height, 100vh);
  overflow: hidden;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 16px;
}

#main-container {
  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(183, 239, 148, 0.5);
    border-radius: 2px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(183, 239, 148, 1);
  }
}
</style>
