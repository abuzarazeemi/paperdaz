<template>
  <div
    class="border-2 border-paperdazgreen-300 w-full rounded-2xl overflow-hidden"
  >
    <h4 class="text-lg px-5 py-4 text-center">Business</h4>
    <div
      class="flex items-center justify-center text-white px-5 py-4"
      :class="[promoted ? 'bg-[#FEBA0A]' : 'bg-paperdazgreen-400']"
    >
      <span>$ <span class="text-5xl font-medium">29</span> /mo</span>
    </div>
    <div class="px-5 py-4">
      <div class="flex justify-center mb-10">
        <span class="mr-2">Yeary</span>
        <span
          class="
            inline-flex
            bg-opacity-30
            w-12
            rounded-full
            mr-2
            cursor-pointer
            transition
            ease-in-out
            duration-200
          "
          :class="[
            isMonthly
              ? 'justify-end bg-paperdazgreen-300'
              : 'bg-paperdazgray-500',
          ]"
          @click="isMonthly = !isMonthly"
          ><span
            class="circle circle-12"
            :class="[
              isMonthly ? 'bg-paperdazgreen-300' : 'bg-paperdazgray-500',
            ]"
          ></span
        ></span>
        <span class="text-paperdazgray-300">Monthly</span>
      </div>
      <ul class="package-list">
        <li class="">
          <span><tick-icon width="20" height="20" /></span>
          <span>60 Paperlink files</span>
        </li>
        <li>
          <span><tick-icon width="20" height="20" /></span>
          <span>5 Team members </span>
        </li>
        <li>
          <span><tick-icon width="20" height="20" /></span>
          <span>Public Profile </span>
        </li>
        <li>
          <span><tick-icon width="20" height="20" /></span>
          <span>PDF copy of all files </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TickIcon from '../svg-icons/TickIcon.vue'
export default Vue.extend({
  name: 'PackageCard',
  components: { TickIcon },
  props: {
    promoted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMonthly: true,
    }
  },
})
</script>

<style lang="postcss" scoped>
.package-list {
  width: min-content;
  @apply mx-auto;
  & li {
    @apply inline-grid  gap-3 whitespace-nowrap mb-3 text-sm;
    grid-template-columns: min-content 1fr;
    & > *:nth-child(2) {
      color: #606060;
    }

    &:last-child {
      @apply mb-0;
    }
  }
}
</style>
