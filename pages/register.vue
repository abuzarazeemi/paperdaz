<template>
  <section class="bg-gradient-to-t from-white to-transparent">
    <div class="container py-20">
      <div
        class="
          w-full
          max-w-md
          mx-auto
          bg-white
          shadow-2xl
          rounded-xl
          px-6
          py-10
        "
      >
        <h4 class="text-lg font-medium mb-8 text-center">
          Sign up to Paperdaz
        </h4>
        <social-auth class="mb-10" />
        <div class="h-px bg-paperdazgray-100 w-full relative mb-10">
          <span
            class="
              inline-block
              bg-white
              p-2
              absolute
              top-1/2
              left-1/2
              transform
              -translate-x-1/2 -translate-y-1/2
              text-paperdazgray-500
              font-medium
              text-sm
            "
            >OR</span
          >
        </div>

        <form action="" class="text-sm" @submit.prevent="submit">
          <message-alert-widget
            :message="errorMessage"
            v-show="errorMessage"
            type="error"
            class="mb-8"
          />
          <message-alert-widget
            v-show="isRedirecting"
            type="success"
            class="mb-8"
          >
            <div class="w-full flex justify-between gap-3 items-center">
              <div class="flex-1">
                <p class="text-base">Registration Successful!</p>
                <p class="font-normal">Please wait, signing in user.</p>
              </div>
              <div>
                <span class="animate-spin inline-block">
                  <spinner-dotted-icon height="22" width="22" />
                </span>
              </div>
            </div>
          </message-alert-widget>
          <div class="mb-6">
            <label for="" class="mb-2 block">First Name</label>
            <input-field
              v-model="user.firstName"
              required
              :disabled="isLoading || isRedirecting"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div class="mb-6">
            <label for="" class="mb-2 block">Last Name</label>
            <input-field
              v-model="user.lastName"
              :disabled="isLoading || isRedirecting"
              required
              type="text"
              placeholder="Doe"
            />
          </div>
          <div class="mb-6">
            <label for="" class="mb-2 block">Email</label>
            <input-field
              v-model="user.email"
              :disabled="isLoading || isRedirecting"
              required
              type="email"
              placeholder="example@email.com"
            />
          </div>
          <div class="mb-10">
            <label for="" class="mb-2 block">Password</label>
            <password-field
              v-model="user.password"
              :disabled="isLoading || isRedirecting"
              required
              placeholder="xxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          <div class="mb-10">
            <label for="" class="mb-2 block">Confirm Password</label>
            <password-field
              v-model="confirmPassword"
              :disabled="isLoading || isRedirecting"
              placeholder="xxxxxxxxxxxxxxxxxxxx"
              :class="{
                'border-red-500':
                  user.password &&
                  confirmPassword &&
                  confirmPassword != user.password,
              }"
            />
            <small
              v-show="
                user.password &&
                confirmPassword &&
                confirmPassword != user.password
              "
              class="text-red-500"
              >Passwords don't match</small
            >
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
          <div class="flex flex-col items-center">
            <button
              class="
                h-10
                rounded-lg
                shadow
                px-5
                text-white text-sm
                bg-paperdazgreen-300
                disabled:bg-opacity-70
              "
              :class="[isLoading ? 'cursor-progress' : '']"
              :disabled="isLoading"
            >
              <span class="inline-flex items-center gap-3">
                <span>Register</span>
                <transition name="fade" :duration="100">
                  <span v-show="isLoading" class="animate-spin">
                    <spinner-dotted-icon height="22" width="22" />
                  </span>
                </transition>
              </span>
            </button>

            <span class="text-xs inline-block mt-6"
              >Already have an account?
              <nuxt-link to="/login" class="text-paperdazgreen-300"
                >Login</nuxt-link
              ></span
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import SocialAuth from '~/components/auth/SocialAuth.vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import SvgIcon from '~/components/svg-icons/SvgIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'RegisterPage',
  auth: 'guest',
  components: {
    SocialAuth,
    InputField,
    PasswordField,
    SvgIcon,
    CheckIcon,
    MessageAlertWidget,
    SpinnerDottedIcon,
  },
  layout: 'landing',
  data() {
    return {
      confirmPassword: undefined,
      user: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
      },
      isLoading: false,
      errorMessage: '',
      isRedirecting: false,
    }
  },
  methods: {
    submit() {
      event?.preventDefault()

      if (this.user.password && this.user.password !== this.confirmPassword)
        return

      if (this.isLoading || this.isRedirecting) return

      this.isLoading = true
      this.errorMessage = ''
      this.isRedirecting = false

      const data = {
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      }

      this.$axios
        .$post('/auth/register', data)
        .then(async () => {
          this.isRedirecting = true
          await this.$nextTick()

          // if registration is successful, login
          await this.$auth
            .loginWith('local', {
              data: { email: this.user.email, password: this.user.password },
            })
            .then(() => {
              this.$nuxt.$router.push('/dashboard')
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
          this.$toast.error(message).goAway(5000)
          this.errorMessage = message
          this.isRedirecting = false
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>

<style lang="postcss" scoped>
#remember-me-checkbox {
  &:not(:checked) + label {
    @apply bg-paperdazgray-400;
    & .overlay {
      @apply bg-paperdazgray-400 bg-opacity-20;
    }
  }
  &:checked + label {
    @apply bg-paperdazgreen-300;
    & .overlay {
      opacity: 1;
      @apply bg-paperdazgreen-300 bg-opacity-20;
    }
  }

  & + label {
    z-index: 2;
    & .overlay {
      z-index: -1;
      opacity: 0;
      @apply transition ease-in-out  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
    }

    &:hover .overlay {
      opacity: 1;
    }
  }
}
</style>
