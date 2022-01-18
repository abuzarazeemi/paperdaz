<template>
  <el-dialog
    :visible.sync="showModal"
    :append-to-body="true"
    style=""
    :show-close="false"
    center
    class="relative text-[#414042]"
  >
    <!--Start:: Close Button -->
    <div class="absolute -top-3 -right-3" style="padding: inherit">
      <span
        class="circle circle-12 bg-white cursor-pointer text-red-600"
        @click="closeModal()"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.975489L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.975489 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.975489C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.975489 0.167368L4 3.19188Z"
            fill="#414042"
          />
        </svg>
      </span>
    </div>
    <!--End:: Close Button -->
    <template #title>
      <!-- <h4 class="text-center font-semibold text-xl">Are you sure?</h4> -->
    </template>
    <!-- Start:: Body -->
    <div class="pt-4">
      <h3 class="text-black text-3xl font-medium text-center">
        Billing information
      </h3>
      <p class="text-center text-xs text-[#4B4A4A] mb-3">
        All payments are handled by Stripe
      </p>
      <h5 class="text-[#282533] font-medium text-center text-lg mb-2">
        Payment Type
      </h5>
      <div class="grid place-items-center mb-10">
        <img
          src="/img/payment-types.png"
          alt="Payment types"
          width="400"
          class="max-w-full max-h-[50px] object-contain"
        />
      </div>
      <form class="" @submit="submit">
        <message-alert-widget
          class="mb-7"
          :message="errorMessage"
          v-if="errorMessage"
          :type="'error'"
        />

        <message-alert-widget
          class="mb-7"
          message="Fetching card details"
          v-if="$fetchState.pending"
          :type="'info'"
          isLoading
        />

        <div class="form-group">
          <label class="input-label" for="">Name of card holder</label>
          <el-input
            :disabled="loading || $fetchState.pending"
            placeholder="Name Surname"
            required
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Card Number</label>
          <el-input
            :disabled="loading || $fetchState.pending"
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
              :disabled="loading || $fetchState.pending"
              placeholder="MM/YY"
              required
              :value="expirationDateWithSlashes"
              @input="inputExpirationDate"
            />
          </div>
          <div class="form-group">
            <label class="input-label" for="">CVV</label>
            <el-input
              :disabled="loading || $fetchState.pending"
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
            class="rounded-lg bg-paperdazgreen-400 text-white shadow text-sm h-10 px-6 disabled:bg-opacity-50"
            :disabled="loading"
          >
            <span class="inline-flex items-center gap-3">
              <span>Update</span>
              <transition name="fade" :duration="100">
                <span v-show="loading" class="animate-spin">
                  <spinner-dotted-icon height="22" width="22" />
                </span>
              </transition>
            </span>
          </button>
        </div>
      </form>
    </div>
    <!-- end :: body -->
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
export default Vue.extend({
  name: 'UpdateBillingInformationModal',
  components: { SpinnerDottedIcon, MessageAlertWidget },
  model: {
    prop: 'visible',
    event: 'updateVisibility',
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

    await Promise.allSettled([fetchCard()])
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      errorMessage: '',
      loading: false,
      cardNumberWithDashes: '',
      name: '',
      cvv: '',
      expirationDateWithSlashes: '',
      card: {} as { [key: string]: string | number },
    }
  },
  watch: {
    visible(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('updateVisibility', val)

      if (val && (!this.card || Object.keys(this.card).length == 0)) {
        this.$fetch()
      }
    },
    card: {
      immediate: true,
      handler(card: any) {
        if (!card) return

        this.inputCardNumber(card.card_number || '')
        this.name = card.name || ''
        this.inputExpirationDate(`${card.exp_month}/${card.exp_year}`)
        // this.cvv = card.cvc
      },
    },
  },
  mounted() {
    this.showModal = this.visible
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
    closeModal() {
      this.$emit('updateVisibility', false)
    },
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
    submit() {
      event?.preventDefault()

      if (this.loading || !this.card || !this.card.id) return

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

      // setTimeout(() => {
      //   this.loading = false
      //   ;(async () => {
      //     await this.$notify.info({
      //       title: 'Unimplemented',
      //       message: 'This feature has not been implemented',
      //     })
      //   })()
      //   this.closeModal()
      // }, 1000)

      this.$axios
        .$patch(`/card/${this.card.id}`, data)
        .then(() => {
          this.$emit('success')
          ;(async () => {
            await this.$notify.info({
              title: 'Billing Information',
              message: 'Billing information updated',
            })
          })()
          this.closeModal()
        })
        .catch((error) => {
          this.errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Server not reachable'
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>

<style scoped>
* >>> .el-dialog {
  width: 500px !important;
  max-width: 95% !important;
  border-radius: 20px !important;
  border-radius: 8px !important;
  position: relative !important;
  overflow: hidden;
}
* >>> .el-dialog__header {
  padding-bottom: 20px;
}

* >>> .el-dialog__header,
* >>> .el-dialog__footer {
  text-align: left !important;
  height: 0;
  max-height: 0;
  overflow: hidden;
  padding: 0;
}

* >>> .el-dialog__body {
  /* padding-top: 0 !important;
  padding-bottom: 0 !important; */
  background: #fcfcfd;
}

* >>> .el-select .el-input__inner {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>

<style lang="scss" scoped>
form {
  width: 100%;
  margin: 0 auto;
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
