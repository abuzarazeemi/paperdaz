<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ $auth, redirect }) {
    await $auth.logout()
    redirect('/login')
  },
  name: 'LogoutPage',
})
</script>
