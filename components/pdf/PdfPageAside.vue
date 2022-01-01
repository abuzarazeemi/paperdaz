<template>
  <aside
    class="
      bg-[#717171] bg-opacity-40
      w-[200px]
      py-4
      flex flex-col
      justify-between
      self-start
      h-full
      gap-3
    "
  >
    <div class="flex-1 overflow-y-auto custom-scrollbar px-5">
      <div class="bg-white h-56 mb-5" v-for="i in 4" :key="i"></div>
    </div>
    <div class="px-5">
      <div class="flex gap-2">
        <button class="circle circle-15 bg-[#626262] text-white">
          <arrow-with-stick-icon />
        </button>
        <div
          class="
            flex-1
            grid
            place-items-center
            h-7
            bg-white
            text-sm
            px-1
            py-0.5
          "
        >
          1/4
        </div>
        <button class="circle circle-15 bg-[#626262] text-white">
          <arrow-with-stick-icon class="transform rotate-180" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import ArrowWithStickIcon from '../svg-icons/ArrowWithStickIcon.vue'
export default Vue.extend({
  components: { ArrowWithStickIcon },
  name: 'PdfPageAside',
})
</script>

<style lang="scss" scoped>
.custom-scrollbar {
  /* Handle */
  &::-webkit-scrollbar-thumb {
    @apply bg-gray-500 bg-opacity-30;
    border-radius: 3px;

    &:hover {
      @apply bg-gray-700 bg-opacity-100 cursor-pointer;
    }
  }
}
</style>
