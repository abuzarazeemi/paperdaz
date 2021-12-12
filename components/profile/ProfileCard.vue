<template>
  <div>
    <component :is="profileCardComponent" class="h-full" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import FreeProfileCard from '~/components/profile/FreeProfileCard.vue'
import PaidProfileCard from '~/components/profile/PaidProfileCard.vue'

import UserTypeEnum from '~/models/UserTypeEnum'

export default Vue.extend({
  name: 'ProfileCard',
  components: { FreeProfileCard },
  data() {
    return {}
  },
  computed: {
    userType(): UserTypeEnum {
      return this.$store.getters.userType
    },
    profileCardComponent(): any {
      switch (this.userType) {
        case UserTypeEnum.FREE:
          return FreeProfileCard
        case UserTypeEnum.PAID:
          return PaidProfileCard
        default:
          return {
            render(createElement: any) {
              return createElement('h1', 'Not implemented yet')
            },
          }
      }
    },
  },
})
</script>
