<template>
  <div class="flex flex-col">
    <h3
      class="text-paperdazgray-700 font-semibold text-xl mb-5 sm:mb-7 flex flex-col gap-3 xs:flex-row xs:items-center justify-between whitespace-nowrap"
    >
      <span>File Ledger</span>
      <form
        action=""
        class="w-full xs:max-w-[280px] text-xs font-medium flex items-center relative"
        @submit.prevent="$event.preventDefault()"
      >
        <input
          type="text"
          class="search-input h-10 pl-4 mr-2 bg-transparent flex-1 border border-paperdazgreen-300 rounded-tl-lg rounded-bl-lg focus:border-paperdazgreen-700 outline-none"
          placeholder="Search Files"
          :value="searchParam"
          @input="searchParam = $event.target.value"
        />
        <button class="circle circle-20 bg-paperdazgreen-300 text-white">
          <search-icon />
        </button>

        <!-- Start:: dropdown -->
        <div
          class="search-dropdown mt-0.5 bg-white rounded-lg whitespace-nowrap overflow-hidden transition transform duration-200 absolute right-0 top-full z-10 shadow-lg w-96 max-w-[80vw]"
          :class="[
            searchParam
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-[5%] pointer-events-none',
          ]"
        >
          <div class="max-h-[60vh] custom-scrollbar overflow-y-auto p-4">
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
        <!-- End:: dropdown -->
      </form>
    </h3>

    <div
      ref="ledgerContainer"
      class="bg-white rounded-2xl flex-1 min-h-[50vh] lg:min-h-[40vh]"
      :class="[
        (files || []).length <= 0 || $fetchState.pending
          ? 'p-5 flex items-center justify-center'
          : 'pb-4 overflow-x-auto custom-scrollbar',
      ]"
    >
      <scribble-icon
        v-if="(files || []).length <= 0"
        v-show="showScribble"
        class="text-paperdazgreen-250 fixed bottom-9 right-20 sm:bottom-10 sm:right-44 h-40 w-40 sm:h-64 sm:w-64 transition ease-in-out duration-200 animate-pulse"
        :class="[
          showScribble
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        ]"
      />

      <!-- <transition name="fade" mode="out-in"> -->
      <div v-if="$fetchState.pending" key="1" class="p-6">
        <spinner-dotted-icon class="text-paperdazgreen-400 animate-spin" />
      </div>
      <!-- Start:: empty file ledger -->
      <div
        key="2"
        v-else-if="(files || []).length <= 0"
        class="text-center flex flex-col items-center justify-between sm:justify-items-start py-8"
      >
        <h4
          class="text-paperdazgray-700 font-semibold text-base sm:text-lg lg:text-xl mb-10"
        >
          Complete file and upload files to earn leaves
        </h4>
        <tree-icon height="88" width="80" class="mb-7" />
        <span class="text-paperdazgray-700 text-sm mb-10 inline-block">
          We will plant a tree in your honor at 25,0000 leaves
        </span>
      </div>

      <!-- End:: empty file ledger -->

      <table key="3" v-else ref="fileLedgerTable" class="file-ledger-table">
        <thead>
          <tr class="text-left">
            <th class="text-center fixed-col left">No</th>
            <th>File Name</th>
            <th class="text-center">Action</th>
            <th class="text-center">Action By</th>
            <th>Date & time</th>
            <th class="fixed-col right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, i) in files" :key="i">
            <td class="text-center fixed-col left">{{ i + 1 }}</td>
            <td>
              <div class="flex items-center gap-1.5">
                <div
                  class="circle circle-17 border border-paperdazgreen-300 p-0.5"
                >
                  <img
                    :src="
                      (file.user || {}).profile_picture ||
                      '/img/placeholder_picture.png'
                    "
                    alt=""
                    class="circle"
                  />
                </div>
                <div>
                  <p class="text-sm font-medium">
                    <nuxt-link :to="`/pdf/${file.id}`">
                      {{ file.file_name }}</nuxt-link
                    >
                  </p>
                  <p class="text-xs">
                    {{
                      (file.user || {}).first_name +
                      ' ' +
                      (file.user || {}).last_name
                    }}
                  </p>
                </div>
              </div>
            </td>
            <td class="text-center">
              {{ file.action || '-' }}
            </td>
            <td class="text-center">
              {{ (file.user || {}).first_name + (file.user || {}).last_name }}
            </td>
            <td>
              {{ formatDateTime(file.updated_at) }}
            </td>
            <td class="fixed-col right">
              <button class="cursor-pointer" @click="shareFile(file)">
                <share-icon class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScribbleIcon from '../svg-icons/ScribbleIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import TreeIcon from '../svg-icons/TreeIcon.vue'
import DateFormatter from '~/utils/DateFormatter'
import ShareIcon from '../svg-icons/ShareIcon.vue'
import SpinnerDottedIcon from '../svg-icons/SpinnerDottedIcon.vue'
import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'

export default Vue.extend({
  components: {
    TreeIcon,
    ScribbleIcon,
    SearchIcon,
    ShareIcon,
    SpinnerDottedIcon,
    HeartOutlineIcon,
    ShareOutlineIcon,
  },

  async fetch() {
    await this.$axios.$get(`/file`).then((response: { files: Array<any> }) => {
      const files = response.files.map((el) => {
        if (!el.user) el.user = this.$auth.user
        return el
      })
      this.files = files
    })
  },
  data() {
    return {
      searchParam: '',
      showScribble: false,
      files: [] as Array<any>,

      scrollObserver: undefined as undefined | any,
    }
  },
  mounted() {
    this.handleShowingLedger()
    this.tableScrollObserver()
  },

  methods: {
    shareFile(file: any) {
      const url = location.origin.replace(/\/+$/, '') + `/pdf/${file.id}`
      navigator.share({
        url,
        title: file.file_name,
      })
    },
    async tableScrollObserver() {
      await this.$nextTick()
      if (this.scrollObserver) {
        try {
          this.scrollObserver.disconnect()
          this.scrollObserver = undefined
        } catch (e) {}
      }
      const options = {
        root: this.$refs.ledgerContainer as Element,
        // root: document,
        rootMargin: '0px',
        threshold: 1.0,
      }

      const self = this
      const callback: IntersectionObserverCallback = (
        entries: IntersectionObserverEntry[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        observer: IntersectionObserver
      ): void => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            entry.target.classList.add('scrolled')
          } else {
            entry.target.classList.remove('scrolled')
          }
        })
      }

      const observer = new IntersectionObserver(callback, options)

      const fixedCols = document.querySelectorAll('.fixed-col')

      fixedCols.forEach((el) => {
        observer.observe(el)
      })

      this.scrollObserver = observer
    },
    formatDateTime(dateVal: string | Date) {
      return `${DateFormatter.getDateString(
        dateVal
      )}  ${DateFormatter.getFormattedTime(dateVal)}`
    },
    handleShowingLedger() {
      const ledgerContainer = this.$refs.ledgerContainer as HTMLElement

      if (!ledgerContainer) return

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

  updated() {
    this.tableScrollObserver()
  },
})
</script>

<style lang="postcss" scoped>
.file-ledger-table {
  @apply text-sm w-full whitespace-nowrap;
  border-collapse: separate;
  border-spacing: 0px 0px;
  & tr {
    @apply border-b border-gray-100;
  }

  & th {
    @apply pt-8 pb-3;
  }

  & td {
    @apply py-3;
  }

  & td,
  & th {
    @apply px-2 border-b border-gray-100;
    &:first-child {
      @apply pl-5;
    }
    &:last-child {
      @apply pr-5;
    }

    &.fixed-col {
      position: sticky;
      background: white;
      &.left {
        left: -0.1px;
        &.scrolled {
          box-shadow: 3px 0px 8px rgb(0 0 0 / 14%);
        }
      }
      &.right {
        right: -0.1px;
        &.scrolled {
          box-shadow: 0px 3px 8px rgb(0 0 0 / 14%);
        }
      }
    }
  }
}

/* .search-input {
  & ~ .search-dropdown {
    @apply opacity-0 translate-y-[5%] pointer-events-none;
  }

  &:active,
  &:focus {
    & ~ .search-dropdown {
      @apply opacity-100 translate-y-0 pointer-events-auto;
    }
  }
} */
</style>
