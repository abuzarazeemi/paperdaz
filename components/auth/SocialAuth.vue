<template>
  <div>
    <div class="flex flex-wrap gap-4 text-sm font-medium text-paperdazgray-400">
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

export default Vue.extend({
  methods: {
    async signInWithFacebook() {
      try {
        const provider = new this.$fireModule.auth.FacebookAuthProvider()
        provider.setCustomParameters({ auth_type: 'reauthenticate' })
        const authData = await this.$fire.auth.signInWithPopup(provider)
        const accessToken = authData.credential.accessToken
        this.signIn('facebook', {
          access_token: accessToken,
        })
      } catch (err) {
        return err
      }
    },
    async signInWithGoogle() {
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        const authData = await this.$fire.auth.signInWithPopup(provider)
        const accessToken = authData.credential.accessToken
        this.signIn('google', {
          access_token: accessToken,
        })
      } catch (err) {
        return err
      }
    },
    async signInWithTwitter() {
      try {
        const provider = new this.$fireModule.auth.TwitterAuthProvider()
        const authData = await this.$fire.auth.signInWithPopup(provider)
        const accessToken = authData.credential.accessToken
        const secretToken = authData.credential.secret
        this.signIn('twitter', {
          oauth_token: accessToken,
          oauth_token_secret: secretToken,
        })
      } catch (err) {
        return err
      }
    },
    async signIn(social: string, payload: any) {
      try {
        const response = await this.$axios.$post('/api/auth/' + social, payload)
        const user = response.data[0]
        this.setUser(user)
      } catch (error: any) {
        console.log(error.response.data.message)
      }
    },
    async setUser(user: any) {
      const token = user.token
      this.$auth.setUser(user)
      // @ts-ignore
      this.$auth.strategies.local.setUserToken(token)
      // this.$auth.strategy.token.set(token)
      this.$router.push('/dashboard').catch(() => true)
      await this.$fire.auth.signOut()
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
            px-2
            py-3
            gap-2 hover:text-paperdazgray-500;
}
</style>
