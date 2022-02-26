<template>
  <div
    class="landing-page-search-modal custom-scrollbar py-5"
    :class="{ visible: visible }"
  >
    <button class="overlay" @click="$emit('input', false)"></button>
    <section class="container">
      <form class="relative text-xs">
        <input
          type="text"
          class="search-input"
          placeholder="Search by file name or company name or papertag..."
          v-model="searchParam"
        />
        <button
          class="bg-paperdazgreen-400 rounded-lg text-white h-full w-10 grid place-items-center absolute right-0 top-0"
        >
          <search-icon height="18" width="18" class="" />
        </button>
      </form>

      <div
        class="mt-5 bg-white rounded-lg whitespace-nowrap overflow-hidden transition transform duration-200"
        :class="[
          displayingResults.length > 0
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-[5%] pointer-events-none',
        ]"
      >
        <div class="max-h-[70vh] custom-scrollbar overflow-y-auto p-4">
          <article
            class="py-4 text-[#9F9F9F] grid grid-cols-[max-content,1fr,max-content] gap-4"
            v-for="i in 20"
            :key="i"
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
              alt=""
              class="h-16 w-16 rounded-lg object-cover"
            />
            <div class="overflow-hidden">
              <p class="text-sm text-black mb-1 truncate">MyStar@gmail.com</p>
              <p class="text-xs truncate">MyStar</p>
              <p class="text-[11px] mt-0.5 truncate">patient intake</p>
            </div>
            <div class="self-center flex items-center">
              <button class="mr-1.5 pr-1.5 border-[#EBEBEB] border-r">
                <heart-outline-icon />
              </button>
              <button>
                <share-outline-icon />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'
export default Vue.extend({
  components: { SearchIcon, HeartOutlineIcon, ShareOutlineIcon },
  name: 'LandingPageSearchModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'visible',
    event: 'input',
  },
  data() {
    return {
      searchParam: '',
    }
  },
  computed: {
    displayingResults(): Array<any> {
      if (!this.searchParam) return []
      return [{}]
    },
  },
  watch: {
    visible() {
      this.searchParam = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.landing-page-search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: var(--viewport-height, 100vh);
  max-height: var(--viewport-height, 100vh);
  overflow-y: auto;
  z-index: 50;

  backdrop-filter: blur(5px);
  transition: opacity ease-in-out 0.2s;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  & .overlay {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(167, 167, 167, 0.5);
    z-index: 0;
  }
}

.container {
  max-width: 636px !important;
}

.search-input {
  @apply h-10 bg-white shadow rounded-lg w-full  pl-2 pr-14;
}
</style>
