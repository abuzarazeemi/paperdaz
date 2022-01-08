<template>
  <div class="tool">
    <img :src="signature" alt="" v-if="signature" :style="style" />
    <div class="no-signature" v-else>
      <p>No Signature</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scale: Number,
    signature: String,
  },
  computed: {
    style() {
      return {
        // width: `${(this.scale || 1) * 287}px`,
        height: `${(this.scale || 1) * 70}px`,
        objectFit: 'contain',
      }
    },
  },
}
</script>

<style></style>
