<template>
  <div class="text-field tool">
    <input type="text" v-model="text" v-if="isActive" :style="style" />
    <p v-else :style="style">{{ text || 'Click to type' }}</p>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    fontSize: Number,
    value: String,
  },
  data: () => ({
    text: null,
  }),
  created(){
    this.text = this.value
  },
  watch: {
    value(v){
      if(this.text != v) this.text = v
    },
    text(v){
      if(this.value != v) this.$emit('input', v)
    },
  },
  computed: {
    style() {
      return {
        fontSize: `${this.fontSize || 11}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  border: 0.5px solid #e9e9e9;
  background-color: transparent;
  border-radius: 4px;
}
</style>
