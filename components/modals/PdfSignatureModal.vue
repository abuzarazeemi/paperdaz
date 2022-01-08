<template>
  <el-dialog
    :visible.sync="showModal"
    :appendToBody="true"
    style=""
    :showClose="false"
    center
  >
    <template #title>
      <div class="tab-container">
        <button
          class="tab-button"
          v-for="tab in tabs"
          :key="tab.value"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </template>

    <!-- Body -->
    <div class="w-full">
      <transition mode="out-in" name="fade" :duration="200">
        <component
          ref="activeTabComponent"
          @export-image="imageExported($event)"
          :is="activeTabComponent"
        />
      </transition>
    </div>
    <!-- End:: Body -->

    <!-- Start:: Footer section -->
    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <button
          class="h-9 rounded border border-gray-100 text-xs px-5 bg-black text-white hover:shadow"
          @click="clear"
        >
          CLEAR
        </button>
        <div class="flex items-center justify-end gap-4">
          <button
            class="h-9 rounded border border-gray-100 text-paperdazgreen-300 text-xs px-3 bg-white hover:shadow"
            @click="closeModal"
          >
            CANCEL
          </button>
          <button
            class="h-9 rounded border border-gray-100 bg-paperdazgreen-300 text-xs text-white px-4 hover:shadow"
            @click="exportImage"
          >
            SAVE
          </button>
        </div>
      </div>
    </template>
    <!-- End:: Footer section -->
    <!-- End:: Body -->
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import SignatureDrawBodyTab from './pdfsignature/SignatureDrawBodyTab.vue'
import SignatureTypeBodyTabVue from './pdfsignature/SignatureTypeBodyTab.vue'
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

      activeTab: 'draw',
      tabs: [
        {
          label: 'Draw',
          value: 'draw',
          component: SignatureDrawBodyTab,
        },
        {
          label: 'Type',
          value: 'type',
          component: SignatureTypeBodyTabVue,
        },
      ],
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
  },
  computed: {
    activeTabComponent(): any {
      const activeTab = this.tabs.find((el) => el.value === this.activeTab)

      if (activeTab && activeTab.component) {
        return activeTab.component
      }

      return {
        render(h: any) {
          return h('h1', 'Not Implemented')
        },
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('updateVisibility', false)
    },

    clear() {
      const activeTabComponent = this.$refs.activeTabComponent as any

      if (!activeTabComponent) return
      activeTabComponent.clear()
    },

    exportImage() {
      const activeTabComponent = this.$refs.activeTabComponent as any

      if (!activeTabComponent) return
      activeTabComponent.exportImage()
    },

    imageExported(image: any) {
      if (!image) return
      //TODO: replace the second 'signature-update' with the initials event name
      const busEvent =
        this.activeTab === 'draw' ? 'signature-update' : 'signature-update'

      // @ts-ignore
      this.$BUS.$emit(busEvent, image)
      this.$notify.success({
        title: 'Pdf Annotation',
        message: `${
          this.activeTab === 'draw' ? 'Signature' : 'Initials'
        } updated`,
      })
      this.closeModal()
    },
  },
})
</script>

<style scoped>
* >>> .el-dialog {
  width: 500px !important;
  max-width: 95% !important;
  border-radius: 20px !important;
  border-radius: 8px !important;
  position: relative !important;
  overflow: hidden;
  background: #f6f6f6;
}
* >>> .el-dialog__header {
  padding: 0;
}

* >>> .el-dialog__header,
* >>> .el-dialog__footer {
  text-align: left !important;
  padding-top: 0;
}

/* * >>> .el-dialog__body { */
/* padding-top: 0 !important;
  padding-bottom: 0 !important; */
/* background: #fcfcfd; */
/* } */

* >>> .el-select .el-input__inner {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>

<style lang="postcss" scoped>
.tab-container {
  @apply w-full flex border-b border-paperdazgreen-400/30;
}

.tab-button {
  @apply bg-[#858383]/80 text-white tracking-wider font-medium text-sm flex-1 px-2 py-3 transition  hover:bg-[#858383] border-none relative;
  &:not(:last-child)::after {
    @apply bg-paperdazgreen-400/30;
    content: '';
    position: absolute;
    height: 80%;
    width: 1px;
    top: 50%;
    right: 0;

    transform: translate(50%, -50%);
  }
  &.active {
    @apply text-white bg-paperdazgreen-400/80;
  }
}
</style>
