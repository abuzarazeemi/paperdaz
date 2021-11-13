<template>
  <div
    class="sticky z-10 h-14 py-2 transition ease-in-out"
    :class="{
      'shadow-md': scrolled,
      'bg-white': scrolled,
      'bg-transparent': !scrolled,
    }"
    style="top: -0.1px"
  >
    <nav class="container h-full flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="lg:hidden cursor-pointer" @click="collapsed = true">
          <hamburger-icon />
        </span>
        <nuxt-link to="/">
          <logo-with-text class="mr-2 h-6 xs:h-7 sm:h-8" />
        </nuxt-link>
      </div>
      <div
        class="
          transition
          left-0
          transform
          text-sm
          font-medium
          gap-4
          fixed
          top-0
          bottom-0
          w-56
          bg-white
          flex flex-col
          p-6
          shadow-lg
          lg:shadow-none
          lg:items-center
          lg:gap-9
          lg:p-0
          lg:relative
          lg:bg-transparent
          lg:w-auto
          lg:flex-row
          lg:translate-x-0
        "
        :class="[collapsed ? 'translate-x-0' : '-translate-x-56']"
      >
        <div class="flex justify-end lg:hidden">
          <span
            class="circle circle-15 bg-paperdazgray-100 cursor-pointer"
            @click="collapsed = false"
            >&times;</span
          >
        </div>
        <div class="w-full flex justify-center lg:hidden">
          <nuxt-link to="/">
            <logo-with-text class="mb-4 h-7" />
          </nuxt-link>
        </div>
        <nuxt-link to="#" class="">Why Paperdaz? </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="#" class="">Features </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="#" class="">Upload File </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <nuxt-link to="#" class="">Packages </nuxt-link>
        <div class="h-px bg-paperdazgray-300 w-full lg:hidden"></div>
        <div class="flex flex-col items-center gap-4 lg:hidden">
          <nuxt-link to="/login" class="text-paperdazgreen-300 mt-5"
            >Signin</nuxt-link
          >
          <nuxt-link
            to="/register"
            class="
              bg-paperdazgreen-300
              text-white
              h-8
              rounded
              shadow
              px-3
              flex
              items-center
              justify-center
              whitespace-nowrap
            "
            >Getting Started</nuxt-link
          >
        </div>
      </div>
      <div class="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
        <span>
          <search-icon width="15" />
        </span>
        <nuxt-link to="/login" class="text-paperdazgreen-300">Signin</nuxt-link>
        <nuxt-link
          to="/register"
          class="
            bg-paperdazgreen-300
            text-white
            h-8
            rounded
            shadow
            px-3
            flex
            items-center
            justify-center
            whitespace-nowrap
          "
          >Getting Started</nuxt-link
        >
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
import HamburgerIcon from '../svg-icons/HamburgerIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
export default Vue.extend({
  name: 'AppBar',
  components: { LogoWithText, SearchIcon, HamburgerIcon },
  data() {
    return {
      scrolled: false,
      collapsed: false,
    }
  },
  watch: {
    $route(formerVal, currentVal) {
      if (formerVal.fullPath !== currentVal.fullPath) {
        this.collapsed = false
      }
    },
  },
  mounted() {
    const self = this
    this.scrollObserver()
    document.addEventListener('scroll', () => {
      if (self.collapsed) self.collapsed = false
    })
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
        })
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$el)
    },
  },
})
</script>
