<template>
  <section
    class="
      bg-white
      rounded-2xl
      px-10
      py-11
      flex-1 flex
      items-center
      justify-center
    "
  >
    <form class="w-full max-w-2xl mx-auto">
      <legend
        class="
          text-2xl
          lg:text-4xl
          text-[#17282F]
          font-medium
          mb-12
          lg:text-center
        "
      >
        Change Your Password
      </legend>

      <div class="mb-7">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >Current Password</label
        >
        <input-field
          type="password"
          placeholder="*******************************"
        />
      </div>
      <div class="mb-7">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >New Password</label
        >
        <password-field placeholder="*******************************" />
      </div>
      <div class="mb-10">
        <label for="" class="block text-[#282533] font-medium text-lg mb-2"
          >Confirm New Password</label
        >
        <password-field placeholder="*******************************" />
      </div>
      <div class="flex justify-center">
        <button
          class="
            bg-paperdazgreen-300
            text-white
            rounded-3xl
            h-12
            px-5
            font-medium
            text-xl
          "
        >
          Update Password
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '~/components/widgets/InputField.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'ChangePasswordTab',
  components: { InputField, PasswordField },
})
</script>
