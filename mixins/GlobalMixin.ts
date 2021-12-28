import Vue from 'vue'

export default Vue.extend({
  methods: {
    async logout(shouldRedirect: boolean = true) {
      // @ts-ignore
      await this.$auth.logout()
      this.$notify({
        title: 'Authentication',
        message: 'Sucessfully logged out',
        type: 'success',
      })
      if (shouldRedirect) this.$nuxt.$router.push('/login')
    },
  },
})
