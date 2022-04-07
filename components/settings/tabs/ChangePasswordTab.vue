<template>
  <section
    class="bg-white rounded-2xl px-10 py-11 flex-1 flex items-center justify-center"
  >
    <form class="w-full max-w-2xl mx-auto" @submit.prevent="submit">
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
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          show-password
          required
          v-model="formData.old_password"
          :disabled="!editingDetails || loading"
        ></el-input>
      </div>
      <div class="mb-7">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >New Password</label
        >
        <el-input
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          show-password
          required
          v-model="formData.new_password"
          :disabled="!editingDetails || loading"
        ></el-input>
      </div>
      <div class="mb-10">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >Confirm New Password</label
        >
        <el-input
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          show-password
          required
          v-model="formData.confirm_password"
          :disabled="!editingDetails || loading"
        ></el-input>
        <small
          class="text-red-600 text-xs"
          v-show="
            editingDetails &&
            formData.new_password &&
            formData.confirm_password &&
            formData.new_password !== formData.confirm_password
          "
          >Password fields don't match
        </small>
      </div>

      <message-alert-widget
        :message="alertMessage.message"
        v-show="alertMessage.message && editingDetails"
        :type="alertMessage.isSuccess ? 'success' : 'error'"
        class="mb-8"
      />
      <div class="flex justify-center">
        <button
          class="disabled:opacity-50 disabled:cursor-not-allowed bg-paperdazgreen-300 text-white rounded-xl h-12 px-5 font-medium text-lg"
          v-show="editingDetails"
          :disabled="loading"
        >
          <span class="inline-flex gap-2 items-center">
            Update Password
            <span class="inline-block" v-show="loading && editingDetails">
              <spinner-dotted-icon
                class="animate-spin"
                height="18"
                width="18"
              />
            </span>
          </span>
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PenIcon from '~/components/svg-icons/PenIcon.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import TimesIcon from '~/components/svg-icons/TimesIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'ChangePasswordTab',
  components: {
    InputField,
    PasswordField,
    PenIcon,
    TimesIcon,
    SpinnerDottedIcon,
    MessageAlertWidget,
  },
  data() {
    return {
      editingDetails: false,
      loading: false,
      formData: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      alertMessage: {
        isSuccess: false,
        message: '',
      },
    }
  },
  methods: {
    submit(event: Event) {
      event.preventDefault()

      if (
        this.loading ||
        !this.formData.old_password ||
        !this.formData.new_password ||
        !this.formData.confirm_password ||
        this.formData.confirm_password !== this.formData.new_password
      )
        return

      this.loading = true
      this.alertMessage.message = ''

      this.$axios
        .$patch(`/user/update_password`, this.formData)
        .then(async (response) => {
          await this.$auth.fetchUser()
          ;(async () => {
            await this.$notify({
              message: response.message || 'Password updated successfully',
              title: 'Password Update',
            })
          })()
          this.alertMessage.isSuccess = true
          this.alertMessage.message =
            response.message || 'Password updated successfully'

          this.formData = {
            old_password: '',
            new_password: '',
            confirm_password: '',
          }

          setTimeout(() => {
            this.alertMessage.message = ''
          }, 30000)
          this.editingDetails = false
        })
        .catch((err) => {
          this.alertMessage.isSuccess = false
          this.alertMessage.message =
            err.response.data.message ||
            err.message ||
            'Unable to update password'
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
