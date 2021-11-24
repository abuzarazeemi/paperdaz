<template>
  <div id="dashboard-layout" class="p-4 bg-[#F6F5FA]">
    <div
      id="sidebar-container"
      class="h-full overflow-hidden"
      :class="{ active: collapseSidebar }"
    >
      <div class="overlay"></div>
      <dashboard-sidebar />
    </div>
    <div
      id="main-container"
      class="h-full overflow-y-auto overflow-x-hidden relative flex flex-col"
      @click="collapseSidebar = !collapseSidebar"
    >
      <dashboard-navbar class="sticky top-0 mb-4 justify-self-stretch" />
      <Nuxt class="flex-1 flex flex-col" />
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
  data() {
    return {
      collapseSidebar: false,
    }
  },
})
</script>

<style lang="scss" scoped>
#dashboard-layout {
  height: var(--viewport-height, 100vh);
  min-height: var(--viewport-height, 100vh);
  max-height: var(--viewport-height, 100vh);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  // grid-template-rows: 1fr;
  gap: 16px;
  @media only screen and (min-width: 1024px) {
    grid-template-columns: max-content 1fr;
  }
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
    background: rgba(119, 129, 113, 0.2);
    border-radius: 2px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(183, 239, 148, 1);
  }
}

#sidebar-container {
  --sidebar-container-width: 240px;
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: 2px 0px 13px 2px rgb(151 151 151 / 31%);
  & .overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    opacity: 0;
    pointer-events: none;
    transition: all ease-in-out 200ms;
  }

  &.active .overlay {
    opacity: 1;
    pointer-events: all;
  }

  @media only screen and (min-width: 1024px) {
    --sidebar-container-width: 260px;
    position: unset;
    z-index: 10;
    width: var(--sidebar-container-width);
    box-shadow: none;
    & .overlay {
      display: none;
    }
  }
}
</style>
