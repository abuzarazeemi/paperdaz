<template>
  <div class="flex flex-col sm:flex-row gap-5">
    <div class="p-4 flex-1 sm:flex-initial rounded-2xl bg-white sm:self-start">
      <ul>
        <li
          class="menu-item"
          :class="{ active: currentState === 'app' }"
          @click="currentState = 'app'"
        >
          <bell-icon class="text-[#FFCF27]" /> <span>App Notification</span>
        </li>
        <li
          class="menu-item"
          :class="{ active: currentState === 'email' }"
          @click="currentState = 'email'"
        >
          <envelope-outlined-icon class="text-[#FFCF27]" />
          <span>Email Notification</span>
        </li>
      </ul>
    </div>

    <transition name="fade" mode="out-in" :duration="200">
      <!-- Start:: App notifications section -->
      <section
        v-if="currentState == 'app'"
        key="app"
        class="flex-1 px-8 py-10 bg-white rounded-2xl"
      >
        <h3
          class="flex justify-center text-paperdazgreen-300 border-b-2 border-paperdazgreen-300 font-semibold text-2xl gap-2 pb-1 relative mb-7"
        >
          <span>App Notifications</span>
        </h3>
        <div class="w-full overflow-x-auto custom-scrollbar">
          <table class="custom-table">
            <tbody>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Users &amp; Roles</p>
                    <p>Access requests for private files</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Collaborations</p>
                    <p>Invitation requests, Joining requests,</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Actions</p>
                    <p>Files completed, confirmed, signed</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="false" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Referral Credits</p>
                    <p>Reference sign ups, credits earned</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="false" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Payments</p>
                    <p>Billing reminders, package expiry</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- End:: App notifications section -->
      <!-- Start:: Email notifications section -->
      <section
        v-if="currentState == 'email'"
        key="email"
        class="flex-1 px-8 py-10 bg-white rounded-2xl"
      >
        <h3
          class="flex justify-center text-paperdazgreen-300 border-b-2 border-paperdazgreen-300 font-semibold text-2xl gap-2 pb-1 relative mb-7"
        >
          <span>Email Notifications</span>
        </h3>
        <div class="w-full overflow-x-auto custom-scrollbar">
          <table class="custom-table">
            <tbody>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Users &amp; Roles</p>
                    <p>Access requests for private files</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Collaborations</p>
                    <p>Invitation requests, Joining requests,</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Actions</p>
                    <p>Files completed, confirmed, signed</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="false" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Referral Credits</p>
                    <p>Reference sign ups, credits earned</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="false" />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-sm">
                    <p class="mb-1 font-semibold">Payments</p>
                    <p>Billing reminders, package expiry</p>
                  </div>
                </td>
                <td class="w-4 fixed-col right">
                  <switch-widget :active="true" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- End:: Email notifications section -->
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BellIcon from '~/components/svg-icons/BellIcon.vue'
import EnvelopeOutlinedIcon from '~/components/svg-icons/EnvelopeOutlinedIcon.vue'
import SwitchWidget from '~/components/widgets/SwitchWidget.vue'
export default Vue.extend({
  name: 'NotificationsTab',
  components: { BellIcon, EnvelopeOutlinedIcon, SwitchWidget },
  data() {
    return {
      currentState: 'app', // app | email
    }
  },
})
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply min-w-[220px] max-w-full transition ease-in-out duration-200 w-full grid gap-2 text-sm font-bold items-center h-16 border-2 border-paperdazgreen-400 rounded-2xl px-5 cursor-pointer;
  grid-template-columns: 25px 1fr;
  &:not(:last-child) {
    @apply mb-5;
  }

  &:hover {
    @apply bg-paperdazgreen-400 bg-opacity-5;
  }

  &.active {
    @apply text-white bg-paperdazgreen-400;
  }
}
</style>
