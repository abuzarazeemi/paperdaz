<template>
  <el-dialog
    :visible.sync="showModal"
    :append-to-body="true"
    style=""
    :show-close="false"
    center
    class="relative text-[#414042]"
  >
    <!--Start:: Close Button -->
    <div class="absolute -top-3 -right-3" style="padding: inherit">
      <span
        class="circle circle-12 bg-white cursor-pointer text-red-600"
        @click="closeModal()"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.975489L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.975489 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.975489C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.975489 0.167368L4 3.19188Z"
            fill="#414042"
          />
        </svg>
      </span>
    </div>
    <!--End:: Close Button -->
    <template #title>
      <h4
        class="text-center font-semibold text-xl text-paperdazgreen-400 border-b border-paperdazgreen-400 pb-2"
      >
        Additional Features
      </h4>
    </template>
    <!-- Start:: Body -->
    <div class="w-full overflow-x-auto custom-scrollbar">
      <table class="custom-table w-full">
        <tbody>
          <tr>
            <td>Paperlink</td>
            <td class="">$1.00</td>
            <td class="w-[150px]">
              <el-input-number size="small" :min="0" />
            </td>
          </tr>
          <tr>
            <td>Team Member</td>
            <td class="">$1.00</td>
            <td class="w-[150px]">
              <el-input-number size="small" :min="0" />
            </td>
          </tr>
          <tr>
            <td>CC Flow</td>
            <td class="">$1.00</td>
            <td class="w-[150px]">
              <el-input-number size="small" :min="0" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid place-items-center mt-10">
      <button
        class="text-white bg-paperdazgreen-400 px-5 h-8 text-sm rounded shadow"
      >
        Save
      </button>
    </div>
    <!-- end :: body -->
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AdditionalFeatureModal',
  model: {
    prop: 'visible',
    event: 'updateVisibility',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  watch: {
    visible(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('updateVisibility', val)
    },
  },
  mounted() {
    this.showModal = this.visible
  },
  methods: {
    closeModal() {
      this.$emit('updateVisibility', false)
    },
  },
})
</script>

<style scoped>
* >>> .el-dialog {
  width: 600px !important;
  max-width: 95% !important;
  border-radius: 20px !important;
  border-radius: 8px !important;
  position: relative !important;
  overflow: hidden;
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
