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
          Sign in to Paperdaz
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

        <form action="" class="text-sm" @submit.prevent="login">
          <div class="mb-6">
            <label for="" class="mb-2 block">Email</label>
            <input-field
              v-model="user.email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>
          <div class="mb-10">
            <label for="" class="mb-2 block">Password</label>
            <password-field
              v-model="user.password"
              required
              placeholder="xxxxxxxxxxxxxxxxxxxx"
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
                <svg-icon
                  value="CheckIcon"
                  class="relative"
                  style="z-index: 1"
                />
              </label>
              <label for="remember-me-checkbox" class="cursor-pointer"
                >Remember me</label
              >
            </div>
            <nuxt-link to="#" class="text-paperdazgreen-300"
              >Forgot Password</nuxt-link
            >
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
              "
            >
              Log in
            </button>

            <span class="text-xs inline-block mt-6"
              >Not a member yet?
              <nuxt-link to="/register" class="text-paperdazgreen-300"
                >Join Now</nuxt-link
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
import SvgIcon from '~/components/svg-icons/SvgIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'LoginPage',
  auth: 'guest',
  components: { SocialAuth, InputField, PasswordField, SvgIcon },
  layout: 'landing',
  data() {
    return {
      user: {
        email: undefined,
        password: undefined,
      },
      isLoading: false,
    }
  },
  methods: {
    login() {
      event?.preventDefault()

      if (this.isLoading) return

      this.isLoading = true
      this.$auth
        .loginWith('local', { data: this.user })
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.$toast.error(error.response.data.message).goAway(1500)
          } else {
            this.$toast.error('Server not reachable').goAway(1500)
          }
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
