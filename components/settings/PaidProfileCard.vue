<template>
  <div>
    <div
      class="rounded-2xl bg-white py-6 px-6 flex items-center justify-center"
    >
      <div class="flex flex-col items-center">
        <h3
          class="uppercase text-paperdazgray-500 font-semibold text-center mb-4 text-xl"
        >
          Paid Account
        </h3>
        <div class="h-40 w-40 rounded-2xl border-2 border-[#B7EF94] p-1 mb-3">
          <img :src="profilePhoto" class="rounded-xl w-full h-full" alt="" />
        </div>
        <p class="text-lg font-semibold mb-2 capitalize">
          {{ `${user.first_name} ${user.last_name}` }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 mt-4 text-[#6C6777]">
      <div class="bg-white rounded-lg px-2 py-4">
        <barcode-icon class="w-full h-8 text-paperdazgreen-300 mb-2" />
        <p class="text-center text-[10px] font-medium">Download</p>
      </div>
      <div class="bg-white rounded-lg px-2 py-4">
        <share-icon class="w-full h-8 text-paperdazgreen-300 mb-2" />
        <p class="text-center text-[10px] font-medium">Share</p>
      </div>
      <div class="bg-white rounded-lg px-2 py-4">
        <building-icon class="w-full h-8 text-paperdazgreen-300 mb-2" />
        <p class="text-center text-[10px] font-medium">View Profile</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BarcodeIcon from '../svg-icons/BarcodeIcon.vue'
import BuildingIcon from '../svg-icons/BuildingIcon.vue'
import ShareIcon from '../svg-icons/ShareIcon.vue'
export default Vue.extend({
  name: 'PaidProfileCard',
  components: { BarcodeIcon, ShareIcon, BuildingIcon },
  computed: {
    profilePhoto(): string {
      return this.$store.getters.profilePhoto
    },
    user(): any {
      return this.$auth.user
    },
  },
})
</script>
