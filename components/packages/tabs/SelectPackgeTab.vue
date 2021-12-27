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

    <div class="flex gap-12 sm:gap-8 md:gap-12 flex-col sm:flex-row mb-24">
      <package-card
        show-bottom-button
        @bottom-button-clicked="$emit('next-tab')"
      />
      <package-card
        show-bottom-button
        promoted
        class="scale-110 transform"
        @bottom-button-clicked="$emit('next-tab')"
      />
      <package-card
        show-bottom-button
        @bottom-button-clicked="$emit('next-tab')"
      />
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
export default Vue.extend({
  components: { PackageCard },
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

  props: {
    packages: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
