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
import NotificationsTab from '~/components/settings/tabs/NotificationsTab.vue'
const BillingTab = () => import('~/components/settings/tabs/BillingTab.vue')
const YourProductsTab = () =>
  import('~/components/settings/tabs/YourProductsTab.vue')

export default Vue.extend({
  name: 'SettingsPage',
  components: { ProfileTab },
  layout: 'dashboard',
  data() {
    return {
      currentTab: 'security',
      tabs: [
        { label: 'Account', value: 'account', component: AccountTab },
        { label: 'Security', value: 'security', component: ChangePasswordTab },
        {
          label: 'Signature/Initials',
          value: 'signature-initials',
          component: SignatureInitialsTab,
        },
        { label: 'Billing', value: 'billing', component: BillingTab },
        {
          label: 'Your Proucts',
          value: 'your-products',
          component: YourProductsTab,
        },
        {
          label: 'Notifications',
          value: 'notifications',
          component: NotificationsTab,
        },
      ],
    }
  },
  computed: {
    currrentTabComponent(): any {
      const tab = this.tabs.find((el) => el.value === this.currentTab)
      if (tab && tab.component) {
        return tab.component
      } else {
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
