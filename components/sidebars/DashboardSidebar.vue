<template>
  <nav class="bg-white h-full w-full rounded-2xl p-8">
    <div class="flex items-center justify-center mb-14">
      <logo-with-text class="h-8 w-auto" />
    </div>
    <ul>
      <li>
        <nuxt-link
          v-for="(link, i) in links"
          :key="i"
          :to="link.link"
          class="nav-item"
        >
          <svg-icon class="w-5 h-5" :value="link.icon" />
          <span>{{ link.label }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoWithText from '../LogoWithText.vue'
import SvgIcon from '../svg-icons/SvgIcon.vue'
export default Vue.extend({
  name: 'DashboardSidebar',
  components: { LogoWithText, SvgIcon },
  data() {
    return {
      links: [
        { label: 'Dashboard', icon: 'DashboardIcon', link: '/dashboard' },
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
  @apply flex items-center whitespace-nowrap gap-4 text-paperdazgray-300 text-sm py-4;
}
</style>
