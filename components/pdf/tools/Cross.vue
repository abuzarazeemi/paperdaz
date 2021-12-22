<template>
  <div class="tool">
    <img src="../assets/cross_tool.svg" alt="" :style="style">
  </div>
</template>

<script>
export default {
  props: {
    scale: Number,
  },
  computed: {
    style(){
      return {
        width: `${(this.scale || 1) * 29}px`,
        height: `${(this.scale || 1) * 17}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>