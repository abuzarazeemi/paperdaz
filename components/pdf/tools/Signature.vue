<template>
  <div class="tool">
    <img :src="value" alt="" v-if="value" :style="style" />
    <div class="no-signature" v-else>
      <p>No Signature</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scale: Number,
    value: String,
  },
  computed: {
    style() {
      return {
        // width: `${(this.scale || 1) * 287}px`,
        // height: `${(this.scale || 1) * 60}px`,
        height: `${(this.scale || 1) * 5}vw`,
        maxHeight: `${(this.scale || 1) * 60}px`,
        objectFit: 'contain',
      }
    },
  },
}
</script>

<style></style>
