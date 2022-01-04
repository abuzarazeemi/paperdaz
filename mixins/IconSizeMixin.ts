import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      hwRatio: 1,
      fontSize: 16,
    }
  },
  mounted() {
    this.computeFontSize()
    window.addEventListener('resize', this.computeFontSize)
  },
  updated() {
    this.computeFontSize()
  },
  methods: {
    async computeFontSize() {
      await this.$nextTick()
      const style = getComputedStyle((this.$el as HTMLElement) || document)
      this.fontSize = parseFloat(style.fontSize)
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.computeFontSize)
  },
})
