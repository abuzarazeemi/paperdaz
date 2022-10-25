<template>
  <div>
    <div class="flex items-center gap-2 w-full max-w-[500px] mx-auto mb-12">
      <el-input placeholder="Enter promotional codes" v-model="promotionCode" />
      <button
        class="text-sm h-6 sm:h-10 bg-paperdazgreen-400 text-white rounded-lg px-5"
      >
        Update
      </button>
    </div>
    <!-- Start:: already existing package -->

    <transition name="fade" mode="out-in" :duration="200">
      <!-- Start:: already existing package -->
      <div v-if="!creatingCustomPackage" key="selecting">
        <div class="relative">
          <button
            @click="scrollPackages(true)"
            style="box-shadow: -1px -1px 8px #c1c1c1"
            class="hidden sm:circle circle-22 bg-white/30 backdrop-blur-sm shadow rotate-90 absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
          >
            <arrow-down-icon />
          </button>
          <button
            @click="scrollPackages(false)"
            style="box-shadow: -1px -1px 8px #c1c1c1"
            class="hidden sm:circle circle-22 bg-white/30 backdrop-blur-sm shadow -rotate-90 absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 right-0"
          >
            <arrow-down-icon />
          </button>

          <div
            class="packages-container custom-scrollbar"
            ref="packagesContainer"
          >
            <package-card
              v-for="(p, i) in orderedPackages"
              :key="p.id"
              :promoted="i == 1"
              show-bottom-button
              class="package-card-check-width"
              :style="{ '--count': orderedPackages.length }"
              :class="[i == 1 ? 'scale-110 transform' : '']"
              @bottom-button-clicked="$emit('next-tab', $event)"
              :stagingPackage="p"
            />
          </div>
        </div>

        <p class="font-medium text-lg text-center">
          Need a custom packge for your business?
          <button
            class="text-paperdazgreen-400 cursor-pointer"
            @click="creatingCustomPackage = true"
          >
            Create one
          </button>
        </p>
      </div>
      <!-- End:: already existing package -->
      <!-- Start:: Create custom package -->
      <div v-else key="creating">
        <select-custom-package @next-tab="$emit('next-tab', $event)" />
        <p class="font-medium text-lg text-center">
          Want to select pre-created packaged?
          <button
            class="text-paperdazgreen-400 cursor-pointer"
            @click="creatingCustomPackage = false"
          >
            Select Package
          </button>
        </p>
      </div>
      <!-- End:: Create custom package -->
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PackageCard from '~/components/settings/PackageCard.vue'
import _ from 'lodash'
import ArrowDownIcon from '~/components/svg-icons/ArrowDownIcon.vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'
import SelectCustomPackage from '../SelectCustomPackage.vue'

export default Vue.extend({
  components: { PackageCard, ArrowDownIcon, CheckIcon, SelectCustomPackage },
  name: 'SelectPackageTab',
  data() {
    return {
      creatingCustomPackage: true,
      promotionCode: undefined,
    }
  },

  computed: {
    orderedPackages(): Array<any> {
      // let temp = _.cloneDeep(this.packages)
      let temp = (this.packages || []).filter((el: any) => el.visibility)

      return temp.sort((a: any, b: any) => a.monthly_price - b.monthly_price)
    },
  },

  props: {
    packages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    scrollPackages(toLeft: boolean) {
      const packagesContainer = this.$refs.packagesContainer as HTMLDivElement
      if (!packagesContainer) return
      packagesContainer.scrollBy({
        top: 0,
        left: toLeft ? -50 : 50,
        behavior: 'smooth',
      })
    },
  },
  watch: {},
})
</script>

<style lang="scss" scoped>
.packages-container {
  @apply flex
        py-12
        gap-12
        sm:gap-8
        md:gap-12
        flex-col
        sm:flex-row
        mb-12;
  @apply px-3;

//   @media only screen and (min-width: 640px) {
//     @apply overflow-x-auto;
//     scroll-snap-type: x mandatory;
//   }
// }
.package-card-check-width {
  /* min-width: calc(100% / var(--count, 1)); */
  @media only screen and (min-width: 640px) {
    min-width: calc(100% / 2 - 16px);
    scroll-snap-align: start;
  }

  @media only screen and (min-width: 768px) {
    min-width: calc(100% / 2 - 24px);
    scroll-snap-align: start;
  }

  @media only screen and (min-width: 1024px) {
    min-width: calc(100% / 3 - calc(12px * 4) / 1.5);
  }
}
}
</style>
