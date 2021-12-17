<template>
  <form
    action=""
    @submit="onSubmit"
    class="profile-info-form grid grid-cols-1 gap-5"
  >
    <message-alert-widget
      :message="errorMessage"
      v-show="errorMessage"
      type="error"
      class="mb-8"
    />
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">First Name</label>
        <el-input
          placeholder="Enter first name..."
          required
          v-model="formData.first_name"
          :disabled="!editingDetails"
        />
      </div>
      <div>
        <label for="">Last Name</label>
        <el-input
          placeholder="Enter last name..."
          required
          v-model="formData.last_name"
          :disabled="!editingDetails"
        />
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Email</label>
        <el-input
          placeholder="Enter email..."
          v-model="formData.email"
          required
          type="email"
          :disabled="!editingDetails"
        />
      </div>
      <div>
        <label for="">Phone Number</label>
        <el-input
          placeholder="Enter phone number..."
          required
          v-model="formData.phone"
          :disabled="!editingDetails"
        />
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Country</label>
        <el-select
          placeholder="Country"
          class="w-full"
          filterable
          v-model="formData.country"
          required
          :disabled="!editingDetails"
        >
          <el-option
            :value="country.name"
            :label="country.name"
            v-for="country in countries"
            :key="country.id"
          />
        </el-select>
      </div>
      <div>
        <label for="">State</label>

        <el-select
          placeholder="State"
          class="w-full"
          filterable
          v-model="formData.state"
          required
          :disabled="!editingDetails || !formData.country || states.length <= 0"
        >
          <el-option
            :value="state.name"
            :label="state.name"
            v-for="state in states"
            :key="state.id"
          />
        </el-select>
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Timezone</label>
        <el-select
          placeholder="Timezone"
          class="w-full"
          filterable
          v-model="formData.timezone"
          required
          :disabled="!editingDetails"
        >
          <el-option
            :value="timezone"
            :label="timezone"
            v-for="(timezone, i) in timezones"
            :key="i"
          />
        </el-select>
      </div>
      <div></div>
    </div>
    <transition name="fade">
      <div
        class="flex items-center justify-center mt-2"
        v-show="editingDetails"
      >
        <button
          :disabled="!editingDetails || loading"
          class="
            shadow
            h-10
            px-5
            text-white
            rounded-md
            bg-paperdazgreen-300
            disabled:opacity-50
          "
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
    </transition>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '~/components/widgets/InputField.vue'
import AuthUser from '~/models/AuthUser'
import timezones from '~/assets/json/timezones'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
export default Vue.extend({
  name: 'UserForm',
  components: { InputField, MessageAlertWidget, SpinnerDottedIcon },
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        timezone: '',
        country: '',
        state: '',
      } as AuthUser,
      countries: [] as Array<any>,
      states: [] as Array<any>,
      timezones,
      loading: false,
      errorMessage: '',
    }
  },
  props: {
    editingDetails: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    await this.fetchCountries()
    await this.fetchStates()

    this.formData.state = this.$auth.user
      ? (this.$auth.user.state as string)
      : ''
  },
  beforeMount() {
    for (const key of Object.keys(this.formData)) {
      this.formData[key] = this.$auth.user ? this.$auth.user[key] : ''
    }
  },
  methods: {
    fetchCountries() {
      return this.$axios
        .$get('https://api.countrystatecity.in/v1/countries', {
          headers: {
            'X-CSCAPI-KEY': this.$config.countryApiKey,
          },
        })
        .then((response) => {
          this.countries = response
        })
    },
    fetchStates() {
      if (!this.formData.country) {
        this.states = []
        this.formData.state = ''
        return
      }

      const country = this.countries.find(
        (el) => el.name == this.formData.country
      )

      if (!country) {
        this.states = []
        this.formData.state = ''
        return
      }

      return this.$axios
        .$get(
          `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`,
          {
            headers: {
              'X-CSCAPI-KEY': this.$config.countryApiKey,
            },
          }
        )
        .then((response) => {
          const states = response
          states.sort((a: { name: string }, b: { name: string }) =>
            a.name > b.name ? 1 : -1
          )

          this.states = states

          if (this.states.length === 0) this.formData.state = ''
        })
    },
    onSubmit() {
      event?.preventDefault()

      if (this.loading) return

      this.loading = true
      this.errorMessage = ''
      this.$axios
        .$patch('/user/update', this.formData)
        .then(async () => {
          await this.$auth.fetchUser()
          this.$notify.success({
            title: 'Data write',
            message: 'Data updated successfully!',
          })

          this.loading = false
          await this.$nextTick()
          this.$emit('stop-editing')
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
            message =
              error && error.message ? error.message : 'An error occured'
          }
          this.errorMessage = message
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  watch: {
    'formData.country': function () {
      this.formData.state = ''
      this.fetchStates()
    },
  },
})
</script>

<style lang="postcss" scoped>
.profile-info-form label {
  @apply block font-medium mb-0.5;
  color: #282533;
}
</style>
