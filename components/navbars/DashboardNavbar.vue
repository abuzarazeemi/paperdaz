<template>
  <nav
    class="
      px-5
      py-4
      bg-white
      rounded-lg
      w-full
      flex
      items-center
      justify-between
      h-16
      min-h-[70px]
      shadow
    "
  >
    <span class="text-black text-xl capitalize">{{ routeName }}</span>
    <div class="h-full self-stretch flex items-center">
      <span class="text-[#BBBBBB]"><search-icon width="18" height="18" /></span>
      <div class="self-stretch h-full w-px mx-6 bg-[#E1E1E1]"></div>
      <div class="text-[#909090] mr-4"><bell-icon /></div>
      <div class="text-[#909090] mr-4"><gear-icon /></div>
      <div class="flex flex-col mr-3 text-sm">
        <span class="text-black">{{ user.username }}</span>
        <span class="text-[#524D5B]">{{ user.fullName }}</span>
      </div>
      <div class="circle circle-26 border border-paperdazgreen-300 mr-2">
        <img
          src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
          class="circle circle-22"
          alt=""
        />
      </div>
      <span class="text-black"><arrow-down-icon width="16" height="10" /></span>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
import BellIcon from '../svg-icons/BellIcon.vue'
import GearIcon from '../svg-icons/GearIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
export default Vue.extend({
  name: 'DashboardNavbar',
  components: { SearchIcon, BellIcon, GearIcon, ArrowDownIcon },
  computed: {
    routeName(): string {
      return (this.$nuxt.$route.name || '').replace(/-/g, ' ')
    },
    user(): any {
      return this.$auth.user
    },
  },
  methods: {},
})
</script>
