<template>
    <ul class="nav-links">
      <li :class="activeComponent === 'HeaderComponent' && '--active'" @click="changeActiveComponent('HeaderComponent')">Home</li>
      <li :class="activeComponent === 'AboutComponent' && '--active'" @click="changeActiveComponent('AboutComponent')">About me</li>
      <li :class="activeComponent === 'WorksComponent' && '--active'" @click="changeActiveComponent('WorksComponent')"> My Works</li>
      <li :class="activeComponent === 'ContactComponent' && '--active'" @click="changeActiveComponent('ContactComponent')"> Contact me</li>
    </ul>
</template>

<script>
  export default {
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
