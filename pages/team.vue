<template>
  <main class="max-w-7xl">
    <top-details-card-container class="mb-5" :tabs="tabs" />
    <leaves-details-container class="mb-12" />

    <div class="flex items-center flex-wrap gap-4 justify-between mb-6">
      <h5 class="text-lg font-semibold text-[#272727]">Team Members</h5>
      <div class="text-white flex items-center">
        <form
          action=""
          class="w-full xs:max-w-[280px] text-xs font-medium flex items-center relative justify-end mr-2"
          @submit.prevent="$event.preventDefault()"
        >
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <input
                type="text"
                class="search-input h-10 pl-4 mr-2 bg-transparent flex-1 border border-paperdazgreen-300 rounded-tl-lg rounded-bl-lg focus:border-paperdazgreen-700 outline-none"
                placeholder="Search Files"
                :value="searchParam"
                @input="searchParam = $event.target.value"
              />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- Start:: dropdown -->
              <div
                class="bg-white rounded-lg whitespace-nowrap w-[600px] max-w-[80vw]"
              >
                <div class="max-h-[40vh] custom-scrollbar overflow-y-auto p-4">
                  <article
                    class="py-4 text-[#9F9F9F] grid grid-cols-[max-content,1fr,max-content] gap-4"
                    v-for="i in 20"
                    :key="i"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
                      alt=""
                      class="h-16 w-16 rounded-lg object-cover"
                    />
                    <div class="overflow-hidden">
                      <p class="text-sm text-black mb-1 truncate">
                        MyStar@gmail.com
                      </p>
                      <p class="text-xs truncate">MyStar</p>
                      <p class="text-[11px] mt-0.5 truncate">patient intake</p>
                    </div>
                    <div class="self-center flex items-center">
                      <button class="mr-1.5 pr-1.5 border-[#EBEBEB] border-r">
                        <heart-outline-icon />
                      </button>
                      <button>
                        <share-outline-icon />
                      </button>
                    </div>
                  </article>
                </div>
              </div>
              <!-- End:: dropdown -->
            </el-dropdown-menu>
          </el-dropdown>
          <button class="circle circle-18 bg-paperdazgreen-400 text-white">
            <search-icon width="16" height="16" />
          </button>
        </form>
        <button
          class="circle circle-18 bg-paperdazgreen-400"
          @click="showInviteTeamMemberModal = true"
        >
          <user-plus-icon width="16" height="16" />
        </button>
      </div>
    </div>

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

    <invite-team-member-modal v-model="showInviteTeamMemberModal" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import LeavesDetailsContainer from '~/components/dashboard/LeavesDetailsContainer.vue'
import TopDetailsCardContainer from '~/components/dashboard/TopDetailsCardContainer.vue'
import InviteTeamMemberModal from '~/components/pdf/modals/InviteTeamMemberModal.vue'
import DisketIconVue from '~/components/svg-icons/DisketIcon.vue'
import EllipsisIconVerticalIcon from '~/components/svg-icons/EllipsisIconVerticalIcon.vue'
import NoteAndPenIconVue from '~/components/svg-icons/NoteAndPenIcon.vue'
import PageIconVue from '~/components/svg-icons/PageIcon.vue'
import SearchIcon from '~/components/svg-icons/SearchIcon.vue'
import ShareIconVue from '~/components/svg-icons/ShareIcon.vue'
import TickCircleIconVue from '~/components/svg-icons/TickCircleIcon.vue'
import UserPlusIcon from '~/components/svg-icons/UserPlusIcon.vue'
export default Vue.extend({
  components: {
    TopDetailsCardContainer,
    LeavesDetailsContainer,
    EllipsisIconVerticalIcon,
    SearchIcon,
    UserPlusIcon,
    InviteTeamMemberModal,
  },
  name: 'TeamsPage',
  layout: 'dashboard',
  data() {
    return {
      showInviteTeamMemberModal: false,
      searchParam: '',
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
