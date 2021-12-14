<template>
  <svg :viewBox="viewBox" :style="style">
    <path :d="d" stroke-linecap="round" style="stroke: rgb(0, 0, 0); stroke-width: 3;"></path>
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
        width: `${this.width + 10}px`,
      }
    },
    viewBox(){
      let x1 = this.x2 < this.x1 ? this.x2 - 2 : this.x1 - 2
      let y1 = Math.min(this.y1, this.y2) - 2
      return `${x1} ${y1} ${this.width + 10} ${this.height + 10}`
    },
    width(){
      return Math.abs(this.x2 - this.x1)
    },
    height(){
      return Math.abs(this.y2 - this.y1)
    },
    d(){
      let x1 = this.x1
      let y1 = this.y1
      let x2 = this.x2
      let y2 = this.y2

      return `M${x1},${y1}L${x2},${y2}`
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