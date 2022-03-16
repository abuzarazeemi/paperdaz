<template>
  <div>
    <!-- Start:: header -->
    <header class="flex items-center flex-wrap gap-4 justify-between mb-6">
      <h5
        class="text-lg font-semibold text-[#272727] inline-flex items-center gap-2"
      >
        Company Files <company-icon />
      </h5>
      <div class="text-white flex items-center">
        <form
          action=""
          class="w-full xs:max-w-[280px] text-xs font-medium flex items-center relative justify-end mr-2"
          @submit.prevent="$event.preventDefault()"
        >
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <input
                type="text"
                class="search-input h-10 pl-4 mr-2 bg-transparent flex-1 border border-paperdazgreen-300 rounded-lg focus:border-paperdazgreen-700 outline-none"
                placeholder="Search Files"
                :value="searchParam"
                @input="searchParam = $event.target.value"
              />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- Start:: dropdown -->
              <div
                class="bg-white rounded-lg whitespace-nowrap w-[600px] max-w-[80vw]"
              >
                <div class="max-h-[40vh] custom-scrollbar overflow-y-auto p-4">
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
                      <p class="text-sm text-black mb-1 truncate">
                        MyStar@gmail.com
                      </p>
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
            </el-dropdown-menu>
          </el-dropdown>
          <button class="circle circle-18 bg-paperdazgreen-400 text-white">
            <search-icon width="16" height="16" />
          </button>
        </form>
        <button class="circle circle-18 bg-paperdazgreen-400 text-3xl">
          <folder-plus-icon />
        </button>
      </div>
    </header>
    <!-- End:: header -->

    <transition name="fade" mode="out-in" :duration="100">
      <empty-file-ledger class="min-h-[55vh]" v-if="false" />
      <div
        v-else
        class="bg-white rounded-3xl py-4 grid place-items-center text-[#272727] min-h-[55vh]"
      ></div>
    </transition>

    <floating-action-button @click.native="showUploadDocumentModal = true" />
    <upload-document-modal v-model="showUploadDocumentModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadDocumentModal from '../dashboard/UploadDocumentModal.vue'
import CompanyIcon from '../svg-icons/CompanyIcon.vue'
import FolderPlusIcon from '../svg-icons/FolderPlusIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import EmptyFileLedger from '../widgets/EmptyFileLedger.vue'
import FloatingActionButton from '../widgets/FloatingActionButton.vue'
export default Vue.extend({
  components: {
    EmptyFileLedger,
    FloatingActionButton,
    UploadDocumentModal,
    SearchIcon,
    CompanyIcon,
    FolderPlusIcon,
  },
  name: 'CompanyFileLedger',
  data() {
    return {
      showUploadDocumentModal: false,
      searchParam: '',
    }
  },
})
</script>
