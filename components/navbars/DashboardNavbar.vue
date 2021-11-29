<template>
  <nav
    class="
      px-5
      py-4
      bg-white
      lg:rounded-lg
      w-full
      flex
      items-center
      justify-between
      h-16
      min-h-[60px]
      sm:min-h-[70px]
      shadow
    "
  >
    <p class="text-base sm:text-xl capitalize inline-flex items-center">
      <span
        class="inline-block lg:hidden mr-3 sm:mr-4 cursor-pointer"
        @click="$emit('open-sidebar')"
        ><hamburger-icon /></span
      >{{ routeName }}
    </p>
    <div class="h-full self-stretch flex items-center">
      <span class="hidden lg:inline-block text-[#BBBBBB]"
        ><search-icon width="18" height="18"
      /></span>
      <div
        class="
          hidden
          lg:inline-block
          self-stretch
          h-full
          w-px
          mx-6
          bg-[#E1E1E1]
        "
      ></div>
      <div class="hidden lg:inline-block text-[#909090] mr-4">
        <bell-icon />
      </div>
      <div class="hidden lg:inline-block text-[#909090] mr-4">
        <gear-icon />
      </div>
      <div class="hidden lg:flex flex-col mr-3 text-sm">
        <span class="text-black">{{ user.username }}</span>
        <span class="text-[#524D5B]">{{ user.fullName }}</span>
      </div>
      <div
        class="circle profile-circle border border-paperdazgreen-300 mr-2 p-0.5"
      >
        <img
          src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
          class="circle"
          alt=""
        />
      </div>
      <span class="text-black"
        ><arrow-down-icon class="h-2 w-3 sm:h-2.5 sm:w-4"
      /></span>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
import BellIcon from '../svg-icons/BellIcon.vue'
import GearIcon from '../svg-icons/GearIcon.vue'
import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
export default Vue.extend({
  name: 'DashboardNavbar',
  components: { SearchIcon, BellIcon, GearIcon, ArrowDownIcon, HamburgerIcon },
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

<style scoped lang="scss">
.profile-circle {
  --circle-size: 20;
  height: calc(2px * var(--circle-size));
  width: calc(2px * var(--circle-size));
  min-height: calc(2px * var(--circle-size));
  min-width: calc(2px * var(--circle-size));
  @media screen and (min-width: 640px) {
    --circle-size: 26;
  }
}
</style>
