<template>
  <ul class="nav-links" ref="navList">
    <!-- Single travelling indicator -->
    <div class="nav-indicator" ref="indicator">
      <div class="nav-indicator__circle"></div>
    </div>

    <li
      ref="link0"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'HeaderComponent' && '--active'"
      @click="changeDestinationComponent('HeaderComponent')"
    >
      Intro
    </li>
    <li
      ref="link1"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'AboutComponent' && '--active'"
      @click="changeDestinationComponent('AboutComponent')"
    >
      about
    </li>
    <li
      ref="link2"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'WorksComponent' && '--active'"
      @click="changeDestinationComponent('WorksComponent')"
    >
      Projects
    </li>
    <li
      ref="link3"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'WorksComponentExtra' && '--active'"
      @click="changeDestinationComponent('WorksComponentExtra')"
    >
      Playground
    </li>
    <li
      ref="link4"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'ContactComponent' && '--active'"
      @click="changeDestinationComponent('ContactComponent')"
    >
      Reach out
    </li>
  </ul>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";

const COMPONENT_INDEX_MAP = {
  HeaderComponent: 0,
  AboutComponent: 1,
  WorksComponent: 2,
  WorksComponentExtra: 3,
  ContactComponent: 4
};

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

  mounted() {
    // Snap indicator to initial active item with no animation
    this.$nextTick(() => {
      this.moveIndicator(this.activeComponent, false);
    });
  },

  watch: {
    navVisibility(newValue) {
      if (newValue) {
        this.animateNavIn();
      } else {
        this.animateNavOut();
      }
    },

    activeComponent(newComponent) {
      this.moveIndicator(newComponent, true);
    }
  },

  methods: {
    changeDestinationComponent(component) {
      if (component === this.activeComponent) return;
      this.$emit("updateDestinationComponent", component);
    },

    moveIndicator(component, animate = true) {
      const index = COMPONENT_INDEX_MAP[component];
      const targetLi = this.$refs[`link${index}`];
      const indicator = this.$refs.indicator;

      if (!targetLi || !indicator) return;

      // offsetTop gives position relative to the ul parent
      const targetTop = targetLi.offsetTop + targetLi.offsetHeight / 2;

      if (animate) {
        this.$gsap.to(indicator, {
          top: targetTop,
          duration: 0.6,
          ease: "power3.inOut"
        });
      } else {
        this.$gsap.set(indicator, { top: targetTop });
      }
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
