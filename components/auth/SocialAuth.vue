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
    signInWithTwitter() {
      const provider = new this.$fireModule.auth.TwitterAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .then((authData: any) => {
          console.log(authData)
          const accessToken = authData.credential.accessToken
          const secretToken = authData.credential.secret
          console.log(accessToken, secretToken)
          this.signIn('twitter', {
            oauth_token: accessToken,
            oauth_token_secret: secretToken,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async signIn(social: string, payload: any) {
      try {
        console.log(payload)
        const response = await this.$axios.$post('/api/auth/' + social, payload)
        console.log(response)
        const user = response.data[0]
        this.setUser(user)
      } catch (error: any) {
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
      }
    },
    async setUser(user: any) {
      const token = user.token
      // @ts-ignore
      await this.$auth.strategies.local.setUserToken(token)
      await this.$auth.fetchUser()
      // this.$auth.strategy.token.set(token)
      this.$router.push('/dashboard')
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
            px-3
            py-3
            gap-2 hover:text-paperdazgray-500;
}
</style>
