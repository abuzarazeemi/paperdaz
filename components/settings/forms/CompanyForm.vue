<template>
  <form action="" class="profile-info-form grid grid-cols-1 gap-5">
    <div>
      <label for="">Business / Username</label>
      <input-field
        placeholder="business / username"
        value="Mai | "
        type="text"
      />
    </div>
    <div>
      <label for="">1st Line</label>
      <input-field
        placeholder="1st line"
        value="maiblue@gmail.com"
        type="text"
      />
    </div>
    <div>
      <label for="">2nd Line</label>
      <input-field
        placeholder="2nd line"
        value="maiblue@gmail.com"
        type="text"
      />
    </div>
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">Phone Number</label>
        <input-field placeholder="Enter phone number..." value="1234561213" />
      </div>
      <div>
        <label for="">Timezone</label>
        <input-field placeholder="Enter timezone..." value="Timezone" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '~/components/widgets/InputField.vue'
export default Vue.extend({
  name: 'CompanyForm',
  components: { InputField },
})
</script>

<style lang="postcss" scoped>
.profile-info-form label {
  @apply block font-medium mb-0.5;
  color: #282533;
}
</style>
