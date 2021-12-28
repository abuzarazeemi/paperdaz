<template>
  <section class="flex gap-4 flex-col lg:flex-row">
    <div class="lg:max-w-[300px] rounded-3xl bg-white py-6 px-8">
      <package-card :stagingPackage="stagingPackage" />
    </div>
    <div class="flex-1 rounded-3xl bg-white py-6 px-8 overflow-hidden">
      <h3
        class="
          text-center text-paperdazgreen-300
          border-b-2 border-paperdazgreen-300
          font-semibold
          text-2xl
          gap-2
          pb-1
          relative
          mb-4
        "
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
              <td style="padding-top: 2px; padding-bottom: 2px">Business</td>
              <td rowspan="4">
                <div class="grid place-items-center h-full w-full">
                  <p class="mb-2">
                    <button class="billing-action-button">Change Plan</button>
                  </p>
                  <p>
                    <button class="billing-action-button cancel">Cancel</button>
                  </p>
                </div>
              </td>
            </tr>
            <tr style="border-bottom: none">
              <td class="text-sm" style="padding-top: 2px; padding-bottom: 2px">
                Subscription
              </td>
              <td style="padding-top: 2px; padding-bottom: 2px">
                $35 USD / Month
              </td>
            </tr>
            <tr style="border-bottom: none">
              <td class="text-sm" style="padding-top: 2px; padding-bottom: 2px">
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
            <tr>
              <td class="text-base font-bold">ADDITIONAL FEATURES</td>
              <td></td>
              <td>
                <button class="billing-action-button">Add</button>
              </td>
            </tr>
            <tr>
              <td class="text-base font-bold">PAYMENT METHOD</td>
              <td>
                <p class="">
                  Credit card number
                  <span class="text-paperdazgreen-300"
                    >**** **** **** 1221</span
                  >
                  <br />Expiration date:
                  <span class="text-paperdazgreen-300">12/21</span>
                </p>
              </td>
              <td>
                <div class="grid place-items-center h-full w-full">
                  <p class="mb-2">
                    <button class="billing-action-button">Update</button>
                  </p>
                  <p>
                    <button class="billing-action-button cancel">Delete</button>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import TrashCanIcon from '~/components/svg-icons/TrashCanIcon.vue'
import PackageCard from '../PackageCard.vue'
export default Vue.extend({
  name: 'BillingTab',
  components: { TrashCanIcon, PackageCard },
  data() {
    return {
      stagingPackage: {
        id: 265,
        name: 'Standard Package',
        description: 'this a test package',
        monthly_price: '20',
        yearly_price: '120',
        stripe_monthly_product_id: 'prod_KqnN6De8yp6oBL',
        stripe_yearly_product_id: 'prod_KqnN6De8yp6oBL',
        stripe_monthly_price_id: 'price_1KB5n8C8d1ohbkjU44iE3qxw',
        stripe_yearly_price_id: 'price_1KB5n9C8d1ohbkjUghPgovcY',
        paperlink: 30,
        team_members: 5,
        carbon: 5,
        visibility: true,
      },
    }
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
      @apply text-paperdazgreen-300 font-medium;
    }
    &:last-child {
      width: 1%;
      white-space: nowrap;
    }
  }
}

.billing-action-button {
  @apply rounded-full
                h-7
                text-white
                bg-paperdazgreen-300
                font-medium
                px-6
                text-xs w-28 whitespace-nowrap;

  &.cancel {
    @apply bg-transparent border border-red-600 text-red-600;
  }
}
</style>
