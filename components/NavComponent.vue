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
      :class="activeComponent === 'WorksComponent' && '--active'"
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
    activeComponent: {
      type: String,
      default: "HeaderComponent"
    }
  },

  methods: {
    changeDestinationComponent(component) {
      if (component === this.activeComponent) return;
      this.$emit("updateDestinationComponent", component);
    }
  }
};
</script>
