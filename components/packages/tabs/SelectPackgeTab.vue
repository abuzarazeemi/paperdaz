<template>
  <div>
    <div class="flex items-center gap-2 w-full max-w-[500px] mx-auto mb-12">
      <el-input placeholder="Enter promotional codes" v-model="promotionCode" />
      <button
        class="
          text-sm
          h-6
          sm:h-10
          bg-paperdazgreen-400
          text-white
          rounded-lg
          px-5
        "
      >
        Update
      </button>
    </div>

    <div class="h-3 hidden sm:flex justify-between mb-5">
      <button
        @click="scrollPackages(true)"
        style="box-shadow: -1px -1px 8px #c1c1c1"
        class="circle circle-22 bg-white shadow transform rotate-90"
      >
        <arrow-down-icon />
      </button>
      <button
        @click="scrollPackages(false)"
        style="box-shadow: -1px -1px 8px #c1c1c1"
        class="circle circle-22 bg-white shadow transform -rotate-90"
      >
        <arrow-down-icon />
      </button>
    </div>

    <div class="packages-container" ref="packagesContainer">
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
      <!-- <package-card
        show-bottom-button
        promoted
        class="scale-110 transform"
        @bottom-button-clicked="$emit('next-tab')"
      />
      <package-card
        show-bottom-button
        @bottom-button-clicked="$emit('next-tab')"
      /> -->
    </div>
    <p class="font-medium text-lg text-center">
      Need a custom packge for your business?
      <span class="text-paperdazgreen-400 cursor-pointer">Create one</span>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PackageCard from '~/components/settings/PackageCard.vue'
import _ from 'lodash'
import ArrowDownIcon from '~/components/svg-icons/ArrowDownIcon.vue'

export default Vue.extend({
  components: { PackageCard, ArrowDownIcon },
  name: 'SelectPackage',

  data() {
    return {
      // p: {
      //   id: 265,
      //   name: 'Standard Package',
      //   description: 'this a test package',
      //   monthly_price: '20',
      //   yearly_price: '120',
      //   stripe_monthly_product_id: 'prod_KqnN6De8yp6oBL',
      //   stripe_yearly_product_id: 'prod_KqnN6De8yp6oBL',
      //   stripe_monthly_price_id: 'price_1KB5n8C8d1ohbkjU44iE3qxw',
      //   stripe_yearly_price_id: 'price_1KB5n9C8d1ohbkjUghPgovcY',
      //   paperlink: 30,
      //   team_members: 5,
      //   carbon: 5,
      //   visibility: true,
      // },
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
        left: toLeft ? -10 : 10,
        behavior: 'smooth',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.packages-container {
  @apply flex
        
        custom-scrollbar
        py-12
        px-3
        gap-12
        sm:gap-8
        md:gap-12
        flex-col
        sm:flex-row
        mb-24;

  @media only screen and (min-width: 640px) {
    @apply overflow-x-auto;
    scroll-snap-type: x mandatory;
  }
}
.package-card-check-width {
  /* min-width: calc(100% / var(--count, 1)); */
  @media only screen and (min-width: 640px) {
    min-width: calc(100% / 2 - 16px);
    scroll-snap-align: start;
  }

  @media only screen and (min-width: 1024px) {
    min-width: calc(100% / 3 - calc(12px * 4) / 1.5);
  }
}
</style>
