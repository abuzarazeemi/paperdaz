<template>
  <component :is="icon" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SvgIcon',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    icon(): any {
      const v = this.value
      return () => import(`./${v}.vue`)
    },
  },
})
</script>
