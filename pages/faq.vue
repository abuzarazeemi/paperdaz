<template>
  <div class="container">This is the faq page</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FaqPage',
  layout: 'landing',
  auth: false,
  head() {
    return {
      script: [
        // ...
        {
          hid: 'tawk.to',
          src: 'https://embed.tawk.to/61ee08389bd1f31184d8e4d8/1fq4t07bg',
          defer: true,
        },
      ],
    }
  },
  beforeRouteLeave(to, from, next) {
    location.href = to.fullPath
    return
  },
})
</script>
