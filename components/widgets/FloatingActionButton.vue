<template>
  <button class="fab-button">
    <plus-icon class="h-8 w-8 sm:h-12 sm:w-12" />
  </button>
</template>

<script>
import PlusIcon from '../svg-icons/PlusIcon.vue'
export default {
  components: { PlusIcon },
}
</script>

<style lang="postcss" scoped>
.fab-button {
  @apply bg-paperdazgreen-250 text-white
      inline-flex
      fixed
      bottom-12
      right-5
      h-16
      w-16
      sm:bottom-20
      sm:right-20 
      sm:h-20 
      sm:w-20 
      items-center 
      justify-center 
      shadow-lg;
  border-radius: 50%;
}
</style>