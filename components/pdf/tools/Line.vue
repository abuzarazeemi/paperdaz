<template>
  <!-- <div class="tool line">
  </div> -->
  <svg class="pdf-exclude-fs" preserveAspectRatio="none" :viewBox="viewBox" :style="style">
  <!-- <svg class="pdf-exclude-fs" preserveAspectRatio="none" style="inset: 0px; width: 100%; height: 100%; margin: auto auto 0px 0px;"> -->
    <path class="mouseFocusClassName elementHover-Content" :d="`M${x1},${y1}L${x2},${y2}`" stroke-linecap="round" style="stroke: rgb(0, 0, 0); stroke-width: 3;">
    </path>
    <!-- <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" style="stroke:rgb(255,0,0);stroke-width:2" /> -->
  </svg>
</template>

<script>
export default {
  props: {
    tool: Object,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
  },
  computed: {
    style(){
      return {
        width: `${this.width}px`,
        position: 'absolute'
      }
    },
    viewBox(){
      let x1 = Math.min(this.x1, this.x2)
      let y1 = this.y2 < this.y1 ? this.y2 : this.y1 //Math.min(this.y1, this.y2) : Math.max(this.y1, this.y2)
      return `${x1} ${y1} ${this.width} ${this.height}`
    },
    width(){
      return Math.abs(this.x2 - this.x1)
    },
    height(){
      return Math.abs(this.y2 - this.y1)
    },
  },
}
</script>

<style lang="scss" scoped>
.line{
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>