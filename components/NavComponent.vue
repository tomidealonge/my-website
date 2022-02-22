<template>
    <ul class="nav-links">
      <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor" :class="activeComponent === 'HeaderComponent' && '--active'" @click="changeActiveComponent('HeaderComponent')">Home</li>
      <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor" :class="activeComponent === 'AboutComponent' && '--active'" @click="changeActiveComponent('AboutComponent')">About me</li>
      <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor" :class="activeComponent === 'WorksComponent' && '--active'" @click="changeActiveComponent('WorksComponent')"> My Works</li>
      <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor" :class="activeComponent === 'ContactComponent' && '--active'" @click="changeActiveComponent('ContactComponent')"> Contact me</li>
    </ul>
</template>

<script>
import mouseHover from '~/mixin.js/mouse-hover'
  export default {
    mixins: [mouseHover],

    props: {
      activeComponentFromScroll: {
        type: String,
        default: 'HeaderComponent'
      },
    },

    watch: {
      activeComponentFromScroll(newVal) {
        this.activeComponent = newVal
      }
    },

    data() {
      return {
        activeComponent: 'HeaderComponent'
      }
    },

    methods: {
      changeActiveComponent(component) {
        this.activeComponent = component
        this.$emit('updateActiveComponent', component)
      }
    },
  }
</script>
