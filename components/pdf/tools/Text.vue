<template>
  <div class="text-field tool">
    <input type="text" v-model="text" v-if="isActive" :style="style">
    <p v-else :style="style">{{text || 'Click to type'}}</p>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    fontSize: Number
  },
  data: () => ({
    text: null,
  }),
  computed: {
    style(){
      return {
        fontSize: `${this.fontSize || 12}px`
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