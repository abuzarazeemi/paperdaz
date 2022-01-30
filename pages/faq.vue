<template>
  <div class="bg-gradient-to-b from-[#E4F3E0] to-white">
    <section class="relative shadow">
      <div
        class="px-5 text-center text-black absolute inline-block transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <h4 class="text-4xl lg:text-5xl font-semibold whitespace-nowrap">
          FAQ's
        </h4>
        <p class="text-[#414142] font-medium">Frequently Asked Questions</p>
      </div>
      <img
        src="~/assets/img/world_map.svg"
        alt=""
        class="w-full max-w-full max-h-80 min-h-[250px] object-cover"
      />
    </section>
    <section class="container min-h-[50vh] py-16">
      <div>
        <ul class="tab-button-group">
          <li class="tab-button" :class="{ active: tabIndex == 0 }">General</li>
          <li class="tab-button" :class="{ active: tabIndex == 1 }">
            Paperlink
          </li>
          <li class="tab-button" :class="{ active: tabIndex == 2 }">Billing</li>
          <li class="tab-button" :class="{ active: tabIndex == 3 }">Credits</li>
        </ul>
        <div class="w-full bg-white">
          <!-- Start:: General faqs -->
          <div v-show="tabIndex == 0">
            <ul class="w-full px-6 py-4">
              <li
                v-for="(faq, i) in generalFaqs"
                :key="i"
                class="faq"
                :class="{ active: generalIndex == i }"
              >
                <div
                  class="grid grid-cols-[min-content,1fr,min-content] gap-4 items-center cursor-pointer"
                  @click="setGeneralIndex(i)"
                >
                  <span
                    class="circle circle-12 sm:circle-15 bg-paperdazgreen-400 text-white"
                  >
                    <search-icon class="w-3 sm:w-4 h-3 sm:h-4" />
                  </span>

                  <p class="text-[#505050] text-sm sm:text-base">
                    {{ faq.question }}
                  </p>
                  <span>
                    <arrow-down-icon
                      class="collapse-indicator"
                      width="16"
                      height="10"
                    />
                  </span>
                </div>
                <div class="collapsible text-xs sm:text-sm">
                  <div
                    class="grid grid-cols-[min-content,1fr] gap-4 cursor-pointer mt-3"
                    v-for="(answer, j) in faq.answers"
                    :key="j"
                  >
                    <span
                      class="circle circle-12 sm:circle-15 bg-[#EFDF4D] text-paperdazgreen-400"
                      >A</span
                    >
                    <p class="text-gray-500">
                      {{ answer.text }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- End:: General faqs -->
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArrowDownIcon from '~/components/svg-icons/ArrowDownIcon.vue'
import SearchIcon from '~/components/svg-icons/SearchIcon.vue'
export default Vue.extend({
  components: { SearchIcon, ArrowDownIcon },
  name: 'FaqPage',
  layout: 'landing',
  auth: false,
  head() {
    return {
      script: [
        // ...
        {
          hid: 'tawk.to',
          src: 'https://embed.tawk.to/61ee08389bd1f31184d8e4d8/1fq4t07bg',
          defer: true,
        },
      ],
    }
  },
  beforeRouteLeave(to, from, next) {
    location.href = to.fullPath
    return
  },
  data() {
    return {
      tabIndex: 0,
      generalIndex: -1,
      generalFaqs: [
        {
          question: 'How do I upload a file as a guest?',
          answers: [
            {
              text: "Simply by creating a  free (guest) user account, you'll have the access to upload any file and perform actions on it. ",
            },
          ],
        },
        {
          question:
            'What is the minimum size of the file that can be uploaded?',
          answers: [
            {
              text: "Simply by creating a  free (guest) user account, you'll have the access to upload any file and perform actions on it. ",
            },
          ],
        },
        {
          question: 'What types of document format are supported by Paperdaz? ',
          answers: [
            {
              text: "Simply by creating a  free (guest) user account, you'll have the access to upload any file and perform actions on it. ",
            },
          ],
        },
      ],
    }
  },
  methods: {
    setGeneralIndex(index: number) {
      this.generalIndex = this.generalIndex == index ? -1 : index
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  @apply text-2xl lg:text-3xl text-paperdazgreen-400 mb-1.5 lg:mb-2 font-semibold;
}

.body {
  @apply text-[#414142] font-medium text-sm lg:text-base;
}

.tab-button-group {
  @apply text-xs sm:text-sm font-medium;
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #a8a8a8;
  padding: 1px;

  & > .tab-button {
    --slide-size: 0px;
    cursor: pointer;
    background: #cde8ca;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    transition: all 0.2s ease-in-out;

    clip-path: polygon(
      0% 0%,
      calc(100% - var(--slide-size)) 0%,
      100% 100%,
      var(--slide-size) 100%
    );

    @media only screen and (min-width: 375px) {
      --slide-size: 15px;
    }

    @media only screen and (min-width: 425px) {
      --slide-size: 20px;
    }

    @media only screen and (min-width: 640px) {
      --slide-size: 30px;
    }

    &:not(:first-child) {
      margin-left: calc(-1 * var(--slide-size));
    }

    &:first-child {
      clip-path: polygon(
        0% 0%,
        calc(100% - var(--slide-size)) 0%,
        100% 100%,
        0% 100%
      );
    }

    &:last-child {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, var(--slide-size) 100%);
    }

    &:hover {
      background: #a6e480;
    }

    &.active {
      @apply bg-paperdazgreen-400 text-white;
    }
  }
}

.faq {
  @apply py-3;

  &:not(:last-child) {
    @apply border-b border-[#C4C4C4];
  }

  & > .collapsible {
    transition: max-height 0.3s ease-in-out;
    max-height: 0;
    overflow: hidden;
  }

  & .collapse-indicator {
    transition: transform 0.3s ease-in-out;
    transform: rotateX(0deg);
  }

  &.active {
    & > .collapsible {
      max-height: 300px;
    }

    & .collapse-indicator {
      transform: rotateX(180deg);
    }
  }
}
</style>
