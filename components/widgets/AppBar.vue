<template>
  <div
    class="sticky z-10 bg-white h-14"
    :class="{ 'shadow-md': scrolled }"
    style="top: -0.1px"
  >
    <nav class="container h-full flex items-center justify-between">
      <logo-with-text class="mr-2" />
      <div class="text-sm font-medium items-center gap-9 hidden sm:flex">
        <nuxt-link to="#">Why Paperdaz? </nuxt-link>
        <nuxt-link to="#">Features </nuxt-link>
        <nuxt-link to="#">Upload File </nuxt-link>
        <nuxt-link to="#">Packages </nuxt-link>
      </div>
      <div>Last part</div>
    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
export default Vue.extend({
  name: 'AppBar',
  components: { LogoWithText },
  data() {
    return {
      scrolled: false,
    }
  },
  mounted() {
    this.scrollObserver()
  },
  methods: {
    scrollObserver() {
      const options = {
        rootMargin: '0px',
        threshold: 1.0,
      }

      const self = this
      const callback: IntersectionObserverCallback = (
        entries: IntersectionObserverEntry[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        observer: IntersectionObserver
      ): void => {
        entries.forEach((entry) => {
          self.scrolled = !entry.isIntersecting
          console.log(entry)
        })
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$el)
    },
  },
})
</script>
