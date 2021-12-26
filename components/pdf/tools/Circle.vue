<template>
  <div class="tool">
    <img src="../assets/circle_tool.svg" alt="" :style="style">
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
        width: `${(this.scale || 1) * 35}px`,
        height: `${(this.scale || 1) * 35}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>