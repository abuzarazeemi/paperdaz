<template>
  <div class="tool">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  },
  data: () => ({
    text: 'Name',
  }),
}
</script>

<style lang="scss" scoped></style>