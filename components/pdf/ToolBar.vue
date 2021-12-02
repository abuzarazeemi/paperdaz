<template>
  <div class="tool-bar">
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.text)">
      <img src="./assets/text_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.tick)">
      <img src="./assets/tick_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.cross)">
      <img src="./assets/cross_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.dot)">
      <img src="./assets/dot_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.circle)">
      <img src="./assets/circle_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.line)">
      <img src="./assets/line_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.highlight)">
      <img src="./assets/highlight_tool.svg" alt="">
    </div>
    <div class="tool-item" @click="setSelectedType(TOOL_TYPE.draw)">
      <img src="./assets/draw_tool.svg" alt="">
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
      if(this.selectedType == type) this.selectedType = null
      else this.selectedType = type
      this.$emit('tool-change', this.selectedType)
    },
  },
}
</script>

<style lang="scss" scoped>
.tool-bar{
  display: flex;
  align-items: center;
}
</style>