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
          <span class="highlight">3. Payment</span>
          <payment-card-icon height="20" width="20" />
        </div>
      </div>
      <!-- End:: tab indicator -->

      <div>
        <keep-alive>
          <component
            :is="currentTabComponent"
            @next-tab="nextTab($event)"
            :staging-package-info="stagingPackageInfo"
            :packages="packages"
          />
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PackageBasicInfoTabVue from '~/components/packages/tabs/PackageBasicInfoTab.vue'
import PackagePaymentTabVue from '~/components/packages/tabs/PackagePaymentTab.vue'
import SelectPackgeTabVue from '~/components/packages/tabs/SelectPackgeTab.vue'
import MailIcon from '~/components/svg-icons/MailIcon.vue'
import PaymentCardIcon from '~/components/svg-icons/PaymentCardIcon.vue'
import UserProfileSolidIcon from '~/components/svg-icons/UserProfileSolidIcon.vue'
export default Vue.extend({
  components: { UserProfileSolidIcon, MailIcon, PaymentCardIcon },
  name: 'PackagesLandingPage',
  layout: 'landing',
  auth: false,
  data() {
    return {
      tabLevel: 1,
      stagingPackageInfo: undefined,
      packages: [],
    }
  },
  async asyncData({ $axios, error }) {
    const packages = await $axios
      .$get('/package')
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        error({
          statusCode: 404,
          message: err.message || 'Unable to fetch the data',
        })
      })

    return { packages }
  },

  computed: {
    currentTabComponent(): any {
      switch (this.tabLevel) {
        case 1:
          return SelectPackgeTabVue
        case 2:
          return PackageBasicInfoTabVue
        case 3:
          return PackagePaymentTabVue
        default:
          return {
            render(createElement: any) {
              return createElement('h1', 'Unknown tab')
            },
          }
      }
    },
  },
  methods: {
    nextTab(val: any) {
      if (this.tabLevel == 1) {
        this.stagingPackageInfo = val
      }
      this.tabLevel++
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
