<template>
  <div>
    <!-- Start:: login form -->
    <form class="" @submit="submit">
      <message-alert-widget
        class="mb-7"
        :message="errorMessage"
        v-if="errorMessage"
        :type="'error'"
      />
      <div class="form-group">
        <label class="input-label" for="">Name of card holder</label>
        <el-input
          :disabled="loading"
          placeholder="Name Surname"
          required
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label class="input-label" for="">Card Number</label>
        <el-input
          :disabled="loading"
          placeholder="0000-0000-0000-0000"
          :value="cardNumberWithDashes"
          @input="inputCardNumber"
          required
        />
      </div>
      <div class="grid gap-5 grid-cols-2">
        <div class="form-group">
          <label class="input-label" for="">Expiration Date</label>
          <el-input
            :disabled="loading"
            placeholder="MM/YY"
            required
            :value="expirationDateWithSlashes"
            @input="inputExpirationDate"
          />
        </div>
        <div class="form-group">
          <label class="input-label" for="">CVV</label>
          <el-input
            :disabled="loading"
            placeholder="000"
            required
            v-model="cvv"
            type="password"
            maxlength="3"
          />
        </div>
      </div>

      <div class="grid place-items-center mt-6">
        <button
          class="
            rounded-lg
            bg-paperdazgreen-400
            text-white
            shadow
            text-sm
            h-10
            px-6
            disabled:bg-opacity-50
          "
          :disabled="loading"
        >
          <span class="inline-flex items-center gap-3">
            <span>Pay via Stripe</span>
            <transition name="fade" :duration="100">
              <span v-show="loading" class="animate-spin">
                <spinner-dotted-icon height="22" width="22" />
              </span>
            </transition>
          </span>
        </button>
      </div>
    </form>
    <!-- End:: login form -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
export default Vue.extend({
  components: { SpinnerDottedIcon, MessageAlertWidget },
  name: 'PackagePaymentTab',
  data() {
    return {
      loading: false,
      errorMessage: '',
      cardNumberWithDashes: '',
      name: '',
      cvv: '',
      expirationDateWithSlashes: '',
    }
  },
  props: {
    stagingPackageInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cardNumber(): string {
      return this.cardNumberWithDashes.replace(/-+/g, '')
    },
    expirationDateString(): string {
      return this.expirationDateWithSlashes.split('/').join('') || ''
    },
    expYear(): string {
      return this.expirationDateString.split('').splice(2, 4).join('')
    },
    expMonth(): string {
      return this.expirationDateString.split('').splice(0, 2).join('')
    },
  },
  methods: {
    inputCardNumber(val: string) {
      let temp = val.replace(/(-+)|([^0-9]+)/g, '')
      this.cardNumberWithDashes = (temp.match(/.{1,4}/g) || []).join('-')
    },
    inputExpirationDate(val: string) {
      let temp = val.replace(/\/+|[^0-9]+/g, '')
      if (temp.length > 4) return

      // Check if the month is greater than 12
      if (temp.length === 2) {
        if (Number(temp) > 12) temp = '0' + temp
        if (Number(temp) == 0) temp = '01'
      }

      if (temp.length == 4 && Number(temp.substring(2, 4)) == 0) {
        temp = temp.substring(0, 2) + '01'
      }

      let finalVal = (temp.match(/.{1,2}/g) || []).join('/')
      this.expirationDateWithSlashes = finalVal
    },
    updateCard(id: string, data: any) {
      return this.$axios.$patch(`/card/${id}`, data).catch((error) => {
        let message = ''
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message
        } else {
          message = 'Server not reachable'
        }
        this.errorMessage = message
        this.loading = false
      })
    },
    async submit() {
      event?.preventDefault()

      if (!this.expYear || !this.expMonth) {
        this.errorMessage = 'Please review the expiration date'
        return
      }

      if (this.loading) return

      const userId = (this.$auth.user || { id: '' }).id

      const data = {
        user_id: userId,
        card_number: this.cardNumber,
        exp_year: this.expYear,
        exp_month: this.expMonth,
        cvc: this.cvv,
      }

      this.loading = true
      this.errorMessage = ''

      let proceedToPayment = false

      await this.$axios
        .$post('/card', data)
        .then(() => {
          proceedToPayment = true
        })
        .catch(async (err) => {
          await this.updateCard(err.response.data.users_card_id, data).then(
            () => {
              proceedToPayment = true
            }
          )
        })

      if (!proceedToPayment) {
        this.loading = false
        return
      }

      this.$axios
        .$post('/package/subscribe', {
          user_id: userId,
          package_id: this.stagingPackageInfo.stagingPackage.id,
          package_payment_type: this.stagingPackageInfo.isMonthly
            ? 'monthly'
            : 'yearly', //yearly
        })
        .then(() => {
          this.$notify.success({
            title: 'Package Subscription',
            message: 'You have successfully subscribed for this package',
          })
          this.$nuxt.$router.push('/dashboard')
        })
        .catch((error) => {
          let message = ''
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            message = error.response.data.message
          } else {
            message = 'Server not reachable'
          }
          this.errorMessage = error.message || message
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
form {
  @apply p-6 rounded-xl border-4 border-paperdazgreen-400 bg-white;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.input-label {
  @apply font-medium text-sm block;

  & + * {
    @apply mt-1;
  }
}

.form-group {
  &:not(:last-child) {
    @apply mb-5;
  }
}
</style>
