<template>
  <div>
    <section class="relative">
      <h4
        class="px-5 text-4xl lg:text-5xl text-black font-semibold absolute inline-block transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        About <span class="text-paperdazgreen-400">Paperdaz</span>
      </h4>
      <img
        src="~/assets/img/world_map.svg"
        alt=""
        class="w-full max-w-full max-h-80 min-h-[250px] object-cover"
      />
    </section>
    <section
      class="container block sm:grid grid-cols-[1fr,max-content] mt-12 gap-4"
    >
      <div class="mb-12 sm:mb-0">
        <img
          class="max-w-full max-h-[800px]"
          src="~/assets/img/big_tree.svg"
          alt=""
        />
      </div>
      <div
        class="px-4 self-center max-w-[250px] md:max-w-[300px] lg:max-w-[400px] my-3"
      >
        <article class="mb-6 md:mb-10">
          <header class="header">
            <h2>Our Mission</h2>
          </header>
          <main>
            <p class="body">
              Our mission is to eliminate the distress of paperwork for everyone
            </p>
          </main>
        </article>

        <article class="mb-6 md:mb-10">
          <header class="header">
            <h2>Our Vision</h2>
          </header>
          <main>
            <p class="body">Our vision is to replace paper with Paperdaz</p>
          </main>
        </article>

        <article>
          <header class="header">
            <h2>Our Goal</h2>
          </header>
          <main>
            <p class="body">
              "Paper? Do you have a Paperlink for me to complete?"
            </p>
          </main>
        </article>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AboutPage',
  layout: 'landing',
  auth: false,
})
</script>

<style lang="postcss" scoped>
.header {
  @apply text-2xl lg:text-3xl text-paperdazgreen-400 mb-1.5 lg:mb-2 font-semibold;
}

.body {
  @apply text-[#414142] font-medium text-sm lg:text-base;
}
</style>
