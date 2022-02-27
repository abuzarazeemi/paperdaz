<template>
  <div class="max-w-7xl">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[max-content,1fr,max-content] gap-5 grid-flow-row-dense"
    >
      <div class="order-2 p-4 bg-white rounded-lg grid place-items-center">
        <div class="p-4 rounded-xl border-paperdazgreen-400 border">
          <img
            :src="$store.getters.profilePhoto"
            alt=""
            class="w-36 h-36 object-contain rounded-lg"
          />
        </div>
      </div>

      <article
        class="order-3 sm:order-2 sm:col-span-2 md:col-span-1 bg-white rounded-lg pb-4"
      >
        <header class="p-4 border-b border-[#DCDCDC]">
          <h4 class="text-[#414142] text-xl">Apple Dental</h4>
        </header>
        <div
          class="p-4 border-b border-[#DCDCDC] gap-2 grid grid-cols-[1fr,min-content]"
        >
          <p class="flex-1">1234 Pebble Lane , Pearland TX 13584</p>
          <button class="text-paperdazgreen-400">
            <pen-icon width="16" height="16" />
          </button>
        </div>
        <div
          class="p-4 border-b border-[#DCDCDC] gap-2 grid grid-cols-[1fr,min-content]"
        >
          <p class="flex-1">123-879-8888</p>
          <button class="text-paperdazgreen-400">
            <pen-icon width="16" height="16" />
          </button>
        </div>
      </article>

      <div class="order-2 p-4 bg-white rounded-lg grid place-items-center">
        <div>
          <p class="text-center text-[#2C2929] text-xs font-medium mb-1">
            Scan to show all files
          </p>
          <canvas
            ref="qrcancas"
            class="w-[148px] h-[148px] object-contain"
          ></canvas>
        </div>
      </div>
    </div>

    <div class="mt-4 bg-white rounded-xl" v-if="false">
      <header
        class="text-paperdazgreen-400 font-semibold p-4 border-b border-[#DCDCDC]"
      >
        <h4>Folders \ Files</h4>
      </header>
      <div class="min-h-[50vh] grid place-items-center p-4">
        <div>
          <p class="text-center text-[#434242] text-sm font-medium">
            Your Public Profile is empty!
          </p>
          <div class="grid place-items-center">
            <button
              class="text-sm font-medium text-white h-10 rounded-xl bg-paperdazgreen-400 shadow mt-2 px-5"
            >
              Turn files into Paperlink
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4" v-else>
      <!-- Start:: Folders -->
      <div class="bg-white rounded-xl mb-4">
        <header
          class="p-4 border-b border-[#DCDCDC] text-paperdazgreen-400 flex flex-wrap items-center gap-2 justify-between"
        >
          <h4 class="text-xl font-medium">Folders</h4>

          <form
            @submit.prevent
            class="flex flex-1 justify-end items-center gap-2 text-xs text-gray-800 relative"
          >
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <input
                  type="text"
                  placeholder="Search any folder..."
                  class="rounded-lg border border-paperdazgreen-400 px-2 h-8 placeholder:italic"
                  :value="searchFolderParam"
                  @input="searchFolderParam = $event.target.value"
                />
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- Start:: dropdown -->
                <div
                  class="bg-white rounded-lg whitespace-nowrap w-[600px] max-w-[80vw]"
                >
                  <div
                    class="max-h-[40vh] custom-scrollbar overflow-y-auto p-4"
                  >
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
                        <p class="text-[11px] mt-0.5 truncate">
                          patient intake
                        </p>
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
            <button
              type="button"
              class="circle circle-15 bg-paperdazgreen-400 text-white"
            >
              <search-icon width="14" height="14" />
            </button>
          </form>
        </header>
        <div class="max-h-36 overflow-y-auto custom-scrollbar">
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <folder-solid-icon />
            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Hippa Forms
              </p>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <folder-solid-icon />
            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Patient Forms
              </p>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            v-for="i in 5"
            :key="i"
            class="grid grid-cols-[max-content,1fr] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <folder-solid-icon />
            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Release of information
              </p>
            </div>
          </div>
          <!-- End:: Single row -->
        </div>
      </div>
      <!-- Start:: Folders -->

      <!-- Start:: Files -->
      <div class="bg-white rounded-xl">
        <header
          class="p-4 border-b border-[#DCDCDC] text-paperdazgreen-400 flex flex-wrap items-center gap-2 justify-between"
        >
          <h4 class="text-xl font-medium">Files</h4>
          <form
            @submit.prevent
            class="flex flex-1 justify-end items-center gap-2 text-xs text-gray-800 relative"
          >
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <input
                  type="text"
                  placeholder="Search any file..."
                  class="rounded-lg border border-paperdazgreen-400 px-2 h-8 placeholder:italic"
                  :value="searchFileParam"
                  @input="searchFileParam = $event.target.value"
                />
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- Start:: dropdown -->
                <div
                  class="bg-white rounded-lg whitespace-nowrap w-[600px] max-w-[80vw]"
                >
                  <div
                    class="max-h-[40vh] custom-scrollbar overflow-y-auto p-4"
                  >
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
                        <p class="text-[11px] mt-0.5 truncate">
                          patient intake
                        </p>
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
            <button
              type="button"
              class="circle circle-15 bg-paperdazgreen-400 text-white"
            >
              <search-icon width="14" height="14" />
            </button>
          </form>
        </header>
        <div class="max-h-72 overflow-y-auto custom-scrollbar">
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr,max-content] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <img src="/icon.png" width="25" height="25" />

            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Patient Registration &amp; Disclosure ...
              </p>
            </div>
            <div class="text-[#9D9D9D] flex items-center gap-2">
              <button>
                <forward-outline-icon width="16" height="16" />
              </button>
              <button>
                <heart-outline-icon width="16" height="16" />
              </button>
              <button>
                <share-outline-icon width="16" height="16" />
              </button>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr,max-content] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <img src="/icon.png" width="25" height="25" />

            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Financial Policy
              </p>
            </div>
            <div class="text-[#9D9D9D] flex items-center gap-2">
              <button>
                <forward-outline-icon width="16" height="16" />
              </button>
              <button>
                <heart-outline-icon width="16" height="16" />
              </button>
              <button>
                <share-outline-icon width="16" height="16" />
              </button>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr,max-content] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <img src="/icon.png" width="25" height="25" />

            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Notice of Privacy Policy
              </p>
            </div>
            <div class="text-[#9D9D9D] flex items-center gap-2">
              <button>
                <forward-outline-icon width="16" height="16" />
              </button>
              <button>
                <heart-outline-icon width="16" height="16" />
              </button>
              <button>
                <share-outline-icon width="16" height="16" />
              </button>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            class="grid grid-cols-[max-content,1fr,max-content] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <img src="/icon.png" width="25" height="25" />

            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Support Physical From...
              </p>
            </div>
            <div class="text-[#9D9D9D] flex items-center gap-2">
              <button>
                <forward-outline-icon width="16" height="16" />
              </button>
              <button>
                <heart-outline-icon width="16" height="16" />
              </button>
              <button>
                <share-outline-icon width="16" height="16" />
              </button>
            </div>
          </div>
          <!-- End:: Single row -->
          <!-- Start:: Single row -->
          <div
            v-for="i in 10"
            :key="i"
            class="grid grid-cols-[max-content,1fr,max-content] gap-2 items-center px-4 border-b border-[#DCDCDC] py-2"
          >
            <img src="/icon.png" width="25" height="25" />

            <div class="overflow-hidden">
              <p class="text-[#414142] whitespace-nowrap truncate text-sm">
                Patient Registration &amp; Disclosure ...
              </p>
            </div>
            <div class="text-[#9D9D9D] flex items-center gap-2">
              <button>
                <forward-outline-icon width="16" height="16" />
              </button>
              <button>
                <heart-outline-icon width="16" height="16" />
              </button>
              <button>
                <share-outline-icon width="16" height="16" />
              </button>
            </div>
          </div>
          <!-- End:: Single row -->
        </div>
      </div>
      <!-- Start:: Files -->

      <!-- Start:: Pagination -->
      <div class="grid place-items-center py-5">
        <div>
          <button class="pagination-button active">1</button>
          <button class="pagination-button">2</button>
          <button class="pagination-button">></button>
        </div>
      </div>
      <!-- End:: Pagination -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PenIcon from '~/components/svg-icons/PenIcon.vue'
import QRCode from 'qrcode'
import SearchIcon from '~/components/svg-icons/SearchIcon.vue'
import FolderIcon from '~/components/svg-icons/FolderIcon.vue'
import FolderSolidIcon from '~/components/svg-icons/FolderSolidIcon.vue'
import ShareIcon from '~/components/svg-icons/ShareIcon.vue'
import ShareOutlineIcon from '~/components/svg-icons/ShareOutlineIcon.vue'
import HeartOutlineIcon from '~/components/svg-icons/HeartOutlineIcon.vue'
import ForwardOutlineIcon from '~/components/svg-icons/ForwardOutlineIcon.vue'
export default Vue.extend({
  components: {
    PenIcon,
    SearchIcon,
    FolderIcon,
    FolderSolidIcon,
    ShareIcon,
    ShareOutlineIcon,
    HeartOutlineIcon,
    ForwardOutlineIcon,
  },
  name: 'PublicProfilePage',
  layout: 'dashboard',
  asyncData({ store }) {
    store.commit('SET_PAGE_NAME', { name: 'Profile' })
  },
  mounted() {
    this.generateQR()
  },
  data() {
    return {
      searchFolderParam: '',
      searchFileParam: '',
    }
  },
  methods: {
    async generateQR() {
      QRCode.toCanvas(this.$refs.qrcancas, location.href, function () {})
      await this.$nextTick()
      // ;(this.$refs.qrcancas as HTMLElement).removeAttribute('style')
      // ;(this.$refs.qrcancas as HTMLElement).removeAttribute('height')
      // ;(this.$refs.qrcancas as HTMLElement).removeAttribute('width')
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination-button {
  @apply text-xs h-9 min-w-[36px] rounded px-3 border border-[#DEDEDE] text-[#DEDEDE] font-medium;

  &.active {
    @apply border-paperdazgreen-400 text-white bg-paperdazgreen-400;
  }
}
</style>
