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
    text: 'Name',
  }),
  computed: {
    style() {
      return {
        fontSize: `${this.fontSize || 12}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
