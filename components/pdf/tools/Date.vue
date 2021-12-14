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
    text: '2021-12-04',
  }),
}
</script>

<style lang="scss" scoped></style>