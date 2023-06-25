<template>
  <div
    v-touch:swipe="swipeListener"
    @wheel.prevent="scrollDirection"
    class="home"
  >
    <LottieComponent />
    <div class="logo">TA.</div>
    <div class="hamburger" @click="toggleNavVisibility">
      <lottie-animation
        ref="hamburger"
        :animation-data="require('@/assets/lottie/hamburger.json')"
        :auto-play="false"
        :loop="false"
      />
    </div>
    <NavComponent
      :navVisibility="isNavVisible"
      :activeComponent="activeComponent"
      @updateDestinationComponent="updateDestinationComponent"
    />
    <component
      @updateActiveComponent="updateActiveComponent"
      :animatingOut="animatingOut"
      :is="activeComponent"
    />
    <div ref="cursor" class="cursor"></div>
    <div class="scroll-indicator"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavVisible: false,
      isScrolling: false,
      activeComponent: "HeaderComponent",
      destinationComponent: "",
      activeComponentIndex: 0,
      animatingOut: false,
      isNotMobile: window.matchMedia("(min-width: 414px)").matches,
      components: [
        "HeaderComponent",
        "AboutComponent",
        "WorksComponent",
        "ContactComponent"
      ]
    };
  },

  mounted() {
    this.mouseMove();
    this.$nextTick(() => {
      this.$initWebflow();
    });
  },

  methods: {
    toggleNavVisibility() {
      this.isNavVisible = !this.isNavVisible;
    },

    updateActiveComponent() {
      this.animatingOut = false;
      this.activeComponent = this.destinationComponent;
      this.findActiveComponentIndex();
    },

    updateDestinationComponent(component) {
      this.isNavVisible = false;
      this.animatingOut = true;
      this.destinationComponent = component;
    },

    mouseMove() {
      document.addEventListener("mousemove", e => {
        this.$refs.cursor.style.left = `${e.pageX}px`;
        this.$refs.cursor.style.top = `${e.pageY}px`;
      });
    },

    findActiveComponentIndex() {
      this.activeComponentIndex = this.components.indexOf(this.activeComponent);
    },

    goingUp() {
      if (this.activeComponentIndex === 0) return;
      this.updateDestinationComponent(
        this.components[this.activeComponentIndex - 1]
      );
    },

    goingDown() {
      if (this.activeComponentIndex === this.components.length - 1) return;
      this.updateDestinationComponent(
        this.components[this.activeComponentIndex + 1]
      );
    },

    scrollDirection(e) {
      if (this.isScrolling) return;
      if (e.deltaY === -0) return;

      this.isScrolling = true;
      if (e.deltaY < 0) {
        console.log("going up");
        this.goingUp();
      } else {
        console.log("going down");
        this.goingDown();
      }

      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    },

    swipeListener(direction) {
      if (this.isScrolling) return;

      this.isScrolling = true;
      if (direction === "bottom") {
        this.goingUp();
      } else if (direction === "top") {
        this.goingDown();
      }
      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    }
  },

  head() {
    return {
      htmlAttrs: {
        lang: "en",
        "data-wf-page": "625c6a5308227842ea6f9d62",
        "data-wf-site": "6230b278fc8aa147cc32e94c"
      }
    };
  }
};
</script>
