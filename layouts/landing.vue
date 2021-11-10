<template>
  <div><app-bar /> <Nuxt /></div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppBar from '~/components/widgets/AppBar.vue'
export default Vue.extend({
  components: { AppBar },
})
</script>
