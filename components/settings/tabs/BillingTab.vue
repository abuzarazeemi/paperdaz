<template>
  <!-- <section class="flex-1 rounded-3xl bg-white py-6 px-8">
    <h3 class="text-[#524D5B] font-medium text-2xl mb-10">Billing</h3>
    <table id="billing-table" class="w-full table-auto text-[#909090] text-sm">
      <tbody>
        <tr>
          <td>Plan</td>
          <td>Free plan</td>
          <td>
            <button class="billing-action-button">Change Plan</button>
          </td>
        </tr>
        <tr>
          <td>REFERAL CODE</td>
          <td>KI45898a3</td>
          <td>
            <button class="billing-action-button">View</button>
          </td>
        </tr>
        <tr>
          <td>REFERRAL CREDIT</td>
          <td>$59.00</td>
          <td></td>
        </tr>
        <tr>
          <td>BILLING CYCLE</td>
          <td>$0 USD / Month</td>
          <td>
            <button class="billing-action-button">Change Plan</button>
          </td>
        </tr>
        <tr>
          <td>BILLING INFORMATION</td>
          <td>
            <p class="">
              Credit card number
              <span class="text-paperdazgreen-300">**** **** **** 1221</span>
              <br />Expiration date:
              <span class="text-paperdazgreen-300">12/21</span>
            </p>
          </td>
          <td>
            <div class="flex items-center">
              <button class="billing-action-button mr-2">Update</button>
              <span class="text-red-600 cursor-pointer"
                ><trash-can-icon
              /></span>
            </div>
          </td>
        </tr>
        <tr>
          <td>RECEIPTS &amp; INVOICES</td>
          <td></td>
          <td>
            <button class="billing-action-button">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section> -->

  <section class="flex gap-4">
    <div class="flex-1 max-w-[300px] rounded-3xl bg-white py-6 px-8">
      <package-card :stagingPackage="stagingPackage" />
    </div>
    <div class="flex-1 rounded-3xl bg-white py-6 px-8"></div>
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
      @apply uppercase text-paperdazgreen-300 font-medium;
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
}
</style>
