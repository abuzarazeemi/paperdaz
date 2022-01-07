<template>
  <div class="grid place-items-center">
    <div class="inline-block mx-auto bg-white rounded">
      <canvas
        ref="signatureCanvas"
        class="border h-56 border-[#C4C4C4] w-full rounded"
      ></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import SignatureBodyMixin from '~/mixins/SignatureBodyMixin'
import SignaturePad from 'signature_pad'
export default mixins(SignatureBodyMixin).extend({
  name: 'SignatureBodyTab',
  data() {
    return {
      signaturePad: undefined as undefined | SignaturePad,
    }
  },
  mounted() {
    this.setupCanvases()
  },
  methods: {
    async setupCanvases() {
      await this.$nextTick()
      const canvas = this.$refs.signatureCanvas as HTMLCanvasElement

      if (!canvas) return

      this.signaturePad = new SignaturePad(canvas)

      window.addEventListener('resize', this.resizeCanvas)
      this.resizeCanvas()
    },
    async resizeCanvas() {
      await this.$nextTick()
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      const canvas = this.$refs.signatureCanvas as HTMLCanvasElement

      if (!canvas) return

      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d')?.scale(ratio, ratio)
    },
    clear() {
      if (!this.signaturePad) return
      this.signaturePad.clear()
    },
    exportImage() {
      if (!this.signaturePad) return
      const pngImage = this.signaturePad?.toDataURL()

      this.$emit('export-image', pngImage)
    },
  },
  beforeDestroy() {
    try {
      window.removeEventListener('resize', this.resizeCanvas)
    } catch (e) {}
  },
})
</script>
