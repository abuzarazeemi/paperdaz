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
import BillingTab from '~/components/settings/tabs/BillingTab.vue'
import UserTypeEnum from '~/models/UserTypeEnum'
import ReferralTabVue from '~/components/settings/tabs/ReferralTab.vue'
// const BillingTab = () => import('~/components/settings/tabs/BillingTab.vue')
// const YourProductsTab = () =>
//   import('~/components/settings/tabs/YourProductsTab.vue')

export default Vue.extend({
  name: 'SettingsPage',
  components: { ProfileTab },
  layout: 'dashboard',
  data() {
    return {
      currentTab: 'billing',
      tabs: [
        { label: 'Profile Info', value: 'account', component: AccountTab },
        { label: 'Security', value: 'security', component: ChangePasswordTab },
        {
          label: 'Referral Credit',
          value: 'referral-credit',
          component: ReferralTabVue,
        },
        // {
        //   label: 'Signature/Initials',
        //   value: 'signature-initials',
        //   component: SignatureInitialsTab,
        // },
        // {
        //   label: 'Your Proucts',
        //   value: 'your-products',
        //   component: YourProductsTab,
        // },
        {
          label: 'Notifications',
          value: 'notifications',
          component: NotificationsTab,
        },
      ],
    }
  },
  beforeMount() {
    if (this.$store.getters.userType === UserTypeEnum.PAID) {
      this.tabs.splice(3, 0, {
        label: 'Billing',
        value: 'billing',
        component: BillingTab,
      })
    } else if (this.$store.getters.userType === UserTypeEnum.FREE) {
      this.tabs.splice(3, 0, {
        label: 'Signature/Initials',
        value: 'signature-initials',
        component: SignatureInitialsTab,
      })
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
