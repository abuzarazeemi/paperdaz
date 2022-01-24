<template>
  <div>
    <section class="relative shadow">
      <div
        class="px-5 text-center text-black absolute inline-block transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <h4 class="text-4xl lg:text-5xl font-semibold whitespace-nowrap">
          FAQ's
        </h4>
        <p class="text-[#414142] font-medium">Frequently Asked Questions</p>
      </div>
      <img
        src="~/assets/img/world_map.svg"
        alt=""
        class="w-full max-w-full max-h-80 min-h-[250px] object-cover"
      />
    </section>
    <section class="container card-containers">FAQs</section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FaqPage',
  layout: 'landing',
  auth: false,
  head() {
    return {
      script: [
        // ...
        {
          hid: 'tawk.to',
          src: 'https://embed.tawk.to/61ee08389bd1f31184d8e4d8/1fq4t07bg',
          defer: true,
        },
      ],
    }
  },
  beforeRouteLeave(to, from, next) {
    location.href = to.fullPath
    return
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.header {
  @apply text-2xl lg:text-3xl text-paperdazgreen-400 mb-1.5 lg:mb-2 font-semibold;
}

.body {
  @apply text-[#414142] font-medium text-sm lg:text-base;
}
</style>
