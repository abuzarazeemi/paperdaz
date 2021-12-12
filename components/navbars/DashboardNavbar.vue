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

      <el-dropdown trigger="click" @command="handleCommand">
        <span class="flex items-center el-dropdown-link">
          <span
            class="
              circle
              profile-circle
              border border-paperdazgreen-300
              mr-2
              p-0.5
            "
          >
            <img :src="profilePhoto" class="circle" alt="" />
          </span>
          <span class="text-black"
            ><arrow-down-icon class="h-2 w-3 sm:h-2.5 sm:w-4"
          /></span>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">
            <span class="inline-flex gap-2 items-center">
              <user-profile-solid-icon height="14" width="14" />
              Profile</span
            >
          </el-dropdown-item>
          <el-dropdown-item command="settings">
            <span class="inline-flex gap-2 items-center">
              <gear-icon height="14" width="14" />
              Settings</span
            >
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <span class="text-red-600 inline-flex gap-2 items-center">
              <sign-out-icon height="14" width="14" />
              Logout</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import GlobalMixin from '~/mixins/GlobalMixin'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
import BellIcon from '../svg-icons/BellIcon.vue'
import GearIcon from '../svg-icons/GearIcon.vue'
import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import SignOutIcon from '../svg-icons/SignOutIcon.vue'
import UserProfileIcon from '../svg-icons/UserProfileIcon.vue'
import UserProfileSolidIcon from '../svg-icons/UserProfileSolidIcon.vue'

export default mixins(GlobalMixin).extend({
  name: 'DashboardNavbar',
  components: {
    SearchIcon,
    BellIcon,
    GearIcon,
    ArrowDownIcon,
    HamburgerIcon,
    SignOutIcon,
    UserProfileIcon,
    UserProfileSolidIcon,
  },
  computed: {
    routeName(): string {
      return (this.$nuxt.$route.name || '').replace(/-/g, ' ')
    },
    user(): any {
      return this.$auth.user
    },
    profilePhoto() {
      return this.$store.getters.profilePhoto
    },
  },
  methods: {
    handleCommand(command: string) {
      switch (command) {
        case 'logout':
          this.logout()
          break
      }
    },
  },
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
    --circle-size: 22;
  }
}
</style>
