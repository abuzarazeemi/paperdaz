<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import mixins from 'vue-typed-mixins'
import GlobalMixin from '~/mixins/GlobalMixin'

export default mixins(GlobalMixin).extend({
  name: 'LogoutPage',
  async beforeMount() {
    this.logout()
  },
})
</script>
