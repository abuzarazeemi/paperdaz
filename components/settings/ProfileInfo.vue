<template>
  <div class="bg-white p-6 rounded-2xl">
    <h3
      class="
        flex
        justify-between
        text-paperdazgreen-300
        border-b-2 border-paperdazgreen-300
        uppercase
        font-semibold
        text-xl
        gap-2
        pb-1
      "
    >
      <span>{{ headerText }}</span>
      <pen-icon />
    </h3>
    <component :is="formComponent" class="mt-4" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PenIcon from '../svg-icons/PenIcon.vue'
import InputField from '../widgets/InputField.vue'
import UserTypeEnum from '~/models/UserTypeEnum'
import UserForm from '~/components/settings/forms/UserForm.vue'
import CompanyForm from '~/components/settings/forms/CompanyForm.vue'

export default Vue.extend({
  name: 'ProfileInfo',
  components: { PenIcon, InputField },
  data() {
    return {}
  },
  computed: {
    userType(): UserTypeEnum {
      return this.$store.getters.userType
    },
    headerText(): string {
      switch (this.userType) {
        case UserTypeEnum.FREE:
          return 'Personal Profile'
        case UserTypeEnum.PAID:
          return 'Company Profile'
        default:
          return ''
      }
    },
    formComponent(): any {
      switch (this.userType) {
        case UserTypeEnum.FREE:
          return UserForm
        case UserTypeEnum.PAID:
          return CompanyForm
        default:
          return {
            render(createElement: any) {
              return createElement(
                'h1',
                'Form not developed for this user type'
              )
            },
          }
      }
    },
  },
})
</script>
