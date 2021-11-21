<template>
  <div class="flex items-center overflow-x-auto overflow-y-hidden">
    <div
      v-for="(tab, i) in tabs"
      :key="i"
      class="
        h-10
        border-b-2
        cursor-pointer
        font-semibold
        text-lg
        whitespace-nowrap
      "
      :class="[
        currentTab == tab.value
          ? 'border-paperdazgreen-300 text-paperdazgreen-300'
          : 'border-transparent',
        i !== tabs.length - 1 ? 'mr-8' : '',
      ]"
      @click="$emit(`update-tab`, tab.value)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProfileTab',
  model: {
    prop: 'currentTab',
    event: 'update-tab',
  },
  props: {
    currentTab: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: () => [
        { label: 'Account', value: 'account' },
        { label: 'Change Password', value: 'change-password' },
        { label: 'Signature/Initials', value: 'signature-initials' },
      ],
    },
  },
  data() {
    return {}
  },
})
</script>
