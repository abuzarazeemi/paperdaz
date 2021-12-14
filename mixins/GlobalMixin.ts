import Vue from 'vue'

export default Vue.extend({
  methods: {
    async logout() {
      // @ts-ignore
      await this.$auth.logout()
      this.$notify({
        title: 'Authentication',
        message: 'Sucessfully logged out',
        type: 'success',
      })
      this.$nuxt.$router.push('/login')
    },
  },
})
