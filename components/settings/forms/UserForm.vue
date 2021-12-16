<template>
  <form action="" class="profile-info-form grid grid-cols-1 gap-5">
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">First Name</label>
        <el-input placeholder="Enter first name..." value="Axay" />
      </div>
      <div>
        <label for="">Last Name</label>
        <el-input placeholder="Enter last name..." value="Devikar" />
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Email</label>
        <el-input
          placeholder="Enter email..."
          value="maiblue@gmail.com"
          type="email"
        />
      </div>
      <div>
        <label for="">Phone Number</label>
        <el-input placeholder="Enter phone number..." value="1234561213" />
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Country</label>
        <el-select placeholder="Country" class="w-full">
          <el-option value="1" label="asdfasdf" />
        </el-select>
      </div>
      <div>
        <label for="">State</label>
        <el-input placeholder="Enter state..." value="State" />
      </div>
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Timezone</label>
        <el-input placeholder="Enter timezone..." value="Timezone" />
      </div>
      <div></div>
    </div>
    <div class="flex items-center justify-center mt-2">
      <button
        class="shadow h-10 px-5 text-white rounded-xl bg-paperdazgreen-300"
      >
        Update
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '~/components/widgets/InputField.vue'
import AuthUser from '~/models/AuthUser'

export default Vue.extend({
  name: 'UserForm',
  components: { InputField },
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        timezone: '',
        country: '',
        state: '',
      } as AuthUser,
    }
  },
  beforeMount() {
    for (const key of Object.keys(this.formData)) {
      this.formData[key] = this.$auth.user ? this.$auth.user[key] : ''
    }
  },
})
</script>

<style lang="postcss" scoped>
.profile-info-form label {
  @apply block font-medium mb-0.5;
  color: #282533;
}
</style>
