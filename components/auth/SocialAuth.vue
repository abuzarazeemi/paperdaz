<template>
  <div>
    <div
      class="
        flex flex-wrap
        gap-2
        xs:gap-4
        text-sm
        font-medium
        text-paperdazgray-400
      "
    >
      <div
        class="flex-1 cursor-pointer social-card"
        @click="signInWithFacebook"
      >
        <img
          class="object-contain w-5 h-5"
          src="/icons/authIcons/facebook.png"
          alt=""
        />
        <span>Facebook</span>
      </div>
      <div class="flex-1 social-card cursor-pointer" @click="signInWithGoogle">
        <img
          class="object-contain w-5 h-5"
          src="/icons/authIcons/google.png"
          alt=""
        />
        <span>Google</span>
      </div>
      <div class="flex-1 cursor-pointer social-card" @click="signInWithTwitter">
        <img
          class="object-contain w-5 h-5"
          src="/icons/authIcons/twitter.png"
          alt=""
        />
        <span>Twitter</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Passport from 'passport'
import {
  IOAuthStrategyOption,
  OAuthStrategy as GoogleStrategy,
} from 'passport-google-oauth'

export default Vue.extend({
  created() {
    this.setupPassport()
  },
  methods: {
    setupPassport() {
      Passport.use(
        new GoogleStrategy(
          {
            consumerKey:
              '568264793203-bt6todb2a2iraaogv4vl03u6v58u7cb3.apps.googleusercontent.com',
            consumerSecret: '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',
          } as IOAuthStrategyOption,
          (token, tokenSecret, profile, done) => {
            console.log('token ', token)
            console.log('tokenSecret ', tokenSecret)
            console.log('profile ', profile)
          }
        )
      )
    },
    signInWithFacebook() {},
    signInWithGoogle() {
      location.href = '/auth/google'
    },
    signInWithTwitter() {},
    async signIn(social: string, payload: any) {
      try {
        const response = await this.$axios.$post('/api/auth/' + social, payload)
        const user = response.data[0]
        this.setUser(user)
      } catch (error: any) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.$toast.error(error.response.data.message).goAway(5000)
        } else {
          this.$toast.error('Server not reachable').goAway(5000)
        }
      }
    },
    async setUser(user: any) {
      const token = user.token
      // @ts-ignore
      await this.$auth.strategies.local.setUserToken(token)
      await this.$auth.fetchUser()
      // this.$auth.strategy.token.set(token)
      this.$router.push('/dashboard')
    },
  },
})
</script>

<style lang="postcss" scoped>
.social-card {
  @apply flex justify-center
            items-center
            bg-white
            rounded-md
            shadow
            px-3
            py-3
            min-w-[120px]
            gap-2 hover:text-paperdazgray-500;
}
</style>
