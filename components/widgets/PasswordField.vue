<template>
  <div
    class="input-field flex items-center"
    :class="[focus ? 'border-paperdazgray-500' : 'border-paperdazgray-300']"
  >
    <input
      ref="inputField"
      v-model="value"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      class="outline-none focus:outline-none border-none flex-1 h-full"
      @focus="focus = true"
      @focusout="focus = false"
    />
    <span
      class="cursor-pointer"
      :class="{ 'text-paperdazgray-300': !showPassword }"
      @click="showPassword = !showPassword"
    >
      <svg-icon :value="showPassword ? 'EyeIcon' : 'EyeSlashedIcon'" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '../svg-icons/SvgIcon.vue'
export default Vue.extend({
  name: 'PasswordField',
  components: { SvgIcon },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showPassword: false,
      value: undefined,
      focus: false,
    }
  },
  watch: {
    value(val: string) {
      this.$emit('input', val)
    },
  },
  mounted() {},
})
</script>
<style lang="postcss" scoped>
.input-field {
  @apply w-full
                rounded-xl
                px-2
                border 
                bg-white
                h-10
                focus:outline-none;
}
</style>
