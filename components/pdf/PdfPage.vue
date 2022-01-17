<template>
  <div class="pdf-page" ref="PdfPage">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    pageNumber: Number,
    pdf: Object,
  },
  data: () => ({
    scale: 2,
  }),
  mounted() {
    this.getPage()
  },
  methods: {
    async getPage() {
      let page = await this.pdf.getPage(this.pageNumber)

      let canvas = this.$refs.canvas

      let context = canvas.getContext('2d')

      let dpr = window.devicePixelRatio || 1
      let bsr =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      let ratio = dpr / bsr
      let originalviewport = page.getViewport({ scale: this.scale })
      console.log([this.$refs.PdfPage])
      var viewport = page.getViewport({
        scale: this.$refs.PdfPage.clientWidth / originalviewport.width,
      })
      viewport = originalviewport
      canvas.width = viewport.width * ratio
      canvas.height = viewport.height * ratio
      // canvas.style.width = viewport.width + 'px'
      // canvas.style.height = viewport.height + 'px'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      page.render({
        canvasContext: context,
        viewport: originalviewport,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
