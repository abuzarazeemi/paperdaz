<template>
  <div class="">
    <hero-page />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroPage from '~/components/landing/widgets/HeroPage.vue'

export default Vue.extend({
  components: { HeroPage },
  layout: 'landing',
})
</script>
