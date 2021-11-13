<template>
  <div>
    <button
      class="bg-paperdazgreen-300 h-10 text-white rounded shadow-2xl px-4"
      @click="$auth.logout()"
    >
      Logout
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DashboardPage',
})
</script>
