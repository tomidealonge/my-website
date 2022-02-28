export default {
  props: {
    animatingOut: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    async animatingOut(newVal) {
      if (newVal) {
        await this.leave()
      }
    }
  },
}