<template>
  <nav class="bg-white h-full w-full rounded-2xl p-8">
    <div class="flex items-center justify-center">
      <logo-with-text class="h-12 w-auto" />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
export default Vue.extend({
  name: 'DashboardSidebar',
  components: { LogoWithText },
})
</script>
