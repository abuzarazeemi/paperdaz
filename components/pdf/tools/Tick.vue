<template>
  <div class="text-field tool">
    <img src="../assets/tick_tool.svg" alt="" :style="style" />
  </div>
</template>

<script>
export default {
  props: {
    scale: Number,
  },
  computed: {
    style() {
      return {
        width: `${(this.scale || 1) * 20}px`,
        height: `${(this.scale || 1) * 19}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  border: 0.5px solid #e9e9e9;
  background-color: transparent;
  border-radius: 4px;
}
</style>
