<template>
  <div class="py-2 flex items-center text-black gap-4">
    <div
      class="flex items-center gap-4 flex-1 justify-between max-w-4xl px-4 text-sm"
    >
      <span v-if="!isCreator" class="capitalize">{{ file.action }}</span>
      <el-dropdown
        v-else
        trigger="click"
        class="font-medium"
        @command="handleActionChange"
      >
        <span class="el-dropdown-link capitalize">
          {{ file.action }} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="complete"
            :disabled="file.action == 'complete'"
            >Complete</el-dropdown-item
          >
          <el-dropdown-item
            command="confirm"
            :disabled="file.action == 'confirm'"
            >Confirm</el-dropdown-item
          >
          <el-dropdown-item command="sign" :disabled="file.action == 'sign'"
            >Sign</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click" class="font-medium">
        <span class="el-dropdown-link">
          Private <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Private</el-dropdown-item>
          <el-dropdown-item>Public</el-dropdown-item>
          <el-dropdown-item>Do not Post</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <div
        class="flex-1 flex items-center gap-5 justify-end text-xs font-medium"
      > -->
      <span class="hidden md:inline">Ajinomotojobapplication</span>

      <span class="hidden md:inline">
        <span class="circle circle-2 bg-[#757575]"></span>
      </span>

      <span class="hidden md:inline">{{
        `${file.user.first_name} ${file.user.last_name}`
      }}</span>

      <span class="hidden md:inline">
        <span class="circle circle-2 bg-[#757575]"></span>
      </span>

      <span class="hidden md:inline">05.08.2021 10:04 </span>

      <el-dropdown
        trigger="click"
        class="font-medium"
        @command="handleCommand($event)"
      >
        <span class="el-dropdown-link text-[#555454] px-1 flex items-center">
          <ellipsis-icon-vertical-icon />
        </span>
        <el-dropdown-menu slot="dropdown" class="text-black">
          <el-dropdown-item command="save">
            <button
              class="text-xs text-white bg-paperdazgreen-400 rounded px-5 h-7 w-[130px]"
            >
              Save
            </button>
          </el-dropdown-item>
          <el-dropdown-item command="save">
            <button
              class="px-2 w-[130px] rounded flex items-center justify-center bg-gray-600 py-1.5 text-white"
            >
              <export-icon />
            </button>
          </el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item command="share" divided>
            <div class="flex items-center gap-2">
              <share-icon width="16" height="16" /> Share
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="request">
            <div class="flex items-center gap-2">
              <request-icon width="16" height="16" /> Request
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="papertag">
            <div class="flex items-center gap-2">
              <span class="font-medium">#</span>
              Paper tag
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="carbon-copy">
            <div class="flex items-center gap-2">
              <copy-icon width="16" height="16" /> Carbon Copy
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="remove">
            <div class="flex items-center gap-2">
              <trash-can-icon width="16" height="16" /> Remove
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- </div> -->
    </div>

    <div class="lg:flex items-center hidden">
      <button
        class="mr-2 text-xs text-white bg-paperdazgreen-400 rounded px-5 h-7"
      >
        Save
      </button>
      <button class="px-2">
        <export-icon />
      </button>
    </div>

    <pdf-share-modal :file="file" v-model="showShareModal" />
    <pdf-request-modal :file="file" v-model="showRequestModal" />
    <pdf-c-c-flow-modal :file="file" v-model="showCCFlowModal" />
    <pdf-papertags-modal :file="file" v-model="showPapertagsModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EllipsisIconVerticalIcon from '../svg-icons/EllipsisIconVerticalIcon.vue'
import ExportIcon from '../svg-icons/ExportIcon.vue'
import _ from 'lodash'
import ShareIcon from '../svg-icons/ShareIcon.vue'
import RequestIcon from '../svg-icons/RequestIcon.vue'
import CopyIcon from '../svg-icons/CopyIcon.vue'
import TrashCanSolidIcon from '../svg-icons/TrashCanSolidIcon.vue'
import TrashCanIcon from '../svg-icons/TrashCanIcon.vue'
import PdfShareModal from './modals/PdfShareModal.vue'
import PdfCCFlowModal from './modals/PdfCCFlowModal.vue'
import PdfPapertagsModal from './modals/PdfPapertagsModal.vue'

export default Vue.extend({
  components: {
    EllipsisIconVerticalIcon,
    ExportIcon,
    ShareIcon,
    RequestIcon,
    CopyIcon,
    TrashCanSolidIcon,
    TrashCanIcon,
    PdfShareModal,
    PdfCCFlowModal,
    PdfPapertagsModal,
  },
  name: 'PdfPageActionTray',
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showShareModal: false,
      showRequestModal: false,
      showCCFlowModal: false,
      showPapertagsModal: false,
    }
  },
  computed: {
    isCreator() {
      try {
        return this.file.user.id === this.$auth.user?.id
      } catch (e) {
        return false
      }
    },
  },
  methods: {
    handleActionChange(command: string) {
      const fileTemp = { ...this.file }
      fileTemp.action = command
      this.$emit('update-file', fileTemp)
    },
    handleCommand(command: string) {
      switch (String(command).toLowerCase()) {
        case 'share':
          // @ts-ignore
          this.showShareModal = true
          break
        case 'request':
          // @ts-ignore
          this.showRequestModal = true
          break
        case 'carbon-copy':
          // @ts-ignore
          this.showCCFlowModal = true
          break
        case 'papertag':
          // @ts-ignore
          this.showPapertagsModal = true
          break
      }
    },
  },
})
</script>
