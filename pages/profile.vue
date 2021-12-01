<template>
  <div class="max-w-7xl py-4 lg:py-10">
    <profile-tab v-model="currentTab" :tabs="tabs" class="mb-10" />
    <keep-alive>
      <component :is="currrentTabComponent" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileTab from '~/components/profile/ProfileTab.vue'
import AccountTab from '~/components/profile/tabs/AccountTab.vue'
import ChangePasswordTab from '~/components/profile/tabs/ChangePasswordTab.vue'
import SignatureInitialsTab from '~/components/profile/tabs/SignatureInitialsTab.vue'

const BillingTab = () => import('~/components/profile/tabs/BillingTab.vue')
const YourProductsTab = () =>
  import('~/components/profile/tabs/YourProductsTab.vue')

export default Vue.extend({
  name: 'ProfilePage',
  components: { ProfileTab },
  layout: 'dashboard',
  data() {
    return {
      currentTab: 'account',
      tabs: [
        { label: 'Account', value: 'account' },
        { label: 'Change Password', value: 'change-password' },
        { label: 'Signature/Initials', value: 'signature-initials' },
        { label: 'Billing', value: 'billing' },
        { label: 'Your Proucts', value: 'your-products' },
      ],
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
        case 'billing':
          return BillingTab
        case 'your-products':
          return YourProductsTab
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
