<template>
  <div
    v-touch:swipe="swipeListener"
    @wheel.prevent="scrollDirection"
    class="home"
  >
    <LottieComponent />
    <canvas ref="noiseCanvas" class="noise-canvas"></canvas>
    <div class="logo">TA.</div>
    <div class="hamburger" @click="toggleNavVisibility">
      <lottie-animation
        ref="hamburger"
        :animation-data="require('@/assets/lottie/hamburger.json')"
        :auto-play="false"
        :loop="false"
      />
    </div>

    <div class="nav-comp-wrapper">
      <NavComponent
        :navVisibility="isNavVisible"
        :activeComponent="activeComponent"
        @updateDestinationComponent="updateDestinationComponent"
      />
    </div>
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
        "WorksComponentExtra",
        "ContactComponent"
      ]
    };
  },

  mounted() {
    this.mouseMove();
    // this.generateNoise();
    this.$nextTick(() => {
      this.$initWebflow();
    });
  },

  methods: {
    generateNoise() {
      const canvas = this.$refs.noiseCanvas;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");

      const draw = () => {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer = imageData.data;

        for (let i = 0; i < buffer.length; i += 4) {
          const value = Math.random() * 255;
          buffer[i] = value;
          buffer[i + 1] = value;
          buffer[i + 2] = value;
          buffer[i + 3] = 27;
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(draw);
      };

      draw();
    },

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
      let mouseX = 0,
        mouseY = 0;
      let cursorX = 0,
        cursorY = 0;

      document.addEventListener("mousemove", e => {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });

      const animate = () => {
        // Lerp factor — lower = more lag/slippery (0.05–0.15 is a good range)
        const ease = 0.08;

        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        this.$refs.cursor.style.left = `${cursorX}px`;
        this.$refs.cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animate);
      };

      animate();
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

<style>
.cursor {
  position: absolute;
  transition: transform 0.3s ease-out;
  cursor: none;
}
</style>
