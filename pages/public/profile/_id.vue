<template>
  <div class="max-w-7xl">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[max-content,1fr,max-content] gap-5 grid-flow-row-dense"
    >
      <div class="order-2 p-4 bg-white rounded-lg grid place-items-center">
        <div class="p-4 rounded-xl border-paperdazgreen-400 border">
          <img
            src=" https://source.unsplash.com/200x200"
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
          <p class="flex-1">1234 Pebble Lane , Pearland TX 13584</p>
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

    <div class="mt-4 bg-white rounded-xl">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PenIcon from '~/components/svg-icons/PenIcon.vue'
import QRCode from 'qrcode'
export default Vue.extend({
  components: { PenIcon },
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
