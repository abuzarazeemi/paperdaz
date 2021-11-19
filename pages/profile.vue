<template>
  <div>
    <profile-tab v-model="currentTab" class="mt-10 ml-10 mb-10" />
    <keep-alive>
      <component :is="currrentTabComponent" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileTab from '~/components/profile/ProfileTab.vue'
export default Vue.extend({
  name: 'ProfilePage',
  components: { ProfileTab },
  auth: false,
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
          return () => import('~/components/profile/tabs/AccountTab.vue')
        case 'change-password':
          return () => import('~/components/profile/tabs/ChangePasswordTab.vue')
        case 'signature-initials':
          return () =>
            import('~/components/profile/tabs/SignatureInitialsTab.vue')
        default:
          return {
            render(createElement: any) {
              return createElement('h1', 'Tab not available')
            },
          }
      }
    },
  },
})
</script>
