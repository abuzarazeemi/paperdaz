<template>
  <div class="max-w-7xl">
    <profile-tab v-model="currentTab" class="mt-10 ml-10 mb-10" />
    <keep-alive>
      <component :is="currrentTabComponent" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileTab from '~/components/profile/ProfileTab.vue'

const AccountTab = () => import('~/components/profile/tabs/AccountTab.vue')
const ChangePasswordTab = () =>
  import('~/components/profile/tabs/ChangePasswordTab.vue')
const SignatureInitialsTab = () =>
  import('~/components/profile/tabs/SignatureInitialsTab.vue')

export default Vue.extend({
  name: 'ProfilePage',
  components: { ProfileTab },
  layout: 'dashboard',
  data() {
    return {
      currentTab: 'account',
    }
  },
  computed: {
    currrentTabComponent(): any {
      switch (this.currentTab) {
        case 'account':
          return AccountTab
        case 'change-password':
          return ChangePasswordTab
        case 'signature-initials':
          return SignatureInitialsTab
        default:
          return {
            render(h: any) {
              return h('h1', 'Tab not available')
            },
          }
      }
    },
  },
})
</script>
