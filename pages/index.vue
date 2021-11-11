<template>
  <div class="">
    <hero-page />
    <landing-page-info />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroPage from '~/components/landing/widgets/HeroPage.vue'
import LandingPageInfo from '~/components/landing/widgets/LandingPageInfo.vue'

export default Vue.extend({
  components: { HeroPage, LandingPageInfo },
  layout: 'landing',
})
</script>
