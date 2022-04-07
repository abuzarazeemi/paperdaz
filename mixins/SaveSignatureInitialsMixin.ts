import Vue from 'vue'

export default Vue.extend({
  methods: {
    dataURIToBlob(dataURI: string) {
      const splitDataURI = dataURI.split(',')
      const byteString =
        splitDataURI[0].indexOf('base64') >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

      return new Blob([ia], { type: mimeString })
    },
    async imageExported(image: any, isSignature: boolean) {
      const formData = new FormData()
      formData.append('upload', this.dataURIToBlob(image))

      this.$axios
        .$post(
          isSignature ? '/user/upload_signature' : '/user/update_initials',
          formData
        )
        .then(async (response) => {
          await this.$auth.fetchUser()
          this.$notify.success({
            title: isSignature ? 'Signature' : 'Initials',
            message: `Your ${
              isSignature ? 'signature' : 'initials'
            } has been uploaded`,
          })
        })
        .catch((err) => {
          this.$notify.error({
            title: isSignature ? 'Signature' : 'Initials',
            message:
              err.message ||
              `Error uploading ${isSignature ? 'signature' : 'initials'}`,
          })
        })
    },
  },
})
