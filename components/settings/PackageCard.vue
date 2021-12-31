<template>
  <div
    class="
      border-2 border-paperdazgreen-400
      w-full
      rounded-2xl
      overflow-hidden
      relative
      pb-5
    "
  >
    <div class="promoted-banner" v-if="promoted">Popular</div>
    <h4 class="text-lg px-5 py-4 text-center uppercase font-semibold">
      {{ stagingPackage.name }}
    </h4>
    <div
      class="flex items-center justify-center text-white px-5 py-4"
      :class="[promoted ? 'bg-[#FEBA0A]' : 'bg-paperdazgreen-400']"
    >
      <span
        >$
        <span class="text-5xl font-medium">{{
          isMonthly ? stagingPackage.monthly_price : stagingPackage.yearly_price
        }}</span>
        /{{ isMonthly ? 'mo' : 'yr' }}</span
      >
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
          <span>{{ stagingPackage.paperlink }} Paperlink files</span>
        </li>
        <li>
          <span><tick-icon width="20" height="20" /></span>
          <span>{{ stagingPackage.team_members }} Team members </span>
        </li>
        <li>
          <span><tick-icon width="20" height="20" /></span>
          <span>{{ stagingPackage.carbon }} CC Flow </span>
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

    <div class="grid place-items-center" v-if="showBottomButton">
      <button
        @click="$emit('bottom-button-clicked', { stagingPackage, isMonthly })"
        class="
          text-sm text-white
          bg-paperdazgreen-400
          rounded-lg
          shadow
          h-9
          px-5
        "
      >
        Start Now
      </button>
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
    showBottomButton: {
      type: Boolean,
      default: false,
    },
    stagingPackage: {
      type: Object,
      required: true,
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

.promoted-banner {
  @apply absolute
        right-0
        inline-block
        bg-paperdazgreen-400
        text-white text-xxs
        pt-6 pb-1 px-32;
  /* background: #77B550; */
  transform: translateX(50%) rotate(45deg);
  transform-origin: 50% 0%;
}
</style>
