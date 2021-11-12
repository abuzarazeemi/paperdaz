<template>
  <div class="">
    <hero-page />
    <landing-page-info />
    <landing-page-upload />
    <landing-page-key-features
      class="bg-gradient-to-t from-transparent to-[rgba(119,195,96,0.1)]"
    />
    <landing-join-section />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import HeroPage from '~/components/landing/widgets/HeroPage.vue'
import LandingJoinSection from '~/components/landing/widgets/LandingJoinSection.vue'
import LandingPageInfo from '~/components/landing/widgets/LandingPageInfo.vue'
import LandingPageKeyFeatures from '~/components/landing/widgets/LandingPageKeyFeatures.vue'
import LandingPageUpload from '~/components/landing/widgets/LandingPageUpload.vue'

@Component({
  layout: 'landing',
  components: {
    HeroPage,
    LandingPageInfo,
    LandingPageUpload,
    LandingPageKeyFeatures,
    LandingJoinSection,
  },
})
export default class LandingPage extends Vue {
  gsapLoaded: boolean = false
  motionPluginLoaded: boolean = false

  get gsapReadyToSetup(): boolean {
    return this.gsapLoaded && this.motionPluginLoaded
  }

  head() {
    return {
      title: 'Paperdaz',
      script: [
        {
          hid: 'gsap',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js',
          defer: true,
          // Changed after script load
          callback: () => {
            this.gsapLoaded = true
          },
        },
        {
          hid: 'gsap-motion-plugin',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/MotionPathPlugin.min.js',
          defer: true,
          // Changed after script load
          callback: () => {
            this.motionPluginLoaded = true
          },
        },
      ],
    }
  } // end head method

  @Watch('gsapReadyToSetup')
  watchGsap(val: boolean) {
    if (val) {
      // @ts-ignore
      gsap.registerPlugin(MotionPathPlugin)
      // Check LandingJoinSection for elements
      // @ts-ignore
      gsap.to('#email', {
        duration: 5,
        repeat: 12,
        repeatDelay: 2,
        ease: 'power1.inOut',
        motionPath: {
          path: '#path',
          align: '#path',
          autoRotate: 30,
          alignOrigin: [0.5, 0.5],
          offsetY: -3,
        },
      })
    }
  } // end watcher method watchGsap
} // end class LandingPage
</script>
