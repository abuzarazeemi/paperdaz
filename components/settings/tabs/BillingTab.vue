<template>
  <section>
    <transition name="fade" mode="out-in">
      <div
        v-if="$fetchState.pending"
        class="w-full min-h-[600px] bg-white rounded-lg grid place-items-center"
      >
        <spinner-dotted-icon class="text-paperdazgreen-400/30 animate-spin" />
      </div>
      <div class="flex gap-4 flex-col lg:flex-row" v-else>
        <div
          class="lg:max-w-[300px] rounded-3xl bg-white py-6 px-8 lg:self-start grid place-items-center"
        >
          <package-card
            v-if="stagingPackage && Object.keys(stagingPackage).length > 0"
            :lockPrice="$auth.user.package_type"
            :stagingPackage="stagingPackage"
          />
        </div>
        <div class="flex-1 rounded-3xl bg-white py-6 px-8 overflow-hidden">
          <h3
            class="text-center text-paperdazgreen-300 border-b-2 border-paperdazgreen-300 font-semibold text-2xl gap-2 pb-1 relative mb-4"
          >
            Billing
          </h3>

          <div class="w-full overflow-x-auto custom-scrollbar">
            <table
              id="billing-table"
              class="w-full table-auto text-[#909090] text-sm"
            >
              <tbody>
                <tr style="border-bottom: none">
                  <td
                    class="text-base font-bold"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    PLAN
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    {{ stagingPackage.name }}
                  </td>
                  <td rowspan="4">
                    <div class="grid place-items-center h-full w-full">
                      <p class="mb-2">
                        <button class="billing-action-button">Upgrade</button>
                      </p>
                      <p>
                        <button
                          class="billing-action-button cancel"
                          @click="showCancelSubscriptionModal = true"
                        >
                          Cancel
                        </button>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr style="border-bottom: none">
                  <td
                    class="text-sm"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    Subscription
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    ${{
                      $auth.user.package_type == 'yearly'
                        ? stagingPackage.yearly_price
                        : stagingPackage.monthly_price
                    }}
                    USD /
                    <span>{{
                      $auth.user.package_type == 'yearly' ? 'Year' : 'Month'
                    }}</span>
                  </td>
                </tr>
                <tr style="border-bottom: none">
                  <td
                    class="text-sm"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    Billing cycle
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    12.01.2021 To 12.02.2021
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap text-sm" style="padding-top: 0">
                    Next payment
                  </td>
                  <td style="padding-top: 0">13.02.2021</td>
                </tr>
                <tr
                  :style="[
                    hasAdditionalFeatures ? { borderBottom: 'none' } : {},
                  ]"
                >
                  <td class="text-base font-bold">ADDITIONAL FEATURES</td>
                  <td></td>
                  <td :rowspan="hasAdditionalFeatures ? 5 : 1">
                    <div class="grid place-items-center h-full w-full">
                      <p :class="[hasAdditionalFeatures ? 'mb-2' : '']">
                        <button
                          class="billing-action-button"
                          @click="showAdditionalFeatureModal = true"
                        >
                          {{
                            additionalFeature &&
                            Object.keys(additionalFeature).length > 0
                              ? 'Update'
                              : 'Save'
                          }}
                        </button>
                      </p>
                      <p v-if="hasAdditionalFeatures">
                        <button
                          class="billing-action-button cancel"
                          @click="showDeleteFeatureModal = true"
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr style="border-bottom: none" v-if="hasAdditionalFeatures">
                  <td
                    class="text-sm"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    Paperlinks
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    <div class="grid grid-cols-[min-content,1fr] gap-1">
                      <span class="inline-block w-[4ch]">x2</span>
                      <span>$2 USD</span>
                    </div>
                  </td>
                </tr>
                <tr style="border-bottom: none" v-if="hasAdditionalFeatures">
                  <td
                    class="text-sm"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    Team Members
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    <div class="grid grid-cols-[min-content,1fr] gap-1">
                      <span class="inline-block w-[4ch]">x2</span>
                      <span>$2 USD</span>
                    </div>
                  </td>
                </tr>
                <tr style="border-bottom: none" v-if="hasAdditionalFeatures">
                  <td
                    class="text-sm"
                    style="padding-top: 2px; padding-bottom: 2px"
                  >
                    Carbon Copy (CC) Flow
                  </td>
                  <td style="padding-top: 2px; padding-bottom: 2px">
                    <div class="grid grid-cols-[min-content,1fr] gap-1">
                      <span class="inline-block w-[4ch]">x2</span>
                      <span>$2 USD</span>
                    </div>
                  </td>
                </tr>
                <tr v-if="hasAdditionalFeatures">
                  <td class="whitespace-nowrap text-lg">Total Cost:</td>
                  <td>
                    <div class="grid grid-cols-[min-content,1fr] gap-1">
                      <span class="inline-block w-[4ch]"></span>
                      <span class="text-lg font-medium">$6 USD</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-base font-bold">PAYMENT METHOD</td>
                  <td>
                    <p class="">
                      Credit card number
                      <span class="text-paperdazgreen-300"
                        >**** **** ****
                        {{
                          (card.card_number || '').substring(
                            (card.card_number || '').length - 4
                          )
                        }}</span
                      >
                      <br />Expiration date:
                      <span class="text-paperdazgreen-300"
                        >{{ card.exp_month }}/{{ card.exp_year }}</span
                      >
                    </p>
                  </td>
                  <td>
                    <div class="grid place-items-center h-full w-full">
                      <p class="mb-2">
                        <button
                          class="billing-action-button"
                          @click="showUpdateBillingInfoModal = true"
                        >
                          Update
                        </button>
                      </p>
                      <p>
                        <button
                          class="billing-action-button cancel"
                          @click="showDeleteBillingInfoModal = true"
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>

    <additional-feature-modal v-model="showAdditionalFeatureModal" />
    <delete-additional-features-modal v-model="showDeleteFeatureModal" />
    <cancel-package-subscription-modal v-model="showCancelSubscriptionModal" />
    <delete-billing-information-modal v-model="showDeleteBillingInfoModal" />
    <update-billing-information-modal
      @success="$fetch"
      v-model="showUpdateBillingInfoModal"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import AdditionalFeatureModal from '~/components/packages/modals/AdditionalFeatureModal.vue'
import CancelPackageSubscriptionModal from '~/components/packages/modals/CancelPackageSubscriptionModal.vue'
import DeleteAdditionalFeaturesModal from '~/components/packages/modals/DeleteAdditionalFeaturesModal.vue'
import DeleteBillingInformationModal from '~/components/packages/modals/DeleteBillingInformationModal.vue'
import UpdateBillingInformationModal from '~/components/packages/modals/UpdateBillingInformationModal.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import TrashCanIcon from '~/components/svg-icons/TrashCanIcon.vue'
import PackageCard from '../PackageCard.vue'
export default Vue.extend({
  name: 'BillingTab',
  components: {
    TrashCanIcon,
    PackageCard,
    AdditionalFeatureModal,
    DeleteAdditionalFeaturesModal,
    CancelPackageSubscriptionModal,
    DeleteBillingInformationModal,
    UpdateBillingInformationModal,
    SpinnerDottedIcon,
  },
  async fetch() {
    const fetchCard = () =>
      this.$axios
        .$get('/card')
        .then((response) => {
          this.card = response.card
        })
        .catch(() => {
          this.$notify.error({
            title: 'Card',
            message: 'Unable to fetch Card Information',
          })
        })

    const fetchPackage = () =>
      this.$axios
        .$get(`/package/${(this.$auth.user as any).package_id}`)
        .then((response) => {
          this.stagingPackage = response.data
        })
        .catch(() => {
          this.$notify.error({
            title: 'Packge',
            message: 'Unable to fetch Package Information',
          })
        })

    await Promise.allSettled([fetchCard(), fetchPackage()])
  },
  data() {
    return {
      showAdditionalFeatureModal: false,
      showDeleteFeatureModal: false,
      showCancelSubscriptionModal: false,
      showDeleteBillingInfoModal: false,
      showUpdateBillingInfoModal: false,
      card: {},
      additionalFeature: {
        paperlinks: 0,
        team_members: 0,
        carbon: 0,
      },
      // additionalFeatures: undefined,
      stagingPackage: {},
    }
  },
  computed: {
    hasAdditionalFeatures(): boolean {
      return (
        this.additionalFeature && Object.keys(this.additionalFeature).length > 0
      )
    },
  },
})
</script>

<style lang="scss" scoped>
#billing-table {
  & tr {
    @apply border-b border-paperdazgreen-300;
  }
  & td {
    @apply py-4 px-3;
    width: auto;
    &:first-child {
      @apply text-paperdazgreen-300 font-medium whitespace-nowrap;
      // min-width: ;
    }
    &:last-child {
      width: 1%;
      white-space: nowrap;
    }

    &:nth-child(2) {
      // @apply whitespace-nowrap;
      width: 100%;
    }
  }
}

.billing-action-button {
  @apply rounded-full
                h-8
                text-white
                bg-paperdazgreen-300
                font-medium
                px-1
                text-xs w-28 whitespace-nowrap;

  &.cancel {
    @apply bg-transparent border border-red-600 text-red-600;
  }
}
</style>
