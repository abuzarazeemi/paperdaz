<template>
  <div class="lg:pt-4 min-h-full flex flex-col max-w-7xl">
    <top-details-card-container class="mb-5" v-model="activeTab" :tabs="tabs" />
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
import CalendarIcon from '~/components/svg-icons/CalendarIcon.vue'
import CheckCircleIcon from '~/components/svg-icons/CheckCircleIcon.vue'
import DisketIconVue from '~/components/svg-icons/DisketIcon.vue'
import MoveIcon from '~/components/svg-icons/MoveIcon.vue'
import NoteAndPenIconVue from '~/components/svg-icons/NoteAndPenIcon.vue'
import PageIconVue from '~/components/svg-icons/PageIcon.vue'
import ShareIconVue from '~/components/svg-icons/ShareIcon.vue'
import TickCircleIconVue from '~/components/svg-icons/TickCircleIcon.vue'
import TrashXIcon from '~/components/svg-icons/TrashXIcon.vue'
import FloatingActionButton from '~/components/widgets/FloatingActionButton.vue'

export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    FileLedger,
    FloatingActionButton,
    MoveIcon,
    TrashXIcon,
    CheckCircleIcon,
    CalendarIcon,
  },
  layout: 'dashboard',
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
    }
  },
  methods: {},
})
</script>
