<template>
<div v-touch:swipe="swipeListener" @wheel.prevent="scrollDirection" class="home">
  <NavComponent :activeComponentFromScroll="activeComponent" @updateActiveComponent="updateActiveComponent" />
  <component :is="activeComponent"/>
  <div ref="cursor" class="cursor"></div>
</div>
</template>

<script>
export default {
  data(){
    return {
      isScrolling: false,
      activeComponent: 'HeaderComponent',
      activeComponentIndex: 0,
      components: ['HeaderComponent', 'AboutComponent', 'WorksComponent', 'ContactComponent']
    }
  },

  mounted () {
    this.mouseMove()
  },

  methods: {
    updateActiveComponent(component) {
      this.activeComponent = component
      this.findActiveComponentIndex()
    },

    mouseMove(){
      document.addEventListener('mousemove', (e) => {
        this.$refs.cursor.style.left = `${e.pageX}px`
        this.$refs.cursor.style.top = `${e.pageY}px`
      })
    },

    findActiveComponentIndex(){
      this.activeComponentIndex = this.components.indexOf(this.activeComponent)
    },

    goingUp(){
      if(this.activeComponentIndex === 0) return
      this.updateActiveComponent(this.components[this.activeComponentIndex-1])
    },

    goingDown(){
      if(this.activeComponentIndex === this.components.length-1) return
      this.updateActiveComponent(this.components[this.activeComponentIndex+1])
    },

    scrollDirection(e){
        if (this.isScrolling) return;
        if (e.deltaY === -0) return;

        this.isScrolling = true;
        if(e.deltaY < 0){
          this.goingUp()
        } else {
          this.goingDown()
        }

        setTimeout(() => {
          this.isScrolling = false;
        }, 2000);

    },

    swipeListener(direction) {
      if (this.isScrolling) return;

      this.isScrolling = true;
      if (direction === "bottom") {
        this.goingUp()
      } else if (direction === "top") {
        this.goingDown()
      }
      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    },
  },
}
</script>
