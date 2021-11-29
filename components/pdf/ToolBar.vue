<template>
  <div class="tool-bar">
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.text)">
      TEXT
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.dot)">
      DOT
    </div>
  </div>
</template>

<script>
import TOOL_TYPE from './data/toolType'
export default {
  data: () => ({
    selectedType: null,
  }),
  computed: {
    TOOL_TYPE(){ return TOOL_TYPE },
  },
  methods: {
    setSelectedType(type){
      this.selectedType = type
      this.$emit('tool-change', this.selectedType)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>