<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- Start:: registration form -->
      <form class="" v-if="displayingForm == 'register'">
        <legend class="block text-center font-semibold mb-6">
          Signup to Paperdaz
        </legend>
        <div class="form-group">
          <label class="input-label" for="">First Name</label>
          <el-input placeholder="First Name" required />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Last Name</label>
          <el-input placeholder="Last Name" required />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Email</label>
          <el-input type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Password</label>
          <el-input placeholder="Password" required show-password />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Confirm Password</label>
          <el-input placeholder="Confirm Password" required show-password />
        </div>
        <div class="flex justify-between text-xs mb-10">
          <div
            class="text-paperdazgray-400 font-medium flex items-center gap-2"
          >
            <input id="remember-me-checkbox" type="checkbox" hidden />
            <label
              for="remember-me-checkbox"
              class="cursor-pointer circle circle-8 text-white relative"
            >
              <div class="overlay circle circle-18"></div>
              <check-icon
                class="relative"
                style="z-index: 1"
                height="8"
                width="8"
              />
            </label>
            <label for="remember-me-checkbox" class="cursor-pointer"
              >Accept
              <nuxt-link to="#" class="text-paperdazgreen-300"
                >terms and conditions</nuxt-link
              ></label
            >
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
            "
          >
            Sign up
          </button>
        </div>

        <p class="text-sm mt-5 text-center">
          Already have an account?
          <button
            class="text-paperdazgreen-400"
            @click="currentForm = 'login'"
            type="button"
          >
            Login
          </button>
        </p>
      </form>
      <!-- End:: registration form -->

      <!-- Start:: login form -->
      <form
        class=""
        v-else-if="displayingForm == 'login'"
        @submit.prevent="login"
      >
        <legend class="block text-center font-semibold mb-6">
          Login to Paperdaz
        </legend>

        <message-alert-widget
          class="mb-7"
          :message="errorMessage"
          v-if="errorMessage"
          :type="'error'"
        />
        <div class="form-group">
          <label class="input-label" for="">Email</label>
          <el-input
            v-model="formData.email"
            :disabled="loading"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Password</label>
          <el-input
            v-model="formData.password"
            :disabled="loading"
            placeholder="Password"
            required
            show-password
          />
        </div>
        <div class="flex justify-between text-xs mb-10">
          <div
            class="text-paperdazgray-400 font-medium flex items-center gap-2"
          >
            <input id="remember-me-checkbox" type="checkbox" hidden />
            <label
              for="remember-me-checkbox"
              class="cursor-pointer circle circle-8 text-white relative"
            >
              <div class="overlay circle circle-18"></div>
              <check-icon
                class="relative"
                style="z-index: 1"
                height="8"
                width="8"
              />
            </label>
            <label for="remember-me-checkbox" class="cursor-pointer"
              >Stay signed in</label
            >
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
              <span>Login</span>
              <transition name="fade" :duration="100">
                <span v-show="loading" class="animate-spin">
                  <spinner-dotted-icon height="22" width="22" />
                </span>
              </transition>
            </span>
          </button>
        </div>

        <p class="text-sm mt-5 text-center">
          Don't have an account?
          <button
            class="text-paperdazgreen-400"
            @click="currentForm = 'register'"
            type="button"
          >
            Register
          </button>
        </p>
      </form>
      <!-- End:: login form -->

      <!-- Start:: verify details form -->
      <form
        class=""
        v-else-if="displayingForm == 'confirm'"
        @submit.prevent="updateUserRecords"
      >
        <legend class="block text-center font-semibold mb-6">
          Confirm details on Paperdaz
        </legend>
        <div class="form-group">
          <label class="input-label" for="">First Name</label>
          <el-input
            placeholder="First Name"
            required
            :disabled="!edittingConfirmed"
            v-model="confirmFormData.first_name"
          />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Last Name</label>
          <el-input
            placeholder="Last Name"
            required
            :disabled="!edittingConfirmed"
            v-model="confirmFormData.last_name"
          />
        </div>
        <div class="form-group">
          <label class="input-label" for="">Email</label>
          <el-input
            type="email"
            placeholder="Email"
            required
            :disabled="!edittingConfirmed"
            v-model="confirmFormData.email"
          />
        </div>

        <div class="flex items-center justify-center gap-6 mt-6">
          <button
            class="
              rounded-lg
              bg-gray-400
              text-white
              shadow
              text-sm
              h-10
              px-6
              w-[100px]
            "
            type="button"
            v-if="!edittingConfirmed"
            @click.prevent="edittingConfirmed = true"
          >
            Edit
          </button>

          <button
            v-else
            class="
              rounded-lg
              bg-gray-400
              text-white
              shadow
              text-sm
              h-10
              px-6
              w-[100px]
            "
            :disabled="!edittingConfirmed"
          >
            Save
          </button>

          <button
            class="
              rounded-lg
              bg-paperdazgreen-400
              text-white
              shadow
              text-sm
              h-10
              w-[100px]
              px-6
              disabled:cursor-not-allowed disabled:bg-opacity-50
            "
            :disabled="edittingConfirmed"
          >
            Next
          </button>
        </div>

        <p class="text-sm mt-5 text-center">
          Use another account?
          <button class="text-red-700" type="button" @click="logout">
            Logout
          </button>
        </p>
      </form>
      <!-- End:: verify details form -->
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
export default Vue.extend({
  components: { CheckIcon, SpinnerDottedIcon, MessageAlertWidget },
  name: 'PackageBasicInfoTab',
  data() {
    return {
      // register, login, confirm
      currentForm: 'register',
      loading: false,
      errorMessage: '',
      formData: {
        email: '',
        password: '',
      },
      edittingConfirmed: false,
      confirmFormData: {
        first_name: '',
        last_name: '',
        email: '',
      } as { [key: string]: any },
    }
  },
  beforeMount() {
    this.initializeAuthUserData()
  },
  computed: {
    user(): any {
      return this.$auth.user
    },
    displayingForm(): string {
      return this.$auth.loggedIn ? 'confirm' : this.currentForm
    },
  },
  methods: {
    initializeAuthUserData() {
      if (!this.$auth.loggedIn) return

      for (const key of Object.keys(this.confirmFormData)) {
        this.confirmFormData[key] = (this.$auth.user || {})[key]
      }
    },
    updateUserRecords() {
      event?.preventDefault()
    },
    login() {
      event?.preventDefault()

      if (this.loading) return

      this.loading = true
      this.errorMessage = ''

      this.$auth
        .loginWith('local', {
          data: {
            email: this.formData.email,
            password: this.formData.password,
          },
        })
        .then(() => {
          this.initializeAuthUserData()
          this.$notify({
            title: 'Authentication',
            message: 'Logged in successfully',
          })
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
          this.errorMessage = message
        })
        .finally(() => {
          this.loading = false
        })
    },
    async logout() {
      await this.$auth.logout()
      this.$notify({
        title: 'Authentication',
        message: 'Sucessfully logged out',
        type: 'success',
      })
    },
  },
  watch: {
    displayingForm() {
      this.errorMessage = ''
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
