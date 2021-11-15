<template>
  <div class="details-card">
    <span class="icon-container">
      <slot name="icon">
        <note-and-pen-icon />
      </slot>
    </span>
    <div class="text-content inline-flex flex-col justify-between items-end">
      <span class="text-black font-bold text-2xl">
        <slot name="count">800</slot>
      </span>
      <span class="font-medium text-paperdazgray-200 text-xs"
        ><slot name="name">Ledger</slot></span
      >
    </div>
  </div>
</template>

<script>
import NoteAndPenIcon from '../svg-icons/NoteAndPenIcon.vue'
export default {
  components: { NoteAndPenIcon },
}
</script>

<style lang="postcss" scoped>
.details-card {
  @apply bg-white rounded-2xl flex justify-between items-center;
  padding: 16px 14px;
  border: 0.97221px solid rgba(119, 181, 80, 0.15);
}

.icon-container {
  @apply h-12
            w-12
            rounded-md
            bg-paperdazgreen-50 bg-opacity-50
            inline-flex
            items-center
            justify-center
            text-paperdazgreen-500;
}
</style>