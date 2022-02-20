export default {
  methods: {
    increaseCursor() {
      document.querySelector('.cursor').classList.add('hover-state')
    },

    decreaseCursor() {
      document.querySelector('.cursor').classList.remove('hover-state')
    }
  },
};