<template>
  <div class="flex flex-col">
    <h3 class="text-paperdazgray-700 font-semibold text-xl mb-7">
      File Ledger
    </h3>

    <!-- Start:: empty file ledger -->
    <div
      class="
        bg-white
        p-5
        rounded-2xl
        flex-1 flex
        items-center
        justify-center
        text-center
      "
    >
      <div class="flex flex-col items-center">
        <h4 class="text-paperdazgray-700 font-semibold text-xl mb-10">
          Complete file and upload files to earn leaves
        </h4>
        <tree-icon height="88" width="80" class="mb-7" />
        <span class="text-paperdazgray-700 text-sm mb-10 inline-block">
          We will plant a tree in your honor at 25,0000 leaves
        </span>
      </div>
      <scribble-icon
        class="
          text-paperdazgreen-250
          fixed
          bottom-3
          right-20
          sm:bottom-10 sm:right-44
          h-40
          w-40
          sm:h-64 sm:w-64
        "
      />
    </div>
    <!-- End:: empty file ledger -->
  </div>
</template>

<script>
import ScribbleIcon from '../svg-icons/ScribbleIcon.vue'
import TreeIcon from '../svg-icons/TreeIcon.vue'
export default {
  components: { TreeIcon, ScribbleIcon },
}
</script>

<style>
</style>