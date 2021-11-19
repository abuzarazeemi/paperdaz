<template>
  <div class="pt-9 min-h-full flex flex-col">
    <top-details-card-container class="mb-5" />
    <leaves-details-container class="mb-9" />
    <file-ledger class="flex-1" />

    <floating-action-button />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import FileLedger from '~/components/dashboard/FileLedger.vue'
import LeavesDetailsContainer from '~/components/dashboard/LeavesDetailsContainer.vue'
import TopDetailsCardContainer from '~/components/dashboard/TopDetailsCardContainer.vue'
import FloatingActionButton from '~/components/widgets/FloatingActionButton.vue'
export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    FileLedger,
    FloatingActionButton,
  },
  layout: 'dashboard',
  auth: false,
})
</script>
