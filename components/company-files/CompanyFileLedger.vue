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
        <button class="circle circle-18 bg-paperdazgreen-400 text-xl">
          <folder-plus-icon />
        </button>
      </div>
    </header>
    <!-- End:: header -->

    <transition name="fade" mode="out-in" :duration="100">
      <empty-file-ledger class="min-h-[55vh]" v-if="false" />
      <div
        v-else
        class="bg-white rounded-3xl pb-4 text-[#272727] min-h-[55vh] overflow-hidden"
      >
        <!-- Start:: Folders -->
        <h4
          class="text-xl text-paperdazgreen-400 font-medium px-5 border-b border-gray-100 h-16 flex items-center"
        >
          Folders
        </h4>
        <div class="overflow-x-auto custom-scrollbar">
          <table class="custom-table">
            <thead class="text-[#414142]">
              <tr>
                <th class="w-12 text-left">Folder Name</th>
                <th class="text-center">Date &amp; Time</th>
                <th class="text-center">Files</th>
                <th class="text-center fixed-col right"></th>
              </tr>
            </thead>
            <tbody class="text-[#505050]">
              <tr v-for="i in 3" :key="i">
                <td class="text-left">
                  <div
                    class="flex items-center gap-3 whitespace-nowrap min-w-[150px] max-w-[400px]"
                  >
                    <span
                      class="circle circle-17 p-0.5 border border-paperdazgreen-400"
                    >
                      <img
                        src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
                        class="circle object-cover"
                        alt=""
                      />
                    </span>
                    <div class="overflow-hidden">
                      <p class="text-base font-medium text-[#414142] truncate">
                        Hippa Froms
                      </p>
                      <p class="text-xs text-[#878686] truncate">
                        Alex Devikar
                      </p>
                    </div>
                  </div>
                </td>
                <td class="text-center">04/04/20 &nbsp; 05:35</td>
                <td class="text-sm text-center">2</td>
                <td class="fixed-col right w-[50px]">
                  <div class="w-full h-full grid place-items-center">
                    <el-dropdown trigger="click">
                      <button class="el-dropdown-link px-3">
                        <ellipsis-icon-vertical-icon />
                      </button>
                      <el-dropdown-menu
                        slot="dropdown"
                        class="table-menu-dropdown-menu"
                      >
                        <ul class="min-w-[150px]">
                          <li class="dropdown-item"><span>Edit</span></li>
                          <li class="dropdown-item"><span>Remove</span></li>
                        </ul>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End:: Folders -->

        <!-- Start:: Files -->
        <h4
          class="text-xl text-paperdazgreen-400 font-medium px-5 border-b border-gray-100 h-16 flex items-center"
        >
          Files
        </h4>
        <div class="overflow-x-auto custom-scrollbar">
          <table class="custom-table">
            <thead class="text-[#414142]">
              <tr>
                <th class="w-12 text-left fixed-col left">No</th>
                <th class="text-left">File name</th>
                <th class="text-center">Action required</th>
                <th class="text-center">Privacy</th>
                <th class="text-center">Date &amp; Time</th>
                <th class="text-center fixed-col right"></th>
              </tr>
            </thead>
            <tbody class="text-[#505050]">
              <tr v-for="i in 3" :key="i">
                <td class="fixed-col left">{{ i }}</td>
                <td class="text-left">
                  <div
                    class="flex items-center gap-3 whitespace-nowrap min-w-[150px] max-w-[400px]"
                  >
                    <span
                      class="circle circle-17 p-0.5 border border-paperdazgreen-400"
                    >
                      <img
                        src="http://greginhollywood.com/wordpress/wp-content/uploads/ee92ba015561f1657763d72c60b87013.jpg"
                        class="circle object-cover"
                        alt=""
                      />
                    </span>
                    <div class="overflow-hidden">
                      <p class="text-base font-medium text-[#414142] truncate">
                        Good Manufacturing practice
                      </p>
                      <p class="text-xs text-[#878686] truncate">
                        Alex Devikar
                      </p>
                    </div>
                  </div>
                </td>
                <td class="text-sm text-center">Complete</td>
                <td class="text-sm text-center">Public</td>
                <td class="text-center">04/04/20 &nbsp; 05:35</td>
                <td class="fixed-col right w-[50px]">
                  <div class="w-full h-full grid place-items-center">
                    <el-dropdown>
                      <button class="el-dropdown-link px-3">
                        <ellipsis-icon-vertical-icon />
                      </button>
                      <el-dropdown-menu
                        slot="dropdown"
                        class="table-menu-dropdown-menu"
                      >
                        <ul class="min-w-[150px]">
                          <li class="dropdown-item"><span>Share</span></li>
                          <li class="dropdown-item"><span>Request</span></li>
                          <li class="dropdown-item"><span>Remove</span></li>
                        </ul>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End:: Files -->
      </div>
    </transition>

    <floating-action-button @click.native="showUploadDocumentModal = true" />
    <upload-document-modal v-model="showUploadDocumentModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadDocumentModal from '../dashboard/UploadDocumentModal.vue'
import CompanyIcon from '../svg-icons/CompanyIcon.vue'
import EllipsisIconVerticalIcon from '../svg-icons/EllipsisIconVerticalIcon.vue'
import FolderPlusIcon from '../svg-icons/FolderPlusIcon.vue'
import HeartOutlineIcon from '../svg-icons/HeartOutlineIcon.vue'
import SearchIcon from '../svg-icons/SearchIcon.vue'
import ShareOutlineIcon from '../svg-icons/ShareOutlineIcon.vue'
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
    EllipsisIconVerticalIcon,
    HeartOutlineIcon,
    ShareOutlineIcon,
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

<style lang="scss" scoped>
.custom-table th {
  padding-top: 20px;
}
</style>
