<template>
  <div class="">
    <div
      class="bg-white border border-[#C4C4C4] cursor-text py-6 px-5"
      @click="$refs.inputElement.focus()"
    >
      <div
        type="text"
        ref="inputElement"
        class="inline-block rounded outline-none text-6xl leading-relaxed caret-paperdazgreen-400"
        :style="{
          color: activeColor,
          background: 'transparent',
          fontFamily: updatedFontFamily,
        }"
        contenteditable=""
      >
        {{ $auth.user.first_name }}
      </div>
    </div>
    <div class="mt-6 flex items-center gap-3">
      <select v-model="currentFont" class="w-52 max-w-full py-2 px-1 rounded">
        <option value="" disabled hidden selected>Select Font</option>
        <option v-for="font in fonts" :key="font.key" :value="font.key">
          {{ font.family }}
        </option>
      </select>

      <transition name="fade" duration="50">
        <span v-show="loadingFont" class="animate-spin text-paperdazgreen-400"
          ><spinner-dotted-icon height="20" width="20"
        /></span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import SignatureBodyMixin from '~/mixins/SignatureBodyMixin'
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
import _ from 'lodash'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'

export default mixins(SignatureBodyMixin).extend({
  components: { SpinnerDottedIcon },
  name: 'SignatureTypeBodyTab',
  data() {
    return {
      textValue: 'Value',
      activeColor: '#000',
      loading: false,
      loadingFont: false,
      currentFont: '',
      fonts: [] as Array<any>,
      updatedFontFamily: '',
    }
  },
  async mounted() {
    await this.$nextTick()
    ;(this.$refs.inputElement as HTMLDivElement).focus()

    this.getFonts()
    this.changeFont = _.debounce(this.changeFont, 300)
  },
  computed: {
    currentFontObject(): any {
      const fonts = this.fonts
      const font = fonts.find((el) => el.key == this.currentFont)

      if (!font) return undefined

      return font
    },
  },
  methods: {
    getFonts() {
      this.$axios
        .$get(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${this.$config.googleFontsApiKey}`
        )
        .then((response: { items: Array<any> }) => {
          console.log(response)

          const getWeightName = (weight: string) => {
            switch (weight) {
              case '100':
                return 'thin'
              case '200':
                return 'extralight'
              case '300':
                return 'light'
              case '500':
                return 'medium'
              case '600':
                return 'semibold'
              case '700':
                return 'bold'
              case '800':
                return 'extrabold'
              case '900':
                return 'black'
              default:
                return weight
            }
          }
          for (const item of response.items) {
            const family = item.family
            for (const weight in item.files) {
              this.fonts.push({
                family: `${family} (${getWeightName(weight)})`,
                familyName: family,
                fontWeight: weight,
                file: item.files[weight],
                key: `${family} ${getWeightName(weight)}`,
              })
            }
          }
        })
    },
    clear() {
      ;(this.$refs.inputElement as HTMLDivElement).innerText = ''
    },
    exportImage() {
      if (this.loading) return

      // html2canvas(this.$refs.inputElement as HTMLElement).then((canvas) => {
      //   // document.body.appendChild(canvas)
      //   console.log(canvas.toDataURL())
      //   this.$emit('export-image', canvas.toDataURL())
      // })

      domtoimage
        .toPng(this.$refs.inputElement as HTMLElement)
        .then((dataUrl: any) => {
          // this.$emit('export-image', dataUrl)
          console.log(dataUrl)
        })
        .finally(() => {
          this.loading = false
        })
    },

    changeFont() {
      this.loadingFont = true
      const currentFontObject = this.currentFontObject
      if (!currentFontObject) return
      const dynFont = new FontFace(
        currentFontObject.key,
        `url(${currentFontObject.file})`
      )

      dynFont
        .load()
        .then((loadedFont) => {
          // @ts-ignore
          document.fonts.add(loadedFont)
          this.updatedFontFamily = currentFontObject.key
        })
        .finally(() => {
          this.loadingFont = false
        })
    },
  },
  watch: {
    currentFontObject() {
      this.changeFont()
    },
  },
})
</script>
