<template>
  <div class="text-field tool">
    <img src="../assets/tick_tool.svg" alt="" :style="style">
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
        width: `${(this.scale || 1) * 36}px`,
        height: `${(this.scale || 1) * 35}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input{
  border: 0.5px solid #E9E9E9;
  background-color: transparent;
  border-radius: 4px;
}
</style>