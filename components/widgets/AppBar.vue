<template>
  <div class="bg-white h-14 shadow">
    <nav class="container h-full flex items-center justify-between">
      <logo-with-text class="mr-2" />
      <div class="text-sm font-medium items-center gap-9 hidden sm:flex">
        <nuxt-link to="#">Why Paperdaz? </nuxt-link>
        <nuxt-link to="#">Features </nuxt-link>
        <nuxt-link to="#">Upload File </nuxt-link>
        <nuxt-link to="#">Packages </nuxt-link>
      </div>
      <div>Last part</div>
    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
export default Vue.extend({
  name: 'AppBar',
  components: { LogoWithText },
})
</script>
