<template>
  <div class="">
    <hero-page />
    <landing-page-info />
    <landing-page-upload />
    <landing-page-key-features
      class="bg-gradient-to-t from-transparent to-[rgba(119,195,96,0.1)]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroPage from '~/components/landing/widgets/HeroPage.vue'
import LandingPageInfo from '~/components/landing/widgets/LandingPageInfo.vue'
import LandingPageKeyFeatures from '~/components/landing/widgets/LandingPageKeyFeatures.vue'
import LandingPageUpload from '~/components/landing/widgets/LandingPageUpload.vue'

export default Vue.extend({
  components: {
    HeroPage,
    LandingPageInfo,
    LandingPageUpload,
    LandingPageKeyFeatures,
  },
  layout: 'landing',
})
</script>
