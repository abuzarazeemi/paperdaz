<template>
  <el-dialog
    :visible.sync="showModal"
    :appendToBody="true"
    style=""
    :showClose="false"
    center
  >
    <!--Start:: Close Button -->
    <span
      class="
        absolute
        -top-8
        right-0
        circle circle-12
        bg-white
        cursor-pointer
        text-red-600
      "
      @click="closeModal()"
    >
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.975489L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.975489 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.975489C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.975489 0.167368L4 3.19188Z"
          fill="#676E7E"
        />
      </svg>
    </span>
    <!--End:: Close Button -->
    <template #title>
      <div class="w-full flex gap-4">
        <!-- Start:: add customer icon -->
        <span class="circle circle-16 bg-78blue-100 bg-opacity-30">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M4.79181 5.00133C4.79181 2.95224 6.45277 1.29128 8.50187 1.29128C8.62211 1.29128 8.73841 1.299 8.85471 1.30672C7.61066 0.331014 5.88519 0.250449 4.55572 1.10622C3.22641 1.96199 2.58507 3.56601 2.95821 5.10234C3.33135 6.63867 4.63689 7.7699 6.21062 7.92058C5.31472 7.21686 4.79151 6.14059 4.79181 5.00133Z"
                fill="#D4E1F4"
              />
              <path
                d="M8.49792 10.4092C8.93572 10.4088 9.37231 10.4542 9.80058 10.5449C8.82669 9.944 7.70378 9.62841 6.55952 9.63386C3.14417 9.64158 0.379988 12.367 0.387711 16.077L2.36487 16.0731C2.71772 12.7663 5.32683 10.4169 8.49792 10.4092Z"
                fill="#D4E1F4"
              />
              <path
                d="M11.0218 14.7559C11.0218 13.3377 11.7964 12.0324 13.0413 11.3531C14.2863 10.6736 15.8031 10.7283 16.996 11.4956C16.1997 10.2587 14.7723 9.57886 13.3103 9.74029C11.8482 9.90172 10.6035 10.8767 10.0964 12.2573C9.58919 13.6381 9.90705 15.1869 10.9171 16.2563C11.132 16.4841 11.3742 16.6847 11.6381 16.8533C11.2342 16.2284 11.0201 15.4999 11.0218 14.7559Z"
                fill="#D4E1F4"
              />
              <path
                d="M6.56343 8.32438C8.82651 8.32438 10.6612 6.48972 10.6612 4.22664C10.6612 1.96341 8.82651 0.128906 6.56343 0.128906C4.30036 0.128906 2.4657 1.96341 2.4657 4.22664C2.46782 6.48881 4.30111 8.32226 6.56343 8.32438ZM6.56343 0.904264C8.39839 0.904264 9.88581 2.39168 9.88581 4.22664C9.88581 6.0616 8.39839 7.54902 6.56343 7.54902C4.72847 7.54902 3.24106 6.0616 3.24106 4.22664C3.24318 2.39259 4.72938 0.906384 6.56343 0.904264Z"
                fill="#2357D1"
              />
              <path
                d="M6.55951 10.0215H6.57117C8.05026 10.0138 9.47422 10.5826 10.5411 11.6071L11.0799 11.0489C9.86811 9.88523 8.25121 9.23859 6.57117 9.24616H6.55951C4.78406 9.24995 3.13643 9.94005 1.91524 11.1962C0.674668 12.4639 -0.00377016 14.1968 1.57597e-05 16.077C0.000772943 16.1799 0.0410552 16.2785 0.112533 16.3524C0.185375 16.4252 0.284566 16.4658 0.387695 16.4647L10.7 16.4453V15.67L0.787034 15.6894C0.868507 14.1658 1.45775 12.774 2.4695 11.739C3.54349 10.6341 4.99729 10.0253 6.55951 10.0215Z"
                fill="#2357D1"
              />
              <path
                d="M15.3056 13.2039H14.1232V12.0215C14.1232 11.8075 13.9496 11.6338 13.7355 11.6338C13.5214 11.6338 13.3478 11.8075 13.3478 12.0215V13.2039H12.1654C11.9513 13.2039 11.7777 13.3776 11.7777 13.5916C11.7777 13.8057 11.9513 13.9792 12.1654 13.9792H13.3478V15.1617C13.3478 15.3758 13.5214 15.5493 13.7355 15.5493C13.9496 15.5493 14.1232 15.3758 14.1232 15.1617V13.9792H15.3056C15.5197 13.9792 15.6933 13.8057 15.6933 13.5916C15.6933 13.3776 15.5197 13.2039 15.3056 13.2039Z"
                fill="#2357D1"
              />
              <path
                d="M13.7354 9.3272C11.3803 9.3272 9.47095 11.2365 9.47095 13.5917C9.47095 15.947 11.3803 17.8561 13.7354 17.8561C16.0906 17.8561 17.9999 15.947 17.9999 13.5917C18.0056 12.4589 17.5583 11.3708 16.7572 10.5699C15.9562 9.76894 14.8682 9.32145 13.7354 9.3272ZM13.7354 17.0808C11.8084 17.0808 10.2463 15.5187 10.2463 13.5917C10.2463 11.6648 11.8084 10.1026 13.7354 10.1026C15.6625 10.1026 17.2245 11.6648 17.2245 13.5917C17.2245 15.5187 15.6625 17.0808 13.7354 17.0808Z"
                fill="#4CAF6E"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <!-- End:: add customer icon -->
        <div class="flex flex-col">
          <h4 class="text-payazablue-800 font-medium text-base">
            Add Signature
          </h4>
          <span class="text-gray-500 text-xs"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            obcaecati sapiente dignissimos</span
          >
        </div>
      </div>
    </template>
    <!-- Start:: Body -->
    <div class="flex justify-end mb-3">
      <button
        class="text-xs bg-paperdazgray-400 text-white px-3 rounded h-8"
        @click="clearSignaturePad"
      >
        Clear
      </button>
    </div>
    <div class="canvas-container">
      <canvas
        ref="signatureCanvas"
        class="border h-56 border-[#C4C4C4] w-full rounded"
      ></canvas>
    </div>
    <!-- End :: body -->

    <!-- Start:: Footer section -->
    <template #footer>
      <div class="flex items-center justify-end gap-4 py-5">
        <button
          class="
            h-9
            rounded
            border border-gray-100
            text-paperdazgreen-300 text-xs
            px-3
            bg-white
            hover:shadow
          "
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          class="
            h-9
            rounded
            border border-gray-100
            bg-paperdazgreen-300
            text-xs text-white
            px-3
            hover:shadow
          "
          @click="getImageFromSignaturePad"
        >
          Done
        </button>
      </div>
    </template>
    <!-- End:: Footer section -->
    <!-- End:: Body -->
  </el-dialog>
</template>

<script lang="ts">
import SignaturePad from 'signature_pad'
import Vue from 'vue'
export default Vue.extend({
  name: 'PdfSignatureModal',
  model: {
    prop: 'visible',
    event: 'updateVisibility',
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['visible'],
  data() {
    return {
      showModal: false,
      signaturePad: undefined as undefined | SignaturePad,
    }
  },
  watch: {
    visible(val) {
      // this.$emit("updateVisibility", val)
      this.showModal = val
    },
    showModal(val) {
      this.$emit('updateVisibility', val)
    },
  },
  mounted() {
    this.showModal = this.visible
    this.setupCanvases()
  },
  methods: {
    closeModal() {
      this.$emit('updateVisibility', false)
    },
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
    clearSignaturePad() {
      if (!this.signaturePad) return
      this.signaturePad.clear()
    },
    getImageFromSignaturePad() {
      if (!this.signaturePad) return
      const pngImage = this.signaturePad?.toDataURL()

      console.log(pngImage)
      // @ts-ignore
      this.$BUS.$emit('signature-update', pngImage)

      alert("Check console and method 'getImageFromSignaturePad'")
    },
  },
})
</script>

<style scoped>
* >>> .el-dialog {
  width: 416px !important;
  max-width: 95% !important;
  border-radius: 20px !important;
  border-radius: 8px !important;
  position: relative !important;
}
* >>> .el-dialog__header {
  padding-bottom: 20px;
}

* >>> .el-dialog__header,
* >>> .el-dialog__footer {
  text-align: left !important;
}

* >>> .el-dialog__body {
  /* padding-top: 0 !important;
  padding-bottom: 0 !important; */
  background: #fcfcfd;
}

* >>> .el-select .el-input__inner {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
