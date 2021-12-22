<template>
  <div class="flex-1 rounded-3xl bg-white py-6 px-8">
    <!-- Start:: Signature section -->
    <section class="mb-12">
      <!-- <div class="flex justify-between items-center mb-4"> -->
      <!-- <h3 class="text-[#524D5B] font-medium text-2xl flex items-center gap-3">
          Signature <exclamation-icon class="text-paperdazgreen-300 w-4 h-4" />
        </h3> -->
      <!-- <div class="flex">
          <button class="action-button primary mr-3">Save</button>
          <button class="action-button danger">Cancel</button>
        </div> -->
      <!-- </div> -->
      <h3
        class="
          flex
          justify-center
          text-paperdazgreen-300
          border-b-2 border-paperdazgreen-300
          font-semibold
          text-2xl
          gap-2
          pb-2
          relative
          mb-7
        "
      >
        <span class="flex items-center gap-3"
          >Signature <exclamation-icon class="text-paperdazgreen-300 w-4 h-4"
        /></span>
        <!-- <pen-icon
            class="absolute right-0 top-1/2 transform -translate-y-1/2"
          /> -->
        <button
          class="
            action-button action-button-sm
            primary
            mr-3
            absolute
            right-0
            top-1/2
            transform
            -translate-y-1/2
          "
        >
          Edit
        </button>
      </h3>
      <div class="canvas-container">
        <canvas class="border h-56 border-[#C4C4C4] w-full rounded"></canvas>
      </div>
    </section>
    <!-- End:: Signature section -->

    <!-- Start:: Initials section -->
    <section>
      <!-- <div class="flex justify-between items-center mb-4">
        <h3 class="text-[#524D5B] font-medium text-2xl flex items-center gap-3">
          Initials <exclamation-icon class="text-paperdazgreen-300 w-4 h-4" />
        </h3>
        <div class="flex">
          <button class="action-button primary mr-3">Save</button>
          <button class="action-button danger">Cancel</button>
        </div>
      </div> -->
      <h3
        class="
          flex
          justify-center
          text-paperdazgreen-300
          border-b-2 border-paperdazgreen-300
          font-semibold
          text-2xl
          gap-2
          pb-2
          relative
          mb-7
        "
      >
        <span class="flex items-center gap-3"
          >Initials <exclamation-icon class="text-paperdazgreen-300 w-4 h-4"
        /></span>
        <!-- <pen-icon
            class="absolute right-0 top-1/2 transform -translate-y-1/2"
          /> -->
        <button
          class="
            action-button action-button-sm
            primary
            mr-3
            absolute
            right-0
            top-1/2
            transform
            -translate-y-1/2
          "
        >
          Edit
        </button>
      </h3>
      <div class="canvas-container">
        <canvas class="border h-56 border-[#C4C4C4] w-full rounded"></canvas>
      </div>
    </section>
    <!-- End:: Initials section -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignaturePad from 'signature_pad'
import ExclamationIcon from '~/components/svg-icons/ExclamationIcon.vue'

export default Vue.extend({
  name: 'SignatureInitialsTab',
  components: { ExclamationIcon },
  data() {
    return {
      signatureCanvas: undefined as undefined | any,
      initialsCanvas: undefined as undefined | any,
    }
  },
  computed: {
    functionalCanvases(): Array<any> {
      return [this.signatureCanvas, this.initialsCanvas]
    },
  },
  mounted() {
    this.setupCanvases()
  },
  methods: {
    setupCanvases() {
      const canvasContainers = document.querySelectorAll('.canvas-container')
      canvasContainers.forEach((canvasContainer, index) => {
        const canvas = canvasContainer.querySelector(
          'canvas'
        ) as HTMLCanvasElement

        if (!canvas) return

        let currentSignaturePad = this.functionalCanvases[index]

        currentSignaturePad = new SignaturePad(canvas)
      })

      window.addEventListener('resize', this.resizeCanvas)
      this.resizeCanvas()
    },
    resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      const canvasContainers = document.querySelectorAll('.canvas-container')
      canvasContainers.forEach((canvasContainer) => {
        const canvas = canvasContainer.querySelector(
          'canvas'
        ) as HTMLCanvasElement

        if (!canvas) return

        canvas.width = canvas.offsetWidth * ratio
        canvas.height = canvas.offsetHeight * ratio
        // @ts-ignore
        canvas.getContext('2d').scale(ratio, ratio)
      })
    },
  },
})
</script>
