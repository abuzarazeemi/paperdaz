<template>
  <div class="container py-14 sm:py-20">
    <div
      class="
        grid grid-cols-1
        sm:grid-cols-[1fr,max-content]
        gap-2
        sm:gap-8
        md:gap-10
      "
    >
      <div class="text-center sm:text-left">
        <div class="max-w-[640px]">
          <h1 class="font-bold text-5xl leading-[62px]">
            Paperdaz will save time and money for everyone
          </h1>
          <p class="my-9 font-medium text-sm">
            Keeping everyone safe and the world green by using Less paper
            <nuxt-link to="#" class="text-paperdazgreen-500"
              >Learn More</nuxt-link
            >
          </p>
          <div>
            <button
              class="
                font-semibold
                text-[13px] text-white
                bg-paperdazgreen-300
                shadow-md
                h-10
                rounded-md
                px-5
                w-full
                mb-8
                sm:mb-0 sm:w-[unset]
              "
            >
              Try Paperdaz for free
            </button>
          </div>
        </div>
      </div>
      <div class="">
        <img
          class="
            w-screen
            max-h-[600px]
            sm:max-w-[300px]
            md:max-w-[350px]
            lg:max-w-[400px]
            xl:max-w-[500px]
            2xl:max-w-[600px]
          "
          src="/img/hero.svg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({ name: 'HeroPage' })
</script>
