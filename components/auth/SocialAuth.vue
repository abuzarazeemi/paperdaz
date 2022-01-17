<template>
  <div>
    <div
      class="flex flex-wrap gap-2 xs:gap-4 text-sm font-medium text-paperdazgray-400"
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
  created() {},
  methods: {
    signInWithFacebook() {
      location.href = '/auth/facebook'
    },
    signInWithGoogle() {
      location.href = '/auth/google'
    },
    signInWithTwitter() {
      location.href = '/auth/twitter'
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
