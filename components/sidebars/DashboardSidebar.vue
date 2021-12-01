<template>
  <nav class="flex flex-col bg-white h-full w-full rounded-2xl py-8">
    <div class="flex justify-end px-8">
      <span
        class="py-2 mb-3 cursor-pointer inline-block lg:hidden"
        @click="$emit('close')"
      >
        <times-icon width="12" height="12" />
      </span>
    </div>
    <div class="flex items-center justify-center mb-14 px-8">
      <logo-with-text class="h-8 w-auto" />
    </div>
    <ul class="overflow-y-auto overflow-x-hidden flex-1 px-4 custom-scrollbar">
      <li>
        <nuxt-link
          v-for="(link, i) in links"
          :key="i"
          :to="link.link"
          class="nav-item"
          :class="{
            active:
              $nuxt.$route.fullPath == '/'
                ? $nuxt.$route.path == '/'
                : $nuxt.$route.fullPath.startsWith(link.link),
          }"
        >
          <div class="w-5 h-5">
            <svg-icon
              class="h-full w-full"
              height="100%"
              width="100%"
              :value="link.icon"
            />
          </div>
          <span>{{ link.label }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div class="px-8">
      <p class="text-center text-[#909090] mb-6 font-medium">Share</p>
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="
            circle circle-10
            cursor-pointer
            bg-paperdazgreen-300
            text-white
          "
        >
          <facebook-icon height="9" />
        </span>
        <span
          class="
            circle circle-10
            cursor-pointer
            bg-paperdazgreen-300
            text-white
          "
        >
          <linked-in-icon height="9" />
        </span>
        <span class="circle circle-12 cursor-pointer text-white">
          <redit-icon :background="'#77C360'" height="50" width="50" />
        </span>
        <span
          class="
            circle circle-10
            cursor-pointer
            bg-paperdazgreen-300
            text-white
          "
        >
          <envelope-icon height="9" />
        </span>
        <span
          class="
            circle circle-10
            cursor-pointer
            bg-paperdazgreen-300
            text-white
          "
        >
          <twitter-icon height="9" />
        </span>
        <span
          class="
            circle circle-10
            cursor-pointer
            bg-paperdazgreen-300
            text-white
          "
        >
          <whatsapp-icon height="9" />
        </span>
      </div>
      <p class="text-paperdazgreen-300 text-[11px] mt-3 text-center">
        powered by
        <span class="font-semibold uppercase text-[15px]">Paperdaz</span>
      </p>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
import EnvelopeIcon from '../svg-icons/EnvelopeIcon.vue'
import FacebookIcon from '../svg-icons/FacebookIcon.vue'
import LinkedInIcon from '../svg-icons/LinkedInIcon.vue'
import ReditIcon from '../svg-icons/ReditIcon.vue'
import SvgIcon from '../svg-icons/SvgIcon.vue'
import TimesIcon from '../svg-icons/TimesIcon.vue'
import TwitterIcon from '../svg-icons/TwitterIcon.vue'
import WhatsappIcon from '../svg-icons/WhatsappIcon.vue'
export default Vue.extend({
  name: 'DashboardSidebar',
  components: {
    LogoWithText,
    SvgIcon,
    FacebookIcon,
    LinkedInIcon,
    EnvelopeIcon,
    TwitterIcon,
    WhatsappIcon,
    ReditIcon,
    TimesIcon,
  },
  data() {
    return {
      links: [
        { label: 'Dashboard', icon: 'DashboardIcon', link: '/dashboard' },
        { label: 'Profile', icon: 'UserProfileIcon', link: '/profile' },
        { label: 'My Files', icon: 'FileIcon', link: '/my-files' },
        { label: 'Home', icon: 'HomeIcon', link: '/home' },
        { label: 'Packages', icon: 'NewsPaperIcon', link: '/packages' },
        { label: 'FAQ', icon: 'ConversationIcon', link: '/faq' },
        { label: 'Contact us', icon: 'CustomerCareIcon', link: '/faq' },
      ],
    }
  },
})
</script>

<style lang="postcss" scoped>
.nav-item {
  @apply flex items-center whitespace-nowrap gap-4 text-paperdazgray-300 text-sm py-4 px-4 rounded-xl transition ease-in-out overflow-hidden;
  background: transparent;
  &.active {
    @apply text-white bg-paperdazgreen-300;
    box-shadow: 0px 5px 7px 2px rgba(95, 201, 63, 0.25);
    position: relative;
    & > * {
      position: relative;
      z-index: 1;
    }
    &::before {
      content: '';
      position: absolute;
      height: 13px;
      width: 13px;
      border-radius: 50%;
      top: 8px;
      right: 15%;
      background: rgba(255, 255, 255, 0.2);
    }
    &::after {
      content: '';
      position: absolute;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.2);
      transform: translate(10%, 20%);
    }
  }
}
</style>
