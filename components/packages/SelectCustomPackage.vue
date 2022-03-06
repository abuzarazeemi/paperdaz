<template>
  <div class="grid md:grid-cols-[max-content,1fr] mb-12 gap-5">
    <package-card
      class="md:min-w-[300px] lg:min-w-[320px]"
      show-bottom-button
      :staging-package="stagingPackage"
    />
    <div
      class="border-2 border-paperdazgreen-400 w-full rounded-2xl overflow-hidden relative bg-white text-[#505050]"
    >
      <div class="p-5 overflow-x-auto custom-scrollbar">
        <table class="custom-table">
          <thead>
            <tr class="text-lg">
              <th class="text-left">
                <span class="inline-block border-b-2 border-paperdazgreen-400"
                  >Feature</span
                >
              </th>
              <th>
                <span class="inline-block border-b-2 border-paperdazgreen-400"
                  >Price <span class="text-xxs font-normal">/unit</span></span
                >
              </th>
              <th>
                <span class="inline-block border-b-2 border-paperdazgreen-400"
                  >Quantity</span
                >
              </th>
              <th>
                <span class="inline-block border-b-2 border-paperdazgreen-400"
                  >Amount</span
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paperlink</td>
              <td class="text-center">
                {{ formatPrice(settings.custom_paperlink_price) }}
              </td>
              <td>
                <div class="grid place-items-center">
                  <!-- <el-input
                          v-model="customPackage.paperlink"
                          style="width: 80px"
                          type="number"
                          min="1"
                        /> -->
                  <el-input-number
                    v-model.number="customPackage.paperlink"
                    size="small"
                    :min="1"
                  />
                </div>
              </td>
              <td class="text-center">
                {{
                  formatPrice(
                    Number(settings.custom_paperlink_price) *
                      Number(customPackage.paperlink)
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Team Member</td>
              <td class="text-center">
                {{ formatPrice(settings.custom_team_members_price) }}
              </td>
              <td>
                <div class="grid place-items-center">
                  <!-- <el-input
                          v-model="customPackage.team_members"
                          style="width: 80px"
                          type="number"
                          min="1"
                        /> -->
                  <el-input-number
                    v-model.number="customPackage.team_members"
                    size="small"
                    :min="1"
                  />
                </div>
              </td>
              <td class="text-center">
                {{
                  formatPrice(
                    Number(settings.custom_team_members_price) *
                      Number(customPackage.team_members)
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>CC Flow</td>
              <td class="text-center">
                {{ formatPrice(settings.custom_cc_price) }}
              </td>
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
              <td class="text-center">
                {{
                  formatPrice(
                    Number(settings.custom_cc_price) *
                      Number(customPackage.carbon)
                  )
                }}
              </td>
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
              <td class="text-center">
                {{
                  formatPrice(
                    !customPackage.public_profile
                      ? 0
                      : Number(settings.custom_public_profile_price)
                  )
                }}
              </td>
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
              <td class="text-center">
                {{
                  formatPrice(
                    !customPackage.company_ledger
                      ? 0
                      : Number(settings.custom_company_ledger_price)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="border-t-2 border-paperdazgreen-400 py-4 px-10 text-lg font-bold flex justify-between"
      >
        <span>Total Amount</span>
        <span class="text-[#606060]">{{ formatPrice(totalCost) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PackageCard from '../settings/PackageCard.vue'
import CheckIcon from '../svg-icons/CheckIcon.vue'
import Vue from 'vue'
import StringUtils from '~/utils/StringUtils'
export default Vue.extend({
  name: 'SelectCustomPackage',
  components: { PackageCard, CheckIcon },
  data() {
    return {
      settings: {
        custom_paperlink_price: 1,
        custom_team_members_price: 1,
        custom_cc_price: 1,
        custom_public_profile_price: 1,
        custom_company_ledger_price: 1,
      },
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
    }
  },
  async fetch() {
    await this.$axios.$get('/package/custom').then((response) => {
      this.settings = response.settings
    })
  },
  computed: {
    totalCost(): number {
      const paperLinkPrice =
        Number(this.settings.custom_paperlink_price) *
        Number(this.customPackage.paperlink)
      const teamMembersPrice =
        Number(this.settings.custom_team_members_price) *
        Number(this.customPackage.team_members)
      const ccFlowPrice =
        Number(this.settings.custom_cc_price) *
        Number(this.customPackage.carbon)
      const publicProfilePrice = !this.customPackage.public_profile
        ? 0
        : Number(this.settings.custom_public_profile_price)
      const companyLedgerPrice = !this.customPackage.company_ledger
        ? 0
        : Number(this.settings.custom_company_ledger_price)

      return (
        paperLinkPrice +
        teamMembersPrice +
        ccFlowPrice +
        publicProfilePrice +
        companyLedgerPrice
      )
    },
    stagingPackage(): Object {
      const stag = { ...this.customPackage }
      Object.assign(stag, {
        monthly_price: this.totalCost,
        yearly_price: this.totalCost * 10,
      })

      return stag
    },
  },
  methods: {
    formatPrice(amount: number): string {
      return StringUtils.formatPrice(Number(amount))
    },
  },
})
</script>
