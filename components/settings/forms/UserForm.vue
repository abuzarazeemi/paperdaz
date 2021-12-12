<template>
  <form action="" class="profile-info-form grid grid-cols-1 gap-5">
    <div
      class="grid gap-5"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div>
        <label for="">First Name</label>
        <input-field placeholder="Enter first name..." value="Axay" />
      </div>
      <div>
        <label for="">Last Name</label>
        <input-field placeholder="Enter last name..." value="Devikar" />
      </div>
    </div>
    <div>
      <label for="">Email</label>
      <input-field
        placeholder="Enter email..."
        value="maiblue@gmail.com"
        type="email"
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
  name: 'UserForm',
  components: { InputField },
})
</script>

<style lang="postcss" scoped>
.profile-info-form label {
  @apply block font-medium mb-0.5;
  color: #282533;
}
</style>
