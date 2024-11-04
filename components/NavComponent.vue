<template>
  <ul class="nav-links">
    <li
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'HeaderComponent' && '--active'"
      @click="changeDestinationComponent('HeaderComponent')"
    >
      Home
    </li>
    <li
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'AboutComponent' && '--active'"
      @click="changeDestinationComponent('AboutComponent')"
    >
      About me
    </li>
    <li
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="
        (activeComponent === 'WorksComponent' ||
          activeComponent === 'WorksComponentExtra') &&
          '--active'
      "
      @click="changeDestinationComponent('WorksComponent')"
    >
      My Works
    </li>
    <li
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'ContactComponent' && '--active'"
      @click="changeDestinationComponent('ContactComponent')"
    >
      Contact me
    </li>
  </ul>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";
export default {
  mixins: [mouseHover],

  props: {
    navVisibility: {
      type: Boolean,
      default: false
    },

    activeComponent: {
      type: String,
      default: "HeaderComponent"
    }
  },

  watch: {
    navVisibility(newValue, oldValue) {
      if (newValue) {
        this.animateNavIn();
      } else {
        this.animateNavOut();
      }
    }
  },

  methods: {
    changeDestinationComponent(component) {
      if (component === this.activeComponent) return;
      this.$emit("updateDestinationComponent", component);
    },

    animateNavOut() {
      this.$gsap.to(".nav-links", {
        height: 0,
        opacity: 0,
        duration: 1,
        ease: "back"
      });
    },

    animateNavIn() {
      this.$gsap.to(".nav-links", {
        height: "auto",
        opacity: 1,
        duration: 1,
        ease: "back"
      });
    }
  }
};
</script>
