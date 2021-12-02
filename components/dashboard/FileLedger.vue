<template>
  <div class="flex flex-col">
    <h3
      class="
        text-paperdazgray-700
        font-semibold
        text-xl
        mb-4
        sm:mb-7
        flex flex-col
        gap-3
        xs:flex-row xs:items-center
        justify-between
        whitespace-nowrap
      "
    >
      <span>File Ledger</span>

      <form
        action=""
        class="w-full max-w-[280px] text-xs font-medium flex items-center"
      >
        <input
          type="text"
          class="
            h-10
            pl-4
            mr-2
            bg-transparent
            flex-1
            border border-paperdazgreen-300
            rounded-tl-lg rounded-bl-lg
            focus:border-paperdazgreen-700
            outline-none
          "
          placeholder="Search Files"
        />
        <button class="circle circle-20 bg-paperdazgreen-300 text-white">
          <search-icon />
        </button>
      </form>
    </h3>

    <div
      ref="ledgerContainer"
      class="bg-white rounded-2xl flex-1 min-h-[50vh] lg:min-h-[40vh]"
      :class="[
        (files || []).length <= 0
          ? 'p-5 flexitems-center justify-center'
          : ' overflow-x-auto custom-scrollbar',
      ]"
    >
      <!-- Start:: empty file ledger -->
      <div
        v-if="(files || []).length <= 0"
        class="
          text-center
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
        v-if="(files || []).length <= 0"
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
      <!-- End:: empty file ledger -->

      <table class="file-ledger-table">
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
                  <img :src="(file.user || {}).avatar" alt="" class="circle" />
                </div>
                <div>
                  <p class="text-sm font-medium">
                    {{ file.name }}
                  </p>
                  <p class="text-xs">
                    {{ (file.user || {}).name }}
                  </p>
                </div>
              </div>
            </td>
            <td class="text-center">
              {{ file.action }}
            </td>
            <td class="text-center">
              {{ file.action_by }}
            </td>
            <td>
              {{ formatDateTime(file.action_date) }}
            </td>
            <td class="fixed-col right">
              <div class="cursor-pointer">
                <share-icon class="w-4 h-4" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

export default Vue.extend({
  components: { TreeIcon, ScribbleIcon, SearchIcon, ShareIcon },
  data() {
    return {
      showScribble: false,
      files: [
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
        {
          name: 'Good Manufacturing practice',
          action: 'Completed',
          action_by: 'Abdallah hamouda',
          action_date: new Date(),
          user: {
            name: 'Alex Denvikar',
            avatar:
              'http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg',
          },
        },
      ],

      scrollObserver: undefined as undefined | any,
    }
  },
  mounted() {
    this.handleShowingLedger()
    this.tableScrollObserver()
  },
  methods: {
    tableScrollObserver() {
      const options = {
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
</style>
