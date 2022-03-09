<template>
  <div>This is the company files section</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CompanyFilesPage',
  middleware: ['paid-user'],
  layout: 'dashboard',
  asyncData({ store }) {
    store.commit('SET_PAGE_NAME', { name: 'Company Files' })
  },
})
</script>
