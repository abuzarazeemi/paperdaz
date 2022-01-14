<template>
  <div class="tool">
    <img :src="signature" alt="" v-if="signature" :style="style">
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
    style(){
      return {
        width: `${(this.scale || 1) * 143}px`,
        height: `${(this.scale || 1) * 88}px`,
      }
    },
  },
}
</script>

<style>

</style>