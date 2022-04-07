<template>
  <main class="max-w-[1440px]">
    <top-details-card-container class="mb-5" v-model="activeTab" :tabs="tabs" />
    <leaves-details-container class="mb-9" />
    <company-file-ledger />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import CompanyFileLedger from '~/components/company-files/CompanyFileLedger.vue'
import LeavesDetailsContainer from '~/components/dashboard/LeavesDetailsContainer.vue'
import TopDetailsCardContainer from '~/components/dashboard/TopDetailsCardContainer.vue'
import DisketIconVue from '~/components/svg-icons/DisketIcon.vue'
import NoteAndPenIconVue from '~/components/svg-icons/NoteAndPenIcon.vue'
import PageIconVue from '~/components/svg-icons/PageIcon.vue'
import ShareIconVue from '~/components/svg-icons/ShareIcon.vue'
import TickCircleIconVue from '~/components/svg-icons/TickCircleIcon.vue'

export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    CompanyFileLedger,
  },
  name: 'CompanyFilesPage',
  middleware: ['paid-user'],
  layout: 'dashboard',
  asyncData({ store }) {
    store.commit('SET_PAGE_NAME', { name: 'Company Files' })
  },
  data() {
    return {
      // ledger, confirmed, signed, saved, shared
      activeTab: 'ledger',
      tabs: [
        {
          label: 'Ledger',
          key: 'ledger',
          count: 896,
          icon: NoteAndPenIconVue,
        },
        {
          label: 'Completed',
          key: 'completed',
          count: 25,
          icon: PageIconVue,
        },
        {
          label: 'Confirmed',
          key: 'confirmed',
          count: 25,
          icon: TickCircleIconVue,
        },
        {
          label: 'Signed',
          key: 'signed',
          count: 25,
          icon: NoteAndPenIconVue,
        },
        {
          label: 'Saved',
          key: 'saved',
          count: 25,
          icon: DisketIconVue,
        },
        {
          label: 'Shared',
          key: 'shared',
          count: 25,
          icon: ShareIconVue,
        },
      ],
      showUploadDocumentModal: false,
    }
  },
})
</script>
