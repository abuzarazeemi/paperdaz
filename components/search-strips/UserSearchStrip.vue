<template>
  <article
    class="py-4 text-[#9F9F9F] grid grid-cols-[max-content,1fr,max-content] gap-4 items-center"
  >
    <img
      :src="record.profile_picture || `/img/placeholder_picture.png`"
      alt=""
      class="circle circle-32 rounded-lg object-cover"
    />
    <div class="overflow-hidden">
      <p class="text-sm text-black mb-1 truncate">{{ record.email }}</p>
      <p class="text-xs truncate">
        {{ record.first_name }} {{ record.last_name }}
      </p>
      <!-- <p class="text-[11px] mt-0.5 truncate">patient intake</p> -->
    </div>
    <div class="self-center flex items-center">
      <button
        class="mr-1.5 pr-1.5 border-[#EBEBEB] border-r"
        v-if="$auth.loggedIn"
      >
        <heart-outline-icon />
      </button>
      <button>
        <share-outline-icon />
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'
export default Vue.extend({
  components: { HeartOutlineIcon, ShareOutlineIcon },
  name: 'UserSearchStrip',
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
})
</script>
