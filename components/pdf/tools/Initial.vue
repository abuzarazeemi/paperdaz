<template>
  <div class="tool">
    <p :style="style">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    fontSize: Number,
  },
  data: () => ({
    text: 'Initial',
  }),
  computed: {
    style() {
      return {
        fontSize: `${this.fontSize || 11}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
