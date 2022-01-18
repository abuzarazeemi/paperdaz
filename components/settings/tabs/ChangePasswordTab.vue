<template>
  <section
    class="bg-white rounded-2xl px-10 py-11 flex-1 flex items-center justify-center"
  >
    <form class="w-full max-w-2xl mx-auto">
      <h3
        class="flex justify-center text-paperdazgreen-300 border-b-2 border-paperdazgreen-300 font-semibold text-2xl gap-2 pb-1 relative mb-12"
      >
        <span>Change Your Password</span>
        <button
          type="button"
          @click="editingDetails = !editingDetails"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1"
        >
          <pen-icon v-show="!editingDetails" />
          <times-icon v-show="editingDetails" width="16" height="16" />
        </button>
      </h3>

      <div class="mb-7">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >Current Password</label
        >

        <el-input
          placeholder="*******************************"
          show-password
          :disabled="!editingDetails"
        ></el-input>
      </div>
      <div class="mb-7">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >New Password</label
        >
        <el-input
          placeholder="*******************************"
          show-password
          :disabled="!editingDetails"
        ></el-input>
      </div>
      <div class="mb-10">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >Confirm New Password</label
        >
        <el-input
          placeholder="*******************************"
          show-password
          :disabled="!editingDetails"
        ></el-input>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-paperdazgreen-300 text-white rounded-xl h-12 px-5 font-medium text-lg"
          v-show="editingDetails"
        >
          Update Password
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PenIcon from '~/components/svg-icons/PenIcon.vue'
import TimesIcon from '~/components/svg-icons/TimesIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'ChangePasswordTab',
  components: { InputField, PasswordField, PenIcon, TimesIcon },
  data() {
    return {
      editingDetails: false,
    }
  },
})
</script>
