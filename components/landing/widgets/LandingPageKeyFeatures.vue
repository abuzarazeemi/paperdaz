<template>
  <section>
    <div class="container py-20">
      <h1 class="font-bold text-4xl text-center mb-2">Key Features</h1>
      <p
        class="
          font-semibold
          text-center text-sm text-paperdazgray-300
          mx-auto
          max-w-md
          mb-6
        "
      >
        Paperdaz will replace paper
      </p>

      <div
        class="
          my-12
          grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
          sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
          gap-x-2
          sm:gap-x-4
          gap-y-10
        "
      >
        <div v-for="(block, i) in fets" :key="i">
          <img
            class="mx-auto"
            :src="'/icons/keyfeatures/' + block.img"
            alt=""
          />
          <p class="mt-5 text-center font-semibold">{{ block.tag }}</p>
          <p
            class="
              mt-3
              text-center text-[13px] text-paperdazgray-400
              font-medium
            "
          >
            {{ block.des }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LandingPageKeyFeatures',
  data: () => ({
    fets: [
      {
        tag: 'Paperlink',
        des: 'Direct Url link to every file',
        img: 'Paperlink.svg',
      },
      {
        tag: 'QR Code',
        des: 'Simply scan to direct access to file',
        img: 'QRcode.svg',
      },
      {
        tag: 'Papertag ',
        des: 'Easy search with tag names for each file',
        img: 'Papertag.svg',
      },
      {
        tag: 'Annotation Tools',
        des: 'Type, Check, Line, Highlight, X, Circle, Draw, Signature, Name, Initials       ',
        img: 'Anntools.svg',
      },
      {
        tag: 'Privacy Setting',
        des: 'Public, Private, Do Not Post',
        img: 'privacy.svg',
      },
      {
        tag: 'Share & Request',
        des: 'Easy  to share or send an action request',
        img: 'share-req.svg',
      },
      {
        tag: 'Transparency',
        des: 'Copy of completed file will be sent to all users.',
        img: 'trans.svg',
      },
      {
        tag: 'Security',
        des: '256-bit encryption to keep files secured',
        img: 'security.svg',
      },
    ],
  }),
})
</script>
