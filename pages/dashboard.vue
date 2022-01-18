<template>
  <div class="lg:pt-4 min-h-full flex flex-col max-w-7xl">
    <top-details-card-container class="mb-5" v-model="activeTab" :tabs="tabs" />
    <leaves-details-container class="mb-9" />
    <file-ledger ref="fileLedger" class="flex-1" />

    <floating-action-button @click.native="$refs.uploadFileInput.click()" />
    <input
      type="file"
      accept="application/pdf,application/vnd.ms-excel"
      ref="uploadFileInput"
      hidden
      @change="uploadDocument"
    />
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
  methods: {
    uploadDocument(event: Event) {
      const inputElement = event.currentTarget as HTMLInputElement
      if (!inputElement) return

      const file = inputElement.files?.length
        ? inputElement.files[0]
        : undefined

      if (!file) return

      const formData = new FormData()
      formData.append('upload', file)

      const loadingNotification = this.$notify.info({
        title: 'File Upload',
        message: 'File uploading ...',
        duration: 1000 * 60,
      })

      this.$axios
        .$post('/file/upload', formData)
        .then(() => {
          this.$notify.success({
            title: 'File Upload',
            message: 'File uploaded successfully',
          })

          // TODO: replace this with the id
          this.$nuxt.$router.push(`/pdf/{id}`)
        })
        .catch((error) => {
          this.$notify.error({
            title: 'File Upload',
            message: error?.response?.data || error.message,
          })
        })
        .finally(() => {
          loadingNotification.close()
        })
    },
  },
})
</script>
