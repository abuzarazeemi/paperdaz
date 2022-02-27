<template>
  <nav
    class="px-5 bg-white lg:rounded-lg w-full flex items-center justify-between shadow"
    :class="[compact ? 'py-1 h-12' : 'min-h-[60px] sm:min-h-[70px] py-4 h-16']"
  >
    <p
      class="capitalize inline-flex items-center gap-3"
      :class="[compact ? 'text-sm sm:text-base' : 'text-base sm:text-xl']"
    >
      <span
        class="inline-block lg:hidden mr-3 sm:mr-4 cursor-pointer"
        @click="$emit('open-sidebar')"
        ><hamburger-icon /></span
      >{{ title || routeName }}
    </p>
    <div class="h-full self-stretch flex items-center">
      <div class="hidden lg:inline-block text-[#BBBBBB] mr-4">
        <!-- <div class="text-[#BBBBBB] mr-4"> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-input
              placeholder="search anything..."
              v-model="searchString"
              size="small"
            >
              <template #suffix>
                <span class="grid place-items-center h-full w-full"
                  ><search-icon width="14" height="14"
                /></span>
              </template>
            </el-input>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- Start:: dropdown -->
            <div
              class="bg-white rounded-lg whitespace-nowrap w-[600px] max-w-[80vw]"
            >
              <div class="max-h-[60vh] custom-scrollbar overflow-y-auto p-4">
                <article
                  class="py-4 text-[#9F9F9F] grid grid-cols-[max-content,1fr,max-content] gap-4"
                  v-for="i in 20"
                  :key="i"
                >
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
                    alt=""
                    class="h-16 w-16 rounded-lg object-cover"
                  />
                  <div class="overflow-hidden">
                    <p class="text-sm text-black mb-1 truncate">
                      MyStar@gmail.com
                    </p>
                    <p class="text-xs truncate">MyStar</p>
                    <p class="text-[11px] mt-0.5 truncate">patient intake</p>
                  </div>
                  <div class="self-center flex items-center">
                    <button class="mr-1.5 pr-1.5 border-[#EBEBEB] border-r">
                      <heart-outline-icon />
                    </button>
                    <button>
                      <share-outline-icon />
                    </button>
                  </div>
                </article>
              </div>
            </div>
            <!-- End:: dropdown -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="grid place-items-center text-[#909090] mr-4 relative">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <bell-icon />
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="max-w-[433px] text-xs text-[#676464]">
              <div class="flex justify-end mb-2 px-4">
                <button class="text-red-600 underline">Clear all</button>
              </div>
              <div class="max-h-[70vh] custom-scrollbar overflow-y-auto px-4">
                <!-- Start:: Single row -->
                <div
                  class="grid grid-cols-[max-content,1fr] items-center gap-3 min-w-[200px] py-4 border-b border-gray-100"
                >
                  <notification-dropdown-icon />
                  <p>
                    <span class="font-bold">Axay Devikar</span> has sent you an
                    invitation request to sign a file
                  </p>
                </div>
                <!-- End:: single row -->
                <!-- Start:: Single row -->
                <div
                  class="grid grid-cols-[max-content,1fr] items-center gap-3 min-w-[200px] py-4 border-b border-gray-100"
                >
                  <notification-dropdown-icon />
                  <p>
                    <span class="font-bold">Axay Devikar</span> has sent you an
                    invitation request to join team of company
                    <span class="font-bold">"Apple Dental"</span>
                  </p>
                </div>
                <!-- End:: single row -->
                <!-- Start:: Single row -->
                <div
                  v-for="i in 20"
                  :key="i"
                  class="grid grid-cols-[max-content,1fr] items-center gap-3 min-w-[200px] py-4"
                >
                  <notification-dropdown-icon />
                  <p>
                    <span class="font-bold">Axay Devikar</span> has sent you an
                    invitation request to sign a file
                  </p>
                </div>
                <!-- End:: single row -->
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <nuxt-link
        to="/settings"
        class="hidden lg:inline-block text-[#909090] mr-4"
      >
        <gear-icon />
      </nuxt-link>
      <div class="hidden lg:flex flex-col mr-3 text-sm">
        <span class="text-black">{{ user.username }}</span>
        <span class="text-[#524D5B]">{{ user.fullName }}</span>
      </div>

      <el-dropdown trigger="click" @command="handleCommand">
        <span class="flex items-center el-dropdown-link">
          <span
            class="circle border border-paperdazgreen-300 mr-2 p-0.5"
            :class="[compact ? 'circle-15' : 'circle-20']"
          >
            <img :src="profilePhoto" class="circle" alt="" />
          </span>
          <span class="text-black"
            ><arrow-down-icon class="h-2 w-3 sm:h-2.5 sm:w-4"
          /></span>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dashboard">
            <span class="inline-flex gap-2 items-center">
              <!-- <dashboard-icon height="14" width="14" /> -->
              Dashboard</span
            >
          </el-dropdown-item>
          <el-dropdown-item command="profile" divided>
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
import mixins from 'vue-typed-mixins'
import GlobalMixin from '~/mixins/GlobalMixin'
import ArrowDownIcon from '../svg-icons/ArrowDownIcon.vue'
import BellIcon from '../svg-icons/BellIcon.vue'
import GearIcon from '../svg-icons/GearIcon.vue'
import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
import NotificationDropdownIcon from '../svg-icons/NotificationDropdownIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'
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
    NotificationDropdownIcon,
    HeartOutlineIcon,
    ShareOutlineIcon,
  },
  props: {
    compact: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchString: '',
    }
  },
  computed: {
    searchResult() {
      if (!this.searchString) return []

      return [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ]
    },
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
    querySearch(_queryString: string, cb: Function) {
      cb(this.searchResult)
    },
    handleCommand(command: string) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'profile':
          this.$nuxt.$router.push('/profile')
          break
        case 'dashboard':
          this.$nuxt.$router.push('/dashboard')
          break
        case 'settings':
          this.$nuxt.$router.push('/settings')
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
