<template>
  <div class="">
    <hero-page />
    <landing-page-info />
    <landing-page-upload />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroPage from '~/components/landing/widgets/HeroPage.vue'
import LandingPageInfo from '~/components/landing/widgets/LandingPageInfo.vue'
import LandingPageUpload from '~/components/landing/widgets/LandingPageUpload.vue'

export default Vue.extend({
  components: { HeroPage, LandingPageInfo, LandingPageUpload },
  layout: 'landing',
})
</script>
