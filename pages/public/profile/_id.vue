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

    <div class="mt-4 bg-white rounded-xl" v-else>
      <!-- Start:: Folders -->
      <div class="">
        <header
          class="p-4 border-b border-[#DCDCDC] text-paperdazgreen-400 flex items-center gap-2 justify-between"
        >
          <h4 class="text-xl font-medium">Folders</h4>
          <div>
            <button
              type="button"
              class="circle circle-15 bg-paperdazgreen-400 text-white"
            >
              <search-icon width="14" height="14" />
            </button>
          </div>
        </header>
        <div>
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
      <div>
        <header
          class="p-4 border-b border-[#DCDCDC] text-paperdazgreen-400 flex items-center gap-2 justify-between"
        >
          <h4 class="text-xl font-medium">Files</h4>
          <div>
            <button
              type="button"
              class="circle circle-15 bg-paperdazgreen-400 text-white"
            >
              <search-icon width="14" height="14" />
            </button>
          </div>
        </header>
        <div>
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
