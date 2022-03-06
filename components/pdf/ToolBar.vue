<template>
  <section>
    <div
      class="flex flex-wrap items-center justify-between bg-[#E8EAEC] py-2 w-full gap-x-1 gap-y-2 px-6 text-[#757575] text-base sm:text-2xl"
    >
      <button @click="setSelectedType(TOOL_TYPE.text)" v-if="isComplete">
        <pdf-text-tool-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.tick)" v-if="isComplete">
        <pdf-tick-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.cross)" v-if="isComplete">
        <pdf-times-icon />
      </button>
      <button
        @click="setSelectedType(TOOL_TYPE.dot)"
        v-if="isComplete"
        class="text-base"
      >
        <solid-circle-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.circle)" v-if="isComplete">
        <hollow-circle-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.line)" v-if="isComplete">
        <pdf-rectangle-tool-icon />
      </button>
      <button
        v-if="isComplete"
        @click="setSelectedType(TOOL_TYPE.highlight)"
        class="text-[#FFCF27]"
      >
        <pdf-highlight-tool-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.draw)" v-if="isComplete">
        <pdf-pen-tool-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.date)" v-if="isComplete">
        <calendar-icon />
      </button>
      <button @click="setSelectedType(TOOL_TYPE.name)" v-if="isComplete">
        <user-profile-solid-icon />
      </button>

      <button
        class="text-[#5FA348]"
        @click="setSelectedType(TOOL_TYPE.star)"
        v-if="isComplete"
      >
        <star-icon />
      </button>
      <button
        v-if="isComplete"
        @click="onSignClick"
        class="cursor-pointer inline-flex items-center gap-2 bg-paperdazgreen-300 py-1 pr-1 pl-2 text-white text-sm"
      >
        Sign
        <span
          class="inline-flex items-center justify-center px-2 py-2 bg-[#EAEAEA] text-paperdazgreen-300"
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
        v-if="isComplete"
        class="cursor-pointer inline-flex items-center gap-2 bg-paperdazgreen-300 py-1 pr-1 pl-2 tool-item text-white text-sm"
        @click="onInitialsClick"
      >
        Initial
        <span
          class="inline-flex items-center justify-center px-2 py-2 bg-[#EAEAEA] text-paperdazgreen-300"
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

      <button
        v-if="isCreator"
        @click="downloadPdf"
        class="text-xs text-white bg-paperdazgreen-400 px-2 rounded h-8"
      >
        Download
      </button>

      <button @click="$emit('undo')" class="text-sm">UNDO</button>
    </div>

    <draw-or-type-modal
      v-model="showSignatureModal"
      :src="$auth.user.signature"
      @image-exported="imageExportedLocal($event, true)"
      use-default-button
    />
    <draw-or-type-modal
      v-model="showInitialsModal"
      :src="$auth.user.initials"
      @image-exported="imageExportedLocal($event, false)"
      use-default-button
    />
  </section>
</template>

<script>
import SaveSignatureInitialsMixin from '~/mixins/SaveSignatureInitialsMixin'
import DrawOrTypeModal from '../modals/DrawOrTypeModal.vue'
import CalendarIcon from '../svg-icons/CalendarIcon.vue'
import HollowCircleIcon from '../svg-icons/HollowCircleIcon.vue'
import PdfHighlightToolIcon from '../svg-icons/PdfHighlightToolIcon.vue'
import PdfPenToolIcon from '../svg-icons/PdfPenToolIcon.vue'
import PdfRectangleToolIcon from '../svg-icons/PdfRectangleToolIcon.vue'
import PdfTextToolIcon from '../svg-icons/PdfTextToolIcon.vue'
import PdfTickIcon from '../svg-icons/PdfTickIcon.vue'
import PdfTimesIcon from '../svg-icons/PdfTimesIcon.vue'
import SolidCircleIcon from '../svg-icons/SolidCircleIcon.vue'
import StarIcon from '../svg-icons/StarIcon.vue'
import UserProfileSolidIcon from '../svg-icons/UserProfileSolidIcon.vue'
import TOOL_TYPE from './data/toolType'
export default {
  components: {
    DrawOrTypeModal,
    PdfTextToolIcon,
    PdfTickIcon,
    PdfTimesIcon,
    SolidCircleIcon,
    HollowCircleIcon,
    PdfRectangleToolIcon,
    PdfHighlightToolIcon,
    PdfPenToolIcon,
    CalendarIcon,
    UserProfileSolidIcon,
    StarIcon,
  },
  mixins: [SaveSignatureInitialsMixin],
  data: () => ({
    selectedType: null,

    components: { PdfTextToolIcon },
    signaturePad: false,
    showSignatureModal: false,
    showInitialsModal: false,
  }),
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    TOOL_TYPE() {
      return TOOL_TYPE
    },
    isCreator() {
      try {
        return this.file.user.id === this.$auth.user.id
      } catch (e) {
        return false
      }
    },
    isConfirm() {
      return String(this.file.action).toLowerCase() === 'confirm'
    },
    isComplete() {
      return String(this.file.action).toLowerCase() === 'complete'
    },
    isSign() {
      return String(this.file.action).toLowerCase() === 'sign'
    },
  },
  methods: {
    imageExportedLocal(image, isSignature) {
      this.$BUS.$emit(
        isSignature ? 'signature-update' : 'initials-update',
        image
      )
      this.imageExported(image, isSignature)
    },
    setSelectedType(type) {
      if (this.selectedType == type) this.selectedType = null
      else this.selectedType = type
      this.$emit('tool-change', this.selectedType)
    },
    downloadPdf() {
      this.$BUS.$emit('download-pdf')
    },
    onSignClick() {
      this.showSignatureModal = true
      this.setSelectedType(this.TOOL_TYPE.signature)
    },
    onInitialsClick() {
      this.showInitialsModal = true
      this.setSelectedType(this.TOOL_TYPE.initial)
    },
  },
}
</script>

<style lang="scss" scoped></style>
