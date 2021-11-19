<template>
  <div>
    <div class="max-w-[262px]">
      <profile-card />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileCard from '../ProfileCard.vue'
export default Vue.extend({
  name: 'AccountTab',
  components: { ProfileCard },
})
</script>
