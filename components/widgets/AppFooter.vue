<template>
  <footer class="bg-paperdazgreen-50">
    <div
      class="
        flex flex-wrap flex-col
        gap-10
        lg:gap-5 lg:flex-row
        items-center
        container
        py-12
      "
    >
      <div class="flex flex-col gap-2 items-center">
        <logo-with-text class="h-5 xs:h-6 sm:h-7" />
        <span class="text-[#888392]">Contactless Paper</span>
      </div>
      <div
        class="
          flex-1 flex flex-wrap flex-col
          lg:flex-row
          items-center
          gap-3
          sm:gap-10
          text-[#6C6777]
          justify-center
        "
      >
        <nuxt-link to="#">Features</nuxt-link>
        <nuxt-link to="#">Packages</nuxt-link>
        <nuxt-link to="#">Upload File</nuxt-link>
        <nuxt-link to="#">About</nuxt-link>
        <nuxt-link to="#">FAQ </nuxt-link>
        <nuxt-link to="#">Contact</nuxt-link>
      </div>

      <div class="flex flex-col gap-2 items-center">
        <h4 class="font-semibold text-lg">Share Our Mission</h4>
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="
              circle circle-15
              cursor-pointer
              bg-paperdazgreen-300
              text-white
            "
          >
            <facebook-icon height="18" />
          </span>
          <span
            class="
              circle circle-15
              cursor-pointer
              bg-paperdazgreen-300
              text-white
            "
          >
            <linked-in-icon height="17" />
          </span>
          <span class="circle circle-15 cursor-pointer text-white">
            <redit-icon :background="'#77C360'" height="50" width="50" />
          </span>
          <span
            class="
              circle circle-15
              cursor-pointer
              bg-paperdazgreen-300
              text-white
            "
          >
            <envelope-icon height="16" />
          </span>
          <span
            class="
              circle circle-15
              cursor-pointer
              bg-paperdazgreen-300
              text-white
            "
          >
            <twitter-icon height="16" />
          </span>
          <span
            class="
              circle circle-15
              cursor-pointer
              bg-paperdazgreen-300
              text-white
            "
          >
            <whatsapp-icon height="18" />
          </span>
        </div>
      </div>
    </div>
    <div class="bg-paperdazgreen-400 py-3">
      <div class="container flex items-center justify-center text-white">
        <small> Paperdaz &copy; Copyright 2020, All Rights Reserved </small>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
import EnvelopeIcon from '../svg-icons/EnvelopeIcon.vue'
import FacebookIcon from '../svg-icons/FacebookIcon.vue'
import LinkedInIcon from '../svg-icons/LinkedInIcon.vue'
import ReditIcon from '../svg-icons/ReditIcon.vue'
import TwitterIcon from '../svg-icons/TwitterIcon.vue'
import WhatsappIcon from '../svg-icons/WhatsappIcon.vue'
export default Vue.extend({
  name: 'AppFooter',
  components: {
    LogoWithText,
    FacebookIcon,
    LinkedInIcon,
    EnvelopeIcon,
    TwitterIcon,
    WhatsappIcon,
    ReditIcon,
  },
})
</script>
