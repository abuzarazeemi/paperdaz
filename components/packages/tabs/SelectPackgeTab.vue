<template>
  <div>
    <div class="flex items-center gap-2 w-full max-w-[500px] mx-auto mb-12">
      <el-input placeholder="Enter promotional codes" v-model="promotionCode" />
      <button
        class="text-sm h-6 sm:h-10 bg-paperdazgreen-400 text-white rounded-lg px-5"
      >
        Update
      </button>
    </div>
    <!-- Start:: already existing package -->

    <transition name="fade" mode="out-in" :duration="200">
      <!-- Start:: already existing package -->
      <div v-if="!creatingCustomPackage" key="selecting">
        <div class="relative">
          <button
            @click="scrollPackages(true)"
            style="box-shadow: -1px -1px 8px #c1c1c1"
            class="hidden sm:circle circle-22 bg-white/30 backdrop-blur-sm shadow rotate-90 absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
          >
            <arrow-down-icon />
          </button>
          <button
            @click="scrollPackages(false)"
            style="box-shadow: -1px -1px 8px #c1c1c1"
            class="hidden sm:circle circle-22 bg-white/30 backdrop-blur-sm shadow -rotate-90 absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 right-0"
          >
            <arrow-down-icon />
          </button>

          <div class="packages-container" ref="packagesContainer">
            <package-card
              v-for="(p, i) in orderedPackages"
              :key="p.id"
              :promoted="i == 1"
              show-bottom-button
              class="package-card-check-width"
              :style="{ '--count': orderedPackages.length }"
              :class="[i == 1 ? 'scale-110 transform' : '']"
              @bottom-button-clicked="$emit('next-tab', $event)"
              :stagingPackage="p"
            />
          </div>
        </div>

        <p class="font-medium text-lg text-center">
          Need a custom packge for your business?
          <button
            class="text-paperdazgreen-400 cursor-pointer"
            @click="creatingCustomPackage = true"
          >
            Create one
          </button>
        </p>
      </div>
      <!-- End:: already existing package -->
      <!-- Start:: Create custom package -->
      <div v-else key="creating">
        <div class="grid md:grid-cols-[max-content,1fr] mb-12 gap-5">
          <package-card
            class="md:min-w-[300px] lg:min-w-[320px]"
            show-bottom-button
            :staging-package="customPackage"
          />
          <div
            class="border-2 border-paperdazgreen-400 w-full rounded-2xl overflow-hidden relative bg-white text-[#505050]"
          >
            <div class="p-5 overflow-x-auto custom-scrollbar">
              <table class="custom-table">
                <thead>
                  <tr class="text-lg">
                    <th class="text-left">
                      <span
                        class="inline-block border-b-2 border-paperdazgreen-400"
                        >Feature</span
                      >
                    </th>
                    <th>
                      <span
                        class="inline-block border-b-2 border-paperdazgreen-400"
                        >Price
                        <span class="text-xxs font-normal">/unit</span></span
                      >
                    </th>
                    <th>
                      <span
                        class="inline-block border-b-2 border-paperdazgreen-400"
                        >Quantity</span
                      >
                    </th>
                    <th>
                      <span
                        class="inline-block border-b-2 border-paperdazgreen-400"
                        >Amount</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paperlink</td>
                    <td class="text-center">$1.00</td>
                    <td>
                      <div class="grid place-items-center">
                        <!-- <el-input
                          v-model="customPackage.paperlink"
                          style="width: 80px"
                          type="number"
                          min="1"
                        /> -->
                        <el-input-number
                          v-model="customPackage.paperlink"
                          size="small"
                          :min="1"
                        />
                      </div>
                    </td>
                    <td class="text-center">$15.00</td>
                  </tr>
                  <tr>
                    <td>Team Member</td>
                    <td class="text-center">$1.00</td>
                    <td>
                      <div class="grid place-items-center">
                        <!-- <el-input
                          v-model="customPackage.team_members"
                          style="width: 80px"
                          type="number"
                          min="1"
                        /> -->
                        <el-input-number
                          v-model="customPackage.team_members"
                          size="small"
                          :min="1"
                        />
                      </div>
                    </td>
                    <td class="text-center">$20.00</td>
                  </tr>
                  <tr>
                    <td>CC Flow</td>
                    <td class="text-center">$1.00</td>
                    <td>
                      <div class="grid place-items-center">
                        <!-- <el-input
                          v-model="customPackage.carbon"
                          style="width: 80px"
                          type="number"
                          min="1"
                        /> -->
                        <el-input-number
                          v-model="customPackage.carbon"
                          size="small"
                          :min="1"
                        />
                      </div>
                    </td>
                    <td class="text-center">$10.00</td>
                  </tr>
                  <tr>
                    <td>Public Profile</td>
                    <td class="text-center">Included</td>
                    <td>
                      <div class="grid place-items-center">
                        <input
                          type="checkbox"
                          hidden
                          id="public-profile-checkbox"
                          v-model="customPackage.public_profile"
                        />
                        <label
                          for="public-profile-checkbox"
                          class="inline-grid place-items-center h-7 w-7 rounded border border-gray-300 p-1 cursor-pointer"
                        >
                          <transition name="fade" :duration="100">
                            <check-icon
                              height="12"
                              width="16"
                              v-show="customPackage.public_profile"
                            />
                          </transition>
                        </label>
                      </div>
                    </td>
                    <td class="text-center">$10.00</td>
                  </tr>
                  <tr>
                    <td>Company Ledger</td>
                    <td class="text-center">Included</td>
                    <td>
                      <div class="grid place-items-center">
                        <input
                          type="checkbox"
                          hidden
                          id="company-ledger-checkbox"
                          v-model="customPackage.company_ledger"
                        />
                        <label
                          for="company-ledger-checkbox"
                          class="inline-grid place-items-center h-7 w-7 rounded border border-gray-300 p-1 cursor-pointer"
                        >
                          <transition name="fade" :duration="100">
                            <check-icon
                              height="12"
                              width="16"
                              v-show="customPackage.company_ledger"
                            />
                          </transition>
                        </label>
                      </div>
                    </td>
                    <td class="text-center">$10.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="border-t-2 border-paperdazgreen-400 py-4 px-10 text-lg font-bold flex justify-between"
            >
              <span>Total Amount</span>
              <span class="text-[#606060]">$65.00</span>
            </div>
          </div>
        </div>
        <p class="font-medium text-lg text-center">
          Want to select pre-created packaged?
          <button
            class="text-paperdazgreen-400 cursor-pointer"
            @click="creatingCustomPackage = false"
          >
            Select Package
          </button>
        </p>
      </div>
      <!-- End:: Create custom package -->
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PackageCard from '~/components/settings/PackageCard.vue'
import _ from 'lodash'
import ArrowDownIcon from '~/components/svg-icons/ArrowDownIcon.vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'

export default Vue.extend({
  components: { PackageCard, ArrowDownIcon, CheckIcon },
  name: 'SelectPackage',

  data() {
    return {
      customPackage: {
        name: 'Custom',
        description: 'Custom package',
        monthly_price: '20',
        yearly_price: '120',
        paperlink: 1,
        team_members: 1,
        carbon: 1,
        visibility: true,
        public_profile: false,
        company_ledger: false,
      },
      creatingCustomPackage: false,
      promotionCode: undefined,
    }
  },

  computed: {
    orderedPackages(): Array<any> {
      // let temp = _.cloneDeep(this.packages)
      let temp = (this.packages || []).filter((el: any) => el.visibility)

      return temp.sort((a: any, b: any) => a.monthly_price - b.monthly_price)
    },
  },

  props: {
    packages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    scrollPackages(toLeft: boolean) {
      const packagesContainer = this.$refs.packagesContainer as HTMLDivElement
      if (!packagesContainer) return
      packagesContainer.scrollBy({
        top: 0,
        left: toLeft ? -50 : 50,
        behavior: 'smooth',
      })
    },
  },
  watch: {
    creatingCustomPackage(val) {
      if (!val) return

      this.customPackage = {
        name: 'Custom',
        description: 'Custom package',
        monthly_price: '20',
        yearly_price: '120',
        paperlink: 1,
        team_members: 1,
        carbon: 1,
        visibility: true,
        public_profile: false,
        company_ledger: false,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
// .packages-container {
//   @apply flex
        
//         custom-scrollbar
//         py-12
//         gap-12
//         sm:gap-8
//         md:gap-12
//         flex-col
//         sm:flex-row
//         mb-12;
//   @apply px-3;

//   @media only screen and (min-width: 640px) {
//     @apply overflow-x-auto;
//     scroll-snap-type: x mandatory;
//   }
// }
.package-card-check-width {
  /* min-width: calc(100% / var(--count, 1)); */
  @media only screen and (min-width: 640px) {
    min-width: calc(100% / 2 - 16px);
    scroll-snap-align: start;
  }

  @media only screen and (min-width: 768px) {
    min-width: calc(100% / 2 - 24px);
    scroll-snap-align: start;
  }

  @media only screen and (min-width: 1024px) {
    min-width: calc(100% / 3 - calc(12px * 4) / 1.5);
  }
}
</style>
