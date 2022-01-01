<template>
  <div
    class="
      px-4
      h-12
      flex
      items-center
      border-b border-gray-400
      text-black
      gap-4
    "
  >
    <div class="flex items-center gap-4 flex-1 justify-between max-w-4xl">
      <el-dropdown trigger="click" class="font-medium">
        <span class="el-dropdown-link">
          Complete <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click" class="font-medium">
        <span class="el-dropdown-link">
          Public <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div
        class="flex-1 flex items-center gap-5 justify-end text-xs font-medium"
      >
        <span>Ajinomotojobapplication</span>

        <span class="circle circle-2 bg-[#757575]"></span>

        <span>Akay Devakr</span>

        <span class="circle circle-2 bg-[#757575]"></span>

        <span>05.08.2021 10:04 </span>

        <el-dropdown trigger="click" class="font-medium">
          <span class="el-dropdown-link text-[#555454] px-1 flex items-center">
            <ellipsis-icon-vertical-icon />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <button
                class="text-xs text-white bg-paperdazgreen-400 rounded px-5 h-7"
              >
                Save
              </button>
            </el-dropdown-item>
            <el-dropdown-item>
              <button
                class="
                  px-2
                  w-[70px]
                  rounded
                  flex
                  items-center
                  justify-center
                  bg-gray-600
                  py-1.5
                  text-white
                "
              >
                <export-icon />
              </button>
            </el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="flex items-center">
      <button
        class="mr-2 text-xs text-white bg-paperdazgreen-400 rounded px-5 h-7"
      >
        Save
      </button>
      <button class="px-2">
        <export-icon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EllipsisIconVerticalIcon from '../svg-icons/EllipsisIconVerticalIcon.vue'
import ExportIcon from '../svg-icons/ExportIcon.vue'
export default Vue.extend({
  components: { EllipsisIconVerticalIcon, ExportIcon },
  name: 'PdfPageActionTray',
})
</script>
