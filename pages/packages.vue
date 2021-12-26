<template>
  <div class="" style="">
    <section class="container pt-14 pb-24">
      <!-- Start:: tab indicator -->
      <div
        class="tab-indicator-container"
        :class="{ second: tabLevel >= 2, third: tabLevel >= 3 }"
      >
        <div
          class="tab-indicator-circle circle circle-30 font-medium"
          :class="{ active: tabLevel >= 1 }"
        >
          $

          <span class="highlight">1. Select Package</span>
        </div>
        <div
          class="tab-indicator-circle circle circle-30"
          :class="{ active: tabLevel >= 2 }"
        >
          <span class="highlight">2. Basic Info</span>
          <user-profile-solid-icon height="20" width="20" />
        </div>
        <div
          class="tab-indicator-circle circle circle-30"
          :class="{ active: tabLevel >= 3 }"
        >
          <span class="highlight">3. Mail</span>
          <mail-icon height="20" width="20" />
        </div>
      </div>
      <!-- End:: tab indicator -->

      <div>
        <keep-alive>
          <component :is="currentTabComponent" />
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectPackgeTabVue from '~/components/packages/tabs/SelectPackgeTab.vue'
import MailIcon from '~/components/svg-icons/MailIcon.vue'
import UserProfileSolidIcon from '~/components/svg-icons/UserProfileSolidIcon.vue'
export default Vue.extend({
  components: { UserProfileSolidIcon, MailIcon },
  name: 'PackagesLandingPage',
  layout: 'landing',
  auth: false,
  data() {
    return {
      tabLevel: 1,
    }
  },

  computed: {
    currentTabComponent(): any {
      switch (this.tabLevel) {
        case 1:
          return SelectPackgeTabVue
        default:
          return {
            render(createElement: any) {
              return createElement('h1', 'Unknown tab')
            },
          }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.tab-indicator-container {
  @apply mx-auto relative flex items-center justify-between mb-20 w-full max-w-[600px];

  --circle-size: 60px;

  &.second::before {
    background: #77b550;
  }

  &.third::after {
    background: #77b550;
  }

  &::before {
    content: '';
    position: absolute;
    height: 2px;
    left: calc(var(--circle-size) + 3px);
    width: calc(50% - calc(var(--circle-size)) * 1.5 - 3px * 2);
    background: #909090;
  }

  &::after {
    content: '';
    position: absolute;
    height: 2px;
    left: calc(50% + var(--circle-size) / 2 + 3px);
    width: calc(50% - calc(var(--circle-size)) * 1.5 - 3px * 2);
    background: #909090;
  }
}
.tab-indicator-circle {
  @apply border-2 border-[#909090]
            text-[#909090] text-2xl relative;

  &.active {
    @apply border-paperdazgreen-400
            text-paperdazgreen-400;
  }

  & .highlight {
    @apply absolute text-xs whitespace-nowrap;

    top: calc(100% + 8px);
  }
}
</style>
