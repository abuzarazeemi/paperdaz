<template>
  <div id="bottom-nav" class="bg-white flex items-center text-[#606060]">
    <span class="h-full flex items-center justify-center flex-1 px-1">
      <folder-icon class="w-4 h-4" />
    </span>
    <span class="h-full flex items-center justify-center flex-1 px-1">
      <file-icon class="h-4" />
    </span>
    <span class="h-full flex items-center justify-center flex-1 px-1">
      <home-icon class="h-4" />
    </span>
    <span class="h-full flex items-center justify-center flex-1 px-1">
      <search-icon class="h-4" />
    </span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import FileIcon from '../svg-icons/FileIcon.vue'
import FolderIcon from '../svg-icons/FolderIcon.vue'
import HomeIcon from '../svg-icons/HomeIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
export default Vue.extend({
  name: 'BottomNav',
  components: { FolderIcon, FileIcon, HomeIcon, SearchIcon },
})
</script>

<style scoped>
#bottom-nav {
  box-shadow: 0px -3px 14px rgb(0 0 0 / 11%);
}
</style>
