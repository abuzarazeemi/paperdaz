<template>
  <div class="small-details-card-container">
    <top-details-card
      v-for="tab in tabs"
      :key="tab.key"
      :isActive="tab.key === activeTab"
      @click.native="$emit('updateActiveTab', tab.key)"
    >
      <template #icon>
        <component :is="tab.icon" />
      </template>
      <template #count>{{ tab.count }}</template>
      <template #name>{{ tab.label }}</template>
    </top-details-card>
    <!-- <top-details-card>
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
    </top-details-card> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopDetailsCard from './TopDetailsCard.vue'
export default Vue.extend({
  components: { TopDetailsCard },
  props: {
    // ledger, confirmed, signed, saved, shared
    activeTab: {
      type: String,
      default: '',
    },
    // [{
    //       label: 'Ledger',
    //       key: 'ledger',
    //       count: 896,
    //       icon: NoteAndPenIconVue,
    //     }],
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'activeTab',
    event: 'updateActiveTab',
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
<style lang="postcss" scoped>
.small-details-card-container {
  @apply gap-3 lg:gap-4;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));

  @media screen and (min-width: 425px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
