<template>
  <div class="rounded-2xl bg-white py-6 px-6 flex items-center justify-center">
    <div class="flex flex-col items-center">
      <h3
        class="
          uppercase
          text-paperdazgray-500
          font-semibold
          text-center
          mb-4
          text-xl
        "
      >
        Free Account
      </h3>
      <div
        class="circle circle-75 border-4 border-[#B7EF94] mx-auto p-0.5 mb-2"
      >
        <div class="circle w-full h-full border-2 border-[#B7EF94] p-1.5">
          <img
            src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
            class="circle w-full h-full"
            alt=""
          />
        </div>
      </div>
      <p class="text-lg font-semibold mb-2">My Star 20</p>
      <div
        class="
          border border-paperdazgray-100
          inline-flex
          items-center
          px-2
          py-0.5
          text-xs
          font-semibold
          rounded-full
        "
      >
        <p class="mr-2">700</p>
        <single-leaf-no-stalk />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SingleLeafNoStalk from '../svg-icons/SingleLeafNoStalk.vue'
export default Vue.extend({
  name: 'ProfileCard',
  components: { SingleLeafNoStalk },
})
</script>
