<template>
  <div class="small-details-card-container">
    <top-details-card>
      <template #icon><note-and-pen-icon /></template>
      <template #count>896</template>
      <template #name>Ledger</template>
    </top-details-card>
    <top-details-card>
      <template #icon><page-icon /></template>
      <template #count>25</template>
      <template #name>Completed</template>
    </top-details-card>
    <top-details-card>
      <template #icon><tick-circle-icon /></template>
      <template #count>25</template>
      <template #name>Confirmed</template>
    </top-details-card>
    <top-details-card>
      <template #icon><note-and-pen-icon /></template>
      <template #count>25</template>
      <template #name>Signed</template>
    </top-details-card>
    <top-details-card>
      <template #icon><disket-icon /></template>
      <template #count>25</template>
      <template #name>Saved</template>
    </top-details-card>
    <top-details-card>
      <template #icon><share-icon /></template>
      <template #count>25</template>
      <template #name>Shared</template>
    </top-details-card>
  </div>
</template>

<script>
import DisketIcon from '../svg-icons/DisketIcon.vue'
import NoteAndPenIcon from '../svg-icons/NoteAndPenIcon.vue'
import PageIcon from '../svg-icons/PageIcon.vue'
import ShareIcon from '../svg-icons/ShareIcon.vue'
import TickCircleIcon from '../svg-icons/TickCircleIcon.vue'
import TopDetailsCard from './TopDetailsCard.vue'
export default {
  components: {
    TopDetailsCard,
    PageIcon,
    NoteAndPenIcon,
    TickCircleIcon,
    DisketIcon,
    ShareIcon,
  },
}
</script>
<style lang="postcss" scoped>
.small-details-card-container {
  @apply gap-4;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(174px, 1fr));
}
</style>