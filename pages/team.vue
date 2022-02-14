<template>
  <div class="max-w-7xl">
    <top-details-card-container class="mb-5" :tabs="tabs" />
    <leaves-details-container class="mb-9" />

    <div class="rounded-2xl bg-white overflow-x-auto custom-scrollbar">
      <table class="custom-table">
        <thead class="text-[#414142]">
          <tr>
            <th class="w-12 text-center fixed-col left">No</th>
            <th class="text-left">Member</th>
            <th class="text-left">Access</th>
            <th class="text-left">Date &amp; Time</th>
            <th class="w-28 text-center">
              <p class="w-24">Status</p>
            </th>
            <th class="text-center fixed-col right"></th>
          </tr>
        </thead>
        <tbody class="text-[#505050]">
          <tr v-for="(member, i) in teamMembers" :key="i">
            <td class="w-12 text-center fixed-col left">{{ i + 1 }}</td>
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
                <span class="text-sm">{{ member.name }}</span>
              </div>
            </td>
            <td>
              {{ member.access }}
            </td>
            <td class="text-sm">
              {{ `${member.date}  ${member.time}` }}
            </td>
            <td class="w-28 text-center">
              <div
                class="w-24 text-sm font-medium flex items-center justify-center rounded-full h-8 capitalize px-1 whitespace-nowrap"
                :class="[getStatusClass(member.status || '')]"
              >
                {{ member.status }}
              </div>
            </td>
            <td class="fixed-col right w-[50px]">
              <div class="w-full h-full grid place-items-center">
                <ellipsis-icon-vertical-icon />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LeavesDetailsContainer from '~/components/dashboard/LeavesDetailsContainer.vue'
import TopDetailsCardContainer from '~/components/dashboard/TopDetailsCardContainer.vue'
import DisketIconVue from '~/components/svg-icons/DisketIcon.vue'
import EllipsisIconVerticalIcon from '~/components/svg-icons/EllipsisIconVerticalIcon.vue'
import NoteAndPenIconVue from '~/components/svg-icons/NoteAndPenIcon.vue'
import PageIconVue from '~/components/svg-icons/PageIcon.vue'
import ShareIconVue from '~/components/svg-icons/ShareIcon.vue'
import TickCircleIconVue from '~/components/svg-icons/TickCircleIcon.vue'
export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    EllipsisIconVerticalIcon,
  },
  name: 'TeamsPage',
  layout: 'dashboard',
  data() {
    return {
      teamMembers: [
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          access: 'Own files',
          time: '05:35',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Company files',
          status: 'Disabled',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Company files',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Company files',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'Pending',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'Pending',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'active',
        },
        {
          name: 'Juno Okyo',
          email: 'junokyo2@gmail.com',
          date: '04/04/20',
          time: '05:35',
          access: 'Own files',
          status: 'active',
        },
      ],
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
    store.commit('SET_PAGE_NAME', { name: 'Team' })
  },
  methods: {
    getStatusClass(val: string): string {
      switch (val.toLowerCase()) {
        case 'active':
          return 'text-white bg-paperdazgreen-400'
        case 'pending':
          return 'text-white bg-[#5078B5]'
        case 'disabled':
          return 'text-white bg-[#909090]'
        default:
          return 'text-white bg-[#909090]'
      }
    },
  },
})
</script>
