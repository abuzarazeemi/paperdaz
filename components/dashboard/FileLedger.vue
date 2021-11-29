<template>
  <div class="flex flex-col">
    <h3 class="text-paperdazgray-700 font-semibold text-xl mb-4 sm:mb-7">
      File Ledger
    </h3>

    <!-- Start:: empty file ledger -->
    <div
      ref="ledgerContainer"
      class="
        bg-white
        p-5
        rounded-2xl
        flex-1 flex
        items-center
        justify-center
        text-center
        min-h-[50vh]
        lg:min-h-[40vh]
      "
    >
      <div
        class="
          flex flex-col
          items-center
          justify-between
          sm:justify-items-start
        "
      >
        <h4
          class="
            text-paperdazgray-700
            font-semibold
            text-base
            sm:text-lg
            lg:text-xl
            mb-10
          "
        >
          Complete file and upload files to earn leaves
        </h4>
        <tree-icon height="88" width="80" class="mb-7" />
        <span class="text-paperdazgray-700 text-sm mb-10 inline-block">
          We will plant a tree in your honor at 25,0000 leaves
        </span>
      </div>
      <scribble-icon
        v-show="showScribble"
        class="
          text-paperdazgreen-250
          fixed
          bottom-9
          right-20
          sm:bottom-10 sm:right-44
          h-40
          w-40
          sm:h-64 sm:w-64
          transition
          ease-in-out
          duration-200
          animate-pulse
        "
        :class="[
          showScribble
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        ]"
      />
    </div>
    <!-- End:: empty file ledger -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScribbleIcon from '../svg-icons/ScribbleIcon.vue'
import TreeIcon from '../svg-icons/TreeIcon.vue'
export default Vue.extend({
  components: { TreeIcon, ScribbleIcon },
  data() {
    return {
      showScribble: false,
    }
  },
  mounted() {
    this.handleShowingLedger()
  },
  methods: {
    handleShowingLedger() {
      const ledgerContainer = this.$refs.ledgerContainer as HTMLElement
      const options = {
        root: null,
        threshold: 0.75,
        rootMargin: '0px',
      }
      const callback: IntersectionObserverCallback = (
        entries: Array<IntersectionObserverEntry>,
        _observer: IntersectionObserver
      ) => {
        entries.forEach((entry) => {
          if (entry.target === ledgerContainer) {
            if (entry.isIntersecting) {
              this.showScribble = true
            } else {
              this.showScribble = false
            }
          }
        })
      }
      const observer = new IntersectionObserver(callback, options)

      observer.observe(ledgerContainer)
    },
  },
})
</script>

<style></style>
