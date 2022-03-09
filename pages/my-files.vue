<template>
  <div class="max-w-7xl">
    <top-details-card-container class="mb-5" :tabs="tabs" />
    <leaves-details-container class="mb-12" />

    <div class="flex items-center flex-wrap gap-4 justify-between mb-6">
      <h5 class="text-lg font-semibold text-[#272727]">My Files</h5>
      <div class="text-white flex">
        <button class="circle circle-18 bg-paperdazgreen-400 mr-2">
          <search-icon width="16" height="16" />
        </button>
      </div>
    </div>

    <div class="rounded-2xl bg-white overflow-x-auto custom-scrollbar">
      <table class="custom-table">
        <thead class="text-[#414142]">
          <tr>
            <th class="w-12 text-center fixed-col left">No</th>
            <th class="text-left">File Name</th>
            <th class="">Action Request</th>
            <th class="">Date &amp; Time</th>
            <th class="w-28 text-center">Mission Shared</th>
            <th class="text-center fixed-col right">Action</th>
          </tr>
        </thead>
        <tbody class="text-[#505050]">
          <tr v-for="i in 7" :key="i">
            <td class="w-12 text-center fixed-col left">{{ i }}</td>
            <td>
              <div class="flex items-center gap-3">
                <span
                  class="circle circle-17 p-0.5 border border-paperdazgreen-400"
                >
                  <img
                    src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
                    class="circle object-cover"
                    alt=""
                  />
                </span>
                <div>
                  <p class="text-sm font-medium text-[#505050]">
                    Good Manufacturing practice
                  </p>
                  <p class="text-xs font-light text-[#727272]">Akay Dekvar</p>
                </div>
              </div>
            </td>
            <td class="text-center">Complete</td>
            <td class="text-sm text-center">04/04/20 &nbsp; 05:35</td>
            <td class="text-center">
              <div class="grid place-items-center">
                <button
                  class="circle circle-17 bg-paperdazgreen-400 text-white"
                >
                  <facebook-icon width="8" />
                </button>
              </div>
            </td>
            <td class="fixed-col right">
              <div class="w-full h-full grid place-items-center text-red-600">
                <button><trash-can-icon /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <floating-action-button @click.native="showUploadDocumentModal = true" />
    <upload-document-modal v-model="showUploadDocumentModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LeavesDetailsContainer from '~/components/dashboard/LeavesDetailsContainer.vue'
import TopDetailsCardContainer from '~/components/dashboard/TopDetailsCardContainer.vue'
import UploadDocumentModal from '~/components/dashboard/UploadDocumentModal.vue'
import InviteTeamMemberModal from '~/components/pdf/modals/InviteTeamMemberModal.vue'
import DisketIconVue from '~/components/svg-icons/DisketIcon.vue'
import FacebookIcon from '~/components/svg-icons/FacebookIcon.vue'
import NoteAndPenIconVue from '~/components/svg-icons/NoteAndPenIcon.vue'
import PageIconVue from '~/components/svg-icons/PageIcon.vue'
import SearchIcon from '~/components/svg-icons/SearchIcon.vue'
import ShareIconVue from '~/components/svg-icons/ShareIcon.vue'
import TickCircleIconVue from '~/components/svg-icons/TickCircleIcon.vue'
import TrashCanIcon from '~/components/svg-icons/TrashCanIcon.vue'
import FloatingActionButton from '~/components/widgets/FloatingActionButton.vue'

export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    SearchIcon,
    InviteTeamMemberModal,
    FacebookIcon,
    TrashCanIcon,
    FloatingActionButton,
    UploadDocumentModal,
  },
  name: 'MyFilesPage',
  layout: 'dashboard',
  data() {
    return {
      showUploadDocumentModal: false,
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
  asyncData({ store }) {
    store.commit('SET_PAGE_NAME', { name: 'My Files' })
  },
  methods: {},
})
</script>
