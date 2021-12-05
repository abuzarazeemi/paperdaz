<template>
  <div class="text-field tool">
    <input type="text" v-model="text" v-if="isActive">
    <p v-else>{{text || 'Click to type'}}</p>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  },
  data: () => ({
    text: null,
  }),
}
</script>

<style lang="scss" scoped>
input{
  border: 0.5px solid #E9E9E9;
  background-color: transparent;
  border-radius: 4px;
}
</style>