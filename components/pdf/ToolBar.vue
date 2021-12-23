<template>
  <section>
    <div
      class="
        flex
        items-center
        justify-between
        bg-[#E8EAEC]
        container
        py-2
        gap-2
      "
    >
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.text)">
        <img
          src="./assets/text_tool.svg"
          alt=""
          class="h-6 object-contain cursor-pointer"
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.tick)">
        <img
          src="./assets/tick_tool.svg"
          alt=""
          class="h-6 object-contain cursor-pointer"
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.cross)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/cross_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.dot)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/dot_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.circle)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/circle_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.line)">
        <img
          class="w-7 object-contain cursor-pointer"
          src="./assets/line_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.highlight)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/highlight_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.draw)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/draw_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.date)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/date_tool.svg"
          alt=""
        />
      </div>
      <div class="tool-item" @click="setSelectedType(TOOL_TYPE.name)">
        <img
          class="h-6 object-contain cursor-pointer"
          src="./assets/name_tool.svg"
          alt=""
        />
      </div>

      <button
        @click="onSignClick"
        class="
          inline-flex
          items-center
          gap-2
          bg-paperdazgreen-300
          py-1
          pr-1
          pl-2
          text-white text-sm
        "
      >
        Sign
        <span
          class="
            inline-flex
            items-center
            justify-center
            px-2
            py-2
            bg-[#EAEAEA]
            text-paperdazgreen-300
          "
          ><svg
            width="12"
            height="12"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2869 8.24112L14.905 6.85919L9.42629 12.3281V0.400391H7.46611V12.3281L1.9972 6.84939L0.605469 8.24112L8.4462 16.0818L16.2869 8.24112Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <button
        class="
          inline-flex
          items-center
          gap-2
          bg-paperdazgreen-300
          py-1
          pr-1
          pl-2
          tool-item
          text-white text-sm
        "
        @click="setSelectedType(TOOL_TYPE.initial)"
      >
        Initial
        <span
          class="
            inline-flex
            items-center
            justify-center
            px-2
            py-2
            bg-[#EAEAEA]
            text-paperdazgreen-300
          "
          ><svg
            width="12"
            height="12"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2869 8.24112L14.905 6.85919L9.42629 12.3281V0.400391H7.46611V12.3281L1.9972 6.84939L0.605469 8.24112L8.4462 16.0818L16.2869 8.24112Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      <!-- <p @click="signaturePad = !signaturePad">Signature Pad</p> -->

      <button @click="downloadPdf">Download</button>
    </div>

    <pdf-signature-modal
      v-model="showSignatureModal"
      v-if="showSignatureModal"
    />
  </section>
</template>

<script>
import PdfSignatureModal from '../modals/PdfSignatureModal.vue'
import TOOL_TYPE from './data/toolType'
export default {
  components: { PdfSignatureModal },
  data: () => ({
    selectedType: null,
    signaturePad: false,
    showSignatureModal: false,
  }),
  computed: {
    TOOL_TYPE() {
      return TOOL_TYPE
    },
  },
  methods: {
    setSelectedType(type) {
      if (this.selectedType == type) this.selectedType = null
      else this.selectedType = type
      this.$emit('tool-change', this.selectedType)
    },
    downloadPdf() {
      this.$BUS.$emit('download-pdf')
    },
    onSignClick(){
      this.showSignatureModal = true
      this.setSelectedType(this.TOOL_TYPE.signature)
    },
  },
}
</script>

<style lang="scss" scoped></style>
