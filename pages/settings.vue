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
import ProfileTab from '~/components/settings/ProfileTab.vue'
import AccountTab from '~/components/settings/tabs/AccountTab.vue'
import ChangePasswordTab from '~/components/settings/tabs/ChangePasswordTab.vue'
import SignatureInitialsTab from '~/components/settings/tabs/SignatureInitialsTab.vue'

const BillingTab = () => import('~/components/settings/tabs/BillingTab.vue')
const YourProductsTab = () =>
  import('~/components/settings/tabs/YourProductsTab.vue')

export default Vue.extend({
  name: 'SettingsPage',
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
