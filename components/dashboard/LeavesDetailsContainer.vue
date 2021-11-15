<template>
  <div class="leaves-details-container">
    <div>
      <div class="inline-flex gap-4 items-center">
        <single-leaf-icon />
        <span class="text-paperdazgray-500 font-medium">700 leaves</span>
      </div>
    </div>
    <div>
      <div class="inline-flex gap-4 items-center">
        <multiple-leaf-1-icon />
        <span class="text-paperdazgray-500 font-medium"
          >20 leaves per file</span
        >
      </div>
    </div>
    <div>
      <div class="inline-flex gap-4 items-center">
        <two-leaves-icon />
        <span class="text-paperdazgray-500 font-medium"
          >5 leaves per share</span
        >
      </div>
    </div>
    <div>
      <div class="inline-flex gap-4 items-center">
        <tree-icon />
        <span class="text-paperdazgray-500 font-medium flex flex-col">
          <span>25,000 leaves</span>
          <span class="whitespace-nowrap">Plant a tree in your honor</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MultipleLeaf1Icon from '../svg-icons/MultipleLeaf1Icon.vue'
import SingleLeafIcon from '../svg-icons/SingleLeafIcon.vue'
import TreeIcon from '../svg-icons/TreeIcon.vue'
import TwoLeavesIcon from '../svg-icons/TwoLeavesIcon.vue'
export default {
  components: { SingleLeafIcon, MultipleLeaf1Icon, TwoLeavesIcon, TreeIcon },
}
</script>

<style lang="postcss" scoped>
.leaves-details-container {
  @apply bg-white p-4 rounded-xl flex flex-wrap;
  & > * {
    @apply px-4 py-2 flex-1 flex items-center justify-center;
    border-right: 1px solid #e3e3e3;
    &:last-child {
      border-right: none;
    }
  }
}
</style>