<template>
  <input type="text" class="input-field" placeholder="" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputField',
})
</script>

<style lang="postcss" scoped>
.input-field {
  @apply w-full
                rounded-xl
                px-2
                border border-paperdazgray-300
                bg-white
                h-10
                focus:outline-none focus:border-paperdazgray-500;
}
</style>
